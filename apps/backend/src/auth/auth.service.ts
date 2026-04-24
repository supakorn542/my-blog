import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { ILoginRequest } from '@my-blog/types';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: ILoginRequest) {
    const existingAdmin = await this.adminRepository.findOne({
      where: { username: createAdminDto.username },
    });

    if (existingAdmin) {
      throw new ConflictException('Admin already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createAdminDto.password, salt);

    const newAdmin = this.adminRepository.create({
      username: createAdminDto.username,
      passwordHash: hashedPassword,
    });

    await this.adminRepository.save(newAdmin);

    return { message: 'Admin setup completed successfully' };
  }

  async findOne(id: string) {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    return admin;
  }

  async login(admin: Admin) {
    const accessToken = this.jwtService.sign(
      { userId: admin.id },
      { expiresIn: '60m' },
    );
    const refreshToken = this.jwtService.sign(
      { userId: admin.id },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  async validateUser(username: string, pass: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { username },
    });

    if (!admin) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(pass, admin.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    return admin;
  }

  async refreshToken(oldRefreshToken: string) {
    try {
      const payload = this.jwtService.verify(oldRefreshToken);
      const newAccessToken = this.jwtService.sign(
        { userId: payload.userId },
        { expiresIn: '60m' },
      );
      return newAccessToken;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm'; // <--- Import DataSource
import { Blog } from '../blogs/entities/blog.entity';
import { Admin } from '../auth/entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeederService.name);

  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking database seeding...');

    const adminRepo = this.dataSource.getRepository(Admin);
    const blogRepo = this.dataSource.getRepository(Blog);

    const adminExists = await adminRepo.findOne({
      where: { username: 'admin' },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await adminRepo.save({
        username: 'admin',
        passwordHash: hashedPassword,
      });
      this.logger.log('Seeded default admin account.');
    }

    const blogCount = await blogRepo.count();
    if (blogCount === 0) {
      await blogRepo.save([
        {
          title: '5 สถานที่ท่องเที่ยวช่วงหน้าหนาวที่คุณไม่ควรพลาด',
          slug: '5-winter-travel-destinations',
          excerpt:
            'แนะนำสถานที่พักผ่อนรับลมหนาวในประเทศไทย พร้อมจุดถ่ายรูปสวยๆ',
          content:
            '<p>ฤดูหนาวเป็นช่วงเวลาที่เหมาะกับการไปเที่ยวสัมผัสธรรมชาติ ไม่ว่าจะเป็นดอยอินทนนท์ ภูทับเบิก หรือเขาค้อ...</p>',
          coverImageUrl: 'https://picsum.photos/seed/travel/800/400',
          isPublished: true,
          publishedAt: new Date(),
        },
        {
          title: 'ประโยชน์ของการดื่มน้ำให้เพียงพอ',
          slug: 'benefits-of-drinking-enough-water',
          excerpt:
            'ทำไมเราถึงควรดื่มน้ำวันละ 8 แก้ว? มาดูประโยชน์ที่คุณอาจคาดไม่ถึง',
          content:
            '<p>น้ำเป็นส่วนประกอบสำคัญของร่างกาย การดื่มน้ำให้เพียงพอช่วยให้ผิวพรรณสดใส ระบบเผาผลาญทำงานได้ดีขึ้น...</p>',
          coverImageUrl: 'https://picsum.photos/seed/health/800/400',
          isPublished: true,
          publishedAt: new Date(),
        },
        {
          title: 'รีวิวคาเฟ่เปิดใหม่ใจกลางเมือง',
          slug: 'new-cafe-review-city-center',
          excerpt: 'สายคาเฟ่ห้ามพลาด! พาไปชิมกาแฟสเปเชียลตี้และขนมโฮมเมด',
          content:
            '<p>วันนี้เราจะพาไปชมคาเฟ่สไตล์มินิมอลที่เพิ่งเปิดใหม่ บรรยากาศเงียบสงบ เหมาะกับการมานั่งทำงาน...</p>',
          coverImageUrl: 'https://picsum.photos/seed/cafe/800/400',
          isPublished: true,
          publishedAt: new Date(),
        },
      ]);
      this.logger.log('Seeded default blogs.');
    }
  }
}

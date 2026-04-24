import { IsNotEmpty, IsString, IsUUID, Matches, MaxLength } from 'class-validator';
import { ICreateCommentRequest } from '@my-blog/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto implements ICreateCommentRequest {
  @ApiProperty({ example: 'สมชาย 007' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[ก-๙\s0-9]+$/, {
    message: 'ชื่อผู้ส่งต้องเป็นภาษาไทยและตัวเลขเท่านั้น',
  })
  senderName: string;

  @ApiProperty({ example: 'เนื้อหาดีมากครับ 10/10' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @Matches(/^[ก-๙\s0-9]+$/, {
    message: 'ข้อความต้องเป็นภาษาไทยและตัวเลขเท่านั้น',
  })
  content: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  blogId: string;
}
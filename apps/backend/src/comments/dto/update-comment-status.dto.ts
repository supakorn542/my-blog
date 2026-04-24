import { IsIn, IsNotEmpty } from 'class-validator';
import { CommentStatus, IUpdateStatusCommentRequest } from '@my-blog/types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentStatusDto implements IUpdateStatusCommentRequest {
  @ApiProperty({ enum: ['PENDING', 'APPROVED', 'REJECTED'] })
  @IsNotEmpty()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED'])
  status: CommentStatus;
}
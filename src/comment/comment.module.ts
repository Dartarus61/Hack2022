import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/fileLoader/fileLoader.module';
import { Comments } from 'src/models/comment.model';
import { Company } from 'src/models/company.model';
import { ModeratorModule } from 'src/moderator/moderator.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports:[SequelizeModule.forFeature([Comments,Company]),FilesModule,ModeratorModule]
})
export class CommentModule {}

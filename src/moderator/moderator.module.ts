import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from 'src/mail/mail.module';
import { Publication } from 'src/models/publications.model';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

@Module({
  controllers: [ModeratorController],
  providers: [ModeratorService],
  exports:[ModeratorService],
  imports:[SequelizeModule.forFeature([Publication]),MailModule,HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })]
})
export class ModeratorModule {}

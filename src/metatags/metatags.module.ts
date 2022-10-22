import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from 'src/models/company.model';
import { TagsCompany } from 'src/models/companyTags.model';
import { MetaTegs } from 'src/models/metaTegs.model';
import { TagsProduct } from 'src/models/productTags.model';
import { MetatagsController } from './metatags.controller';
import { MetatagsService } from './metatags.service';

@Module({
  controllers: [MetatagsController],
  providers: [MetatagsService],
  imports:[SequelizeModule.forFeature([MetaTegs,TagsCompany,Company,TagsProduct])]
})
export class MetatagsModule {}

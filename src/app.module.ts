import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AnotherEmail } from './models/anotherEmail.model';
import { Case } from './models/case.model';
import { Category } from './models/category.model';
import { Comments } from './models/comment.model';
import { Company } from './models/company.model';
import { TagsCompany } from './models/companyTags.model';
import { Location } from './models/location.model';
import { MetaTegs } from './models/metaTegs.model';
import { Partner} from './models/partner.model';
import { PictureProduct } from './models/pictureProduct.model';
import { Product } from './models/product.model';
import { TagsProduct } from './models/productTags.model';

import { ProductModule } from './product/product.module';
import { CaseModule } from './case/case.module';
import { LocationModule } from './location/location.module';
import { CommentModule } from './comment/comment.module';
import { CompanyModule } from './company/company.module';
import { MetatagsModule } from './metatags/metatags.module';
import { SendfileModule } from './sendfile/sendfile.module';
import { ModeratorModule } from './moderator/moderator.module';


@Module({
  
  controllers: [],
  providers: [],
  imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'hack22',
            models: [ AnotherEmail, Case, Category, Comments, Company, TagsCompany, Location, MetaTegs, Partner, PictureProduct, Product, TagsProduct ],
            autoLoadModels: true,
            /* sync: { alter: true }, */
            /* dialectOptions:{
                ssl:{
                    require: true,
                    rejectUnauthorized: false,
                }
            } */
        }),
        CompanyModule,
        ProductModule,
        CaseModule,
        LocationModule,
        CommentModule,
        MetatagsModule,
        SendfileModule,
        ModeratorModule
    ],
})
export class AppModule {}

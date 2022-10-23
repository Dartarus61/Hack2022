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
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { Moderator } from './models/moderator.model';

@Module({
  
  controllers: [],
  providers: [],
  imports: [
        MailerModule.forRoot({
            transport: 'smtps://project.oop@mail.ru:PFw6RrKEef2J8jkWdfHs@smtp.mail.ru',
            defaults: {
                from: '"no reply" <project.oop@mail.ru>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new EjsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
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
            models: [ AnotherEmail, Case, Category, Comments, Company, TagsCompany, Location, MetaTegs, Partner, PictureProduct, Product, TagsProduct, Moderator ],
            autoLoadModels: true,
             sync: { force: true }, 
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
        ModeratorModule,
        MailModule
    ],
})
export class AppModule {}

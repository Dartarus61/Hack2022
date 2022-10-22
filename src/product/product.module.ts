import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/fileLoader/fileLoader.module';
import { PictureProduct } from 'src/models/pictureProduct.model';
import { Product } from 'src/models/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[SequelizeModule.forFeature([Product,PictureProduct]), FilesModule]
})
export class ProductModule {}

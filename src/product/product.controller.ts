import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){}

    @Get()
    getAll() {
        return this.productService.getAll()
    }

    @Get("/:id")
    getOne(@Param('id') id: number) {
        return this.productService.getOne(id)
    }

    @Post("/create")
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'video', maxCount: 1 },
        { name: 'picture'},
    ]))
    add(@Body() dto: CreateProductDto ,@UploadedFiles() files: { video: Express.Multer.File[], picture: Array<Express.Multer.File> }) {
        return this.productService.create(dto,files)
    }
    
    @Put("/update/:id")
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'video', maxCount: 1 },
        { name: 'picture'},
      ]))
    update( @Param('id') id: number, @Body() dto: CreateProductDto,@UploadedFiles() files: { video: Express.Multer.File[], picture: Express.Multer.File[] }) {
        return  this.productService.update(id, dto, files)
    }

    @Delete("/delete/:id")
    delete(@Param('id') id: number) {
        return  this.productService.delete(id)
    }
}

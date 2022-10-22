import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/CreateCommentDto';

@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService){}

    @Get()
    getAll() {
        return this.commentService.getAll()
    }

    @Get("/:id")
    getOne(@Param('id') id: number) {
        return this.commentService.getOne(id)
    }

    @Post("/create")
    @UseInterceptors(FileInterceptor('file'))
    add(@Body('id')id:number,@Body() dto: CreateCommentDto,@UploadedFile() file: Express.Multer.File) {
        return this.commentService.create(id,dto,file)
    }
    
    @Put("/update/:id")
    update( @Param('id') id: number, @Body() dto: CreateCommentDto,@UploadedFile() file?: Express.Multer.File) {
        return  this.commentService.update(id, dto,file )
    }

    @Delete("/delete/:id")
    delete(@Param('id') id: number) {
        return  this.commentService.delete(id)
    }
}

import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateTagsDto } from './dto/createTags.dto';
import { MetatagsService } from './metatags.service';

@Controller('metatags')
export class MetatagsController {
    constructor(private metatagsService:MetatagsService){}

    @Post('/create')
    createTags(@Body() dto:CreateTagsDto) {
        return this.metatagsService.createTags(dto)
    }

    @Post('/companylink/:id')
    linkWithCompany(@Param('id') id:number,@Body('tags')tags:number[]) {
        console.log();
        
        return this.metatagsService.linkCompany(id,tags)
    }

    @Post('/productlink/:id')
    linkWithProduct(@Param('id') id:number,@Body('tags')tags:number[]) {
        return this.metatagsService.linkProduct(id,tags)
    }

    @Delete('/unlinkcompany/:id')
    unlinkWithCompany(@Param('id') id:number,@Body('tags')tags:number[]) {
        return this.metatagsService.unlinkCompany(id,tags)
    }

    @Delete('/unlinkproduct/:id')
    unlinkWithProduct(@Param('id') id:number,@Body('tags')tags:number[]) {
        return this.metatagsService.unlinkProduct(id,tags)
    }
}

import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { EPublished } from 'src/models/case.model';
import { ECrudOperation } from 'src/models/publications.model';
import { ModeratorService } from './moderator.service';

@Controller('moderator')
export class ModeratorController {
    constructor(private moderatorService:ModeratorService){}

    @Post()
    create(@Body('data')data:JSON,@Body('CRUD_Oper')CRUD_Oper:ECrudOperation,@Body('entity_name')entity_name:string,@Body('id')id:number){
        return this.moderatorService.create(data,CRUD_Oper,entity_name,id)
    }
    
    @Put('/update')
    update(@Body('status')status:EPublished,@Body('id')id:number,@Body('comment')comment?:string) {
        return this.moderatorService.updateStatus(status,id,comment)
    }
}

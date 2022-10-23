import { Controller, Get, Post } from '@nestjs/common';
import { ECrudOperation } from 'src/models/publications.model';
import { ModeratorService } from './moderator.service';

@Controller('moderator')
export class ModeratorController {
    constructor(private moderatorService:ModeratorService){}

    @Post()
    create(data:JSON,CRUD_Oper:ECrudOperation,entity_name:string,id:number){
        return this.moderatorService.create(data,CRUD_Oper,entity_name,id)
    }
    @Get()
    GetAll(){
        return this.moderatorService.findAll()
    }
}

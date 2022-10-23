import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { EPublished } from 'src/models/case.model';
import { Company } from 'src/models/company.model';
import { ECrudOperation, Publication } from 'src/models/publications.model';
import { CreateDataDto } from './dto/CreateData.dto';

@Injectable()
export class ModeratorService {
    constructor(@InjectModel(Publication)private publicationModel:typeof Publication, private httpService:HttpService){}

    async create(data:JSON,CRUD_Oper:ECrudOperation,entity_name:string,id:number){
        if (Object.values(ECrudOperation).includes(CRUD_Oper)) {
            let lineId=id
            const newRequest = await this.publicationModel.create({type_Crud:CRUD_Oper,date:new Date(),data,entity_name,baseLineId:lineId})
            return newRequest
        }
        throw new HttpException('Непредвиденная ошибка',HttpStatus.BAD_REQUEST)
        
    }

    async updateStatus(status:EPublished,id:number,comment?:string) {
        if (Object.values(EPublished).includes(status)) {
        const resolveRequest = await this.publicationModel.findByPk(id)
        if (!resolveRequest) throw new HttpException('Модерируемый объект не найден',HttpStatus.NOT_FOUND)
        await resolveRequest.update({published:status}) 
        if (status==EPublished.DENIED){
               await resolveRequest.update({comment})
        }
        this.httpService.post(`http://localhost:3000/${resolveRequest.entity_name}/${resolveRequest.baseLineId}`, {
            headers: {
                'Accept': 'application/json'
            },
            data:{status}
            }).pipe(
                map(response => response.data),
            );
        }
        throw new HttpException('Ошибка ввода данных',HttpStatus.BAD_REQUEST)
    }

    async findAll() {
        return this.httpService.post('http://localhost:3000/company/1', {
  headers: {
      'Accept': 'application/json'
  },
  
}).pipe(
    map(response => response.data),
);
    }
    
}

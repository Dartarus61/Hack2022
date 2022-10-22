import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from 'src/models/location.model';
import { CreateLocDto } from './dto/createLocation.dto';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location) private locationModel:typeof Location){}


    async create(dto: CreateLocDto) {
        console.log(dto);
        
        const locations = await this.locationModel.findOne({where:{name:dto.name}})
        if(locations) throw new HttpException('Локация уже существует',HttpStatus.BAD_REQUEST)
        const newLocate=await this.locationModel.create({...dto,status:Boolean(dto.status)})
        return newLocate
    }

    async getOne(id: number) {
        const OneLocate=await this.locationModel.findByPk(id)
        if(OneLocate) return OneLocate
        throw new HttpException('Локация не найдена',HttpStatus.NOT_FOUND)
    }

    async getAll() {
        const allLocate = await this.locationModel.findAll({include:{all:true}})
        return allLocate
    }

    async update(id: number, dto: CreateLocDto) {
        const LastLocate = await this.locationModel.findByPk(id)
        if (!LastLocate) throw new HttpException('Не найдена локация',HttpStatus.NOT_FOUND)
        await LastLocate.update({...dto,status:Boolean(dto.status)})
        return LastLocate
    }

    async delete(id: number) {
        const LastLocate= await this.locationModel.findByPk(id)
        if (!LastLocate) throw new HttpException('Не найдена локация',HttpStatus.NOT_FOUND)
        if(
            !await this.locationModel.destroy({
                where: {id}
            })
        ){
            throw new HttpException("Can't delete", HttpStatus.BAD_REQUEST)
        }
        return LastLocate
    }
}

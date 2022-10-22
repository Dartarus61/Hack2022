import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EExtentionType, FilesService } from "src/fileLoader/fileLoader.service";
import { Partner } from "src/models/partner.model";
import { PartnerDto } from "./dto/partners.dto";
import { UpdatePartnerDto } from "./dto/updatePartner.dto";

@Injectable()
export class PartnerService {
    constructor(
        @InjectModel(Partner)
        private readonly partnerModel: typeof Partner,

        private readonly fileService: FilesService
    ){}

    async getAll() {
        return this.partnerModel.findAll()
    }

    async getOne(id: number) {
        return this.partnerModel.findByPk(id)
    }

    async create(partner: PartnerDto, file?: Express.Multer.File) {
        const fileName = this.fileService.upload(file, EExtentionType.IMAGE)

        return this.partnerModel.create({
            logo_dir: fileName,
            ...partner
        })
    }

    async update(partner: UpdatePartnerDto, file?: Express.Multer.File) {

        const lastPartner = await this.partnerModel.findByPk(partner.name)

        if (!lastPartner){
            throw new HttpException("Partner not found", HttpStatus.BAD_REQUEST)
        }

        const fileName = this.fileService.update(file, lastPartner.logo_dir, EExtentionType.IMAGE)

        return this.partnerModel.create({
            logo_dir: fileName,
            ...partner
        })
    }

    async delete(id: number) {
        const lastPartner = await this.partnerModel.findByPk(id)

        if (!lastPartner){
            throw new HttpException("Partner not found", HttpStatus.BAD_REQUEST)
        }

        await this.partnerModel.destroy({
            where: {id}
        })

        return lastPartner
        
    }

}
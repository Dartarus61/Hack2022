import { HttpException, HttpStatus } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { EExtentionType, FilesService } from "src/fileLoader/fileLoader.service"
import { Case } from "src/models/case.model"
import { CaseDto } from "./dto/case.dto";

export class CaseService {
    
    
    constructor(
        @InjectModel(Case)
        private readonly caseModel: typeof Case,

        private readonly fileService: FilesService
    ){}

    async getAll(): Promise<Case[]> {
        return await this.caseModel.findAll()
    }

    async getOne(id: number): Promise<Case> {
        return await this.caseModel.findByPk(id)
    }

    async create(files: { video?: Express.Multer.File[], html?: Express.Multer.File[] }, caseDto: CaseDto): Promise<Case>{
        let videoName: string | null = null;
        let htmlName: string | null = null;

        if(files.video){
            videoName = this.fileService.upload(files.video[0], EExtentionType.VIDEO)
        }

        if(files.html){
            htmlName = this.fileService.upload(files.html[0], EExtentionType.HTML)
        }

        const newCase = await this.caseModel.create({
            video_dir: videoName ? videoName : null,
            html: htmlName ? htmlName : null,
            ...caseDto,
            date: new Date()
        })    
        return newCase
    }

    async update(id: number, caseDto: CaseDto, files?: { video?: Express.Multer.File[], html?: Express.Multer.File[] }) {
        const lastCase = await this.caseModel.findByPk(id)
        let videoName: string | null = null;
        let htmlName: string | null = null;

        if(files) {
            if (files.video[0]){
                videoName = this.fileService.update(files.video[0], lastCase.video_dir, EExtentionType.VIDEO)
            }

            if (files.html[0]){
                htmlName = this.fileService.update(files.html[0], lastCase.html, EExtentionType.HTML)
            }
        }

        if(!lastCase) {
            throw new HttpException("Case not fount", HttpStatus.NOT_FOUND)
        }

        const newCase = await lastCase.update({
            video_dir: videoName ? videoName : null,
            html: htmlName ? htmlName : null,
            ...caseDto,
            date: new Date()
        })

        return newCase
    }

    async delete(id: number) {
        const lastCase = await this.caseModel.findByPk(id)

        if(!lastCase) {
            throw new HttpException("Case not fount", HttpStatus.NOT_FOUND)
        }

        if(
            !await this.caseModel.destroy({
                where: {id}
            })
        ){
            throw new HttpException("Can't delete", HttpStatus.BAD_REQUEST)
        }
        this.fileService.deleteFile(lastCase.video_dir,EExtentionType.VIDEO)
        return lastCase

    }

    async findByName(name: string) {
        const Case = await this.caseModel.findOne({where:{name},include:{all:true}}) 
        if (Case) return Case
        throw new HttpException('Кейс не найден',HttpStatus.NOT_FOUND)
    }

    async getByCompanyId(id: number) {
        const cases= await this.caseModel.findAll({where:{companyId:id}})
        if (cases) return cases
        throw new HttpException('Кейсы не найдены',HttpStatus.NOT_FOUND)
      }
}

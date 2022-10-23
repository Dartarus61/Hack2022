import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EExtentionType, FilesService } from 'src/fileLoader/fileLoader.service';
import { Company } from 'src/models/company.model';
import { CreateCompanyDto } from './dto/createCompany.dto';
import * as bcrypt from 'bcrypt'
import { ResponseCompanyDto } from './dto/responsCompany.dto';
import { AddEmailDto } from './dto/addemail.dto';
import { AnotherEmail } from 'src/models/anotherEmail.model';
import { EPublished } from 'src/models/case.model';
import { ModeratorService } from 'src/moderator/moderator.service';
import { ECrudOperation } from 'src/models/moderator.model';

@Injectable()
export class CompanyService {
    
    
    constructor(
        @InjectModel(Company)
        private readonly companyModel: typeof Company,

        @InjectModel(AnotherEmail) private readonly anotherEmailModel:typeof AnotherEmail,

        private readonly fileService: FilesService,

        private readonly moderatorService:ModeratorService
    ){}

    /* getNormObject(body:Company) {
        let temp=JSON.stringify(body, null, 2)
        const cmp=JSON.parse(temp)
        delete cmp.password
        return cmp
    } */

    async getAll(): Promise<Company[]> {
        let companies =await this.companyModel.findAll({include:{all:true}})
        let newCompanies= companies.map(el=>{
            return getNormObject(el)
        })

        return newCompanies

    }

    async getOne(id: number): Promise<Company> {
        return getNormObject(await this.companyModel.findByPk(id,{include:{all:true}}))
    }

    async addEmail(dto:AddEmailDto) {
        const Company = await this.companyModel.findByPk(dto.companyId)
        if (Company) {
            const newEmail = await this.anotherEmailModel.create({email:dto.newEmail})
            Company.$add('anotherEmail',newEmail)
            return newEmail
        }
        throw new HttpException('Компания не найдена',HttpStatus.NOT_FOUND)
    }

    async create(files: { logo: Express.Multer.File[], mainIcon: Express.Multer.File[] }, company: CreateCompanyDto): Promise<ResponseCompanyDto>{
        console.log(1234);
        
        const logoName = this.fileService.upload(files.logo[0], EExtentionType.IMAGE)
        const mainIconName = this.fileService.upload(files.mainIcon[0], EExtentionType.IMAGE)
        const hashPassword = await bcrypt.hash(company.password, 5)
        const newCompany = await this.companyModel.create({
            logo_dir: logoName,
            mainIcon_dir: mainIconName,
            ...company,
            INN: Number(company.INN),
            import_substitution: Boolean(company.import_substitution),
            password:hashPassword
        })

        let sendJSON=getNormObject(newCompany)
        console.log(sendJSON);
        
        const moderatable= await this.moderatorService.create(sendJSON,ECrudOperation.CREATE,'company')
        console.log(moderatable);
        
        return getNormObject(newCompany)
    }

    async update(id: number, company: CreateCompanyDto, files?: { logo?: Express.Multer.File[], mainIcon?: Express.Multer.File[] }) {
        const lastCompany = await this.companyModel.findByPk(id)
        let logoName: string | null = null
        let mainIconName: string | null = null

        if(files) {
            if (files.logo[0]){
                logoName = this.fileService.update(files.logo[0], lastCompany.logo_dir, EExtentionType.IMAGE)
            }

            if (files.mainIcon[0]){
                mainIconName = this.fileService.update(files.mainIcon[0], lastCompany.mainIcon_dir, EExtentionType.IMAGE)
            }
        }

        if(!lastCompany) {
            throw new HttpException("Company not fount", HttpStatus.NOT_FOUND)
        }

        const newCompany = await lastCompany.update({
            logo_dir: logoName ? logoName : lastCompany.logo_dir,
            mainIcon_dir: mainIconName ? mainIconName : lastCompany.mainIcon_dir,
            ...company,
            INN: Number(company.INN),
            import_substitution: Boolean(company.import_substitution)
        })

        return getNormObject(newCompany)
    }

    async delete(id: number) {
        const lastCompany = await this.companyModel.findByPk(id)

        if(!lastCompany) {
            throw new HttpException("Company not fount", HttpStatus.NOT_FOUND)
        }

        if(
            !await this.companyModel.destroy({
                where: {id}
            })
        ){
            throw new HttpException("Can't delete", HttpStatus.BAD_REQUEST)
        }

        this.fileService.deleteFile(lastCompany.logo_dir,EExtentionType.IMAGE)
        this.fileService.deleteFile(lastCompany.mainIcon_dir,EExtentionType.IMAGE)
        return getNormObject(lastCompany)

    }

    async updateStatus(id: number,status:EPublished) {
        console.log(11111);
        
        const company= await this.companyModel.findByPk(id) 
        const newcompany = await company.update({published:status})
        return newcompany
    }

    async findByName(name: string) {
        const company = await this.companyModel.findOne({where:{company_name:name},include:{all:true}})
        if (company) return company
        throw new HttpException('Компания не найдена',HttpStatus.NOT_FOUND)
    }

    async findByINN(inn: number) {
        const company = await this.companyModel.findOne({where:{INN:inn},include:{all:true}})
        if (company) return company
        throw new HttpException('Компания не найдена',HttpStatus.NOT_FOUND)
    }
}

export function getNormObject(body) {
    let temp=JSON.stringify(body, null, 2)
    const cmp=JSON.parse(temp)
    delete cmp.password
    return cmp
}

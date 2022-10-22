import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EExtentionType, FilesService } from 'src/fileLoader/fileLoader.service';
import { Company } from 'src/models/company.model';
import { CreateCompanyDto } from './dto/createCompany.dto';
import * as bcrypt from 'bcrypt'
import { ResponseCompanyDto } from './dto/responsCompany.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company)
        private readonly companyModel: typeof Company,

        private readonly fileService: FilesService
    ){}

    getNormObject(body:Company) {
        let temp=JSON.stringify(body, null, 2)
        const cmp=JSON.parse(temp)
        delete cmp.password
        return cmp
    }

    async getAll(): Promise<Company[]> {
        let companies =await this.companyModel.findAll()
        let newCompanies= companies.map(el=>{
            return this.getNormObject(el)
        })

        return newCompanies

    }

    async getOne(id: number): Promise<Company> {
        return this.getNormObject(await this.companyModel.findByPk(id))
    }

    async create(files: { logo: Express.Multer.File[], mainIcon: Express.Multer.File[] }, company: CreateCompanyDto): Promise<ResponseCompanyDto>{
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
        return this.getNormObject(newCompany)
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

        return this.getNormObject(newCompany)
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

        return this.getNormObject(lastCompany)

    }
}

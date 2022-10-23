import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { EPublished } from "src/models/case.model";
import { CompanyService } from "./company.service";
import { AddEmailDto } from "./dto/addemail.dto";
import { CreateCompanyDto } from "./dto/createCompany.dto";

@Controller("/company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getAll() {
    return this.companyService.getAll()
  }

  @Post('/addemail')
  addEmail(@Body()dto :AddEmailDto) {
    return this.companyService.addEmail(dto)
  }


  @Get("/:id")
  getOne(@Param('id') id: number) {
    return this.companyService.getOne(id)
  }

  @Post("/create")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'mainIcon', maxCount: 1 },
  ]))
  add(@UploadedFiles() files: { logo: Express.Multer.File[], mainIcon: Express.Multer.File[] }, @Body() company: CreateCompanyDto ) {
    return this.companyService.create(files, company)
  }
  
  @Put("/update/:id")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'mainIcon', maxCount: 1 },
  ]))
  update( @Param('id') id: number, @Body() company: CreateCompanyDto, @UploadedFiles() files?: { logo?: Express.Multer.File[], mainIcon?: Express.Multer.File[] }) {
    return  this.companyService.update(id, company)
  }

  @Delete("/delete/:id")
  delete(@Param('id') id: number) {
    return  this.companyService.delete(id)
  }

  @Post('/upstat/:id')
  updateStat(@Param('id')id:number,@Body('status')status:EPublished) {
    return this.companyService.updateStatus(id,status)
  }
}
import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CaseService } from "./case.service";
import { CaseDto } from "./dto/case.dto";

@Controller("case")
export class CaseController {
    constructor(private readonly caseService: CaseService) {}

    @Get()
    getAll() {
      return this.caseService.getAll()
    }
  
    @Get("/image/:id")
    getImage(@Param('id') id: number, @Res() res) {
  
    }
  
    @Get("/:id")
    getOne(@Param('id') id: number) {
      return this.caseService.getOne(id)
    }
  
    @Post("/create")
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'html', maxCount: 1 },
    ]))
    add(@UploadedFiles() files: { video?: Express.Multer.File[], html?: Express.Multer.File[] }, @Body() caseDto: CaseDto ) {
      return this.caseService.create(files, caseDto)
    }
    
    @Put("/update/:id")
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'video', maxCount: 1 },
        { name: 'html', maxCount: 1 },
    ]))
    update( @Param('id') id: number, @Body() caseDto: CaseDto, @UploadedFiles() files?: { video?: Express.Multer.File[], html?: Express.Multer.File[] }) {
      return  this.caseService.update(id, caseDto)
    }
  
    @Delete("/delete/:id")
    delete(@Param('id') id: number) {
      return  this.caseService.delete(id)
    }
}
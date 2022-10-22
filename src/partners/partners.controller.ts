import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PartnerDto } from "./dto/partners.dto";
import { UpdatePartnerDto } from "./dto/updatePartner.dto";
import { PartnerService } from "./partners.service";

@Controller("partner")
export class PartnerController{
    constructor(
        private readonly patnerService: PartnerService
    ){}

    @Get()
    getAll() {
        this.patnerService.getAll()
    }

    @Get(":id")
    getOne(@Param("id") id:number) {
        this.patnerService.getOne(id)
    }

    @Post("/create")
    @UseInterceptors(FileInterceptor('file'))
    create(@Body() partner: PartnerDto, @UploadedFile() file?: Express.Multer.File) {
        this.patnerService.create(partner, file)
    }

    @Put("/update/:id")
    @UseInterceptors(FileInterceptor('file'))
    update(@Body() partner: UpdatePartnerDto, @UploadedFile() file?: Express.Multer.File) {
        this.patnerService.update(partner, file)
    }

    @Delete("/delete/:id")
    delete(@Param("id") id:number) {
        this.patnerService.delete(id)
    }
}
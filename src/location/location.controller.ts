import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLocDto } from './dto/createLocation.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private locationService:LocationService){}

    @Get()
    getAll() {
        return this.locationService.getAll()
    }

    @Get("/:id")
    getOne(@Param('id') id: number) {
        return this.locationService.getOne(id)
    }

    @Post("/create")
    add(@Body() dto: CreateLocDto) {
        return this.locationService.create(dto)
    }
    
    @Put("/update/:id")
    update( @Param('id') id: number, @Body() dto: CreateLocDto,) {
        return  this.locationService.update(id, dto )
    }

    @Delete("/delete/:id")
    delete(@Param('id') id: number) {
        return  this.locationService.delete(id)
    }
}

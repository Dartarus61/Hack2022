import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";

@Controller("category")
export class CategoryController {

    constructor(
        private readonly categotyService: CategoryService
    ){}

    @Get()
    getAll() {
        return this.categotyService.getAll()
    }

    @Get(":id")
    getOne(@Param("id") id: number) {
        return this.categotyService.getOne(id)
    }

    @Post("/create")
    create(@Body() category: CategoryDto) {
        return this.categotyService.create(category)
    }

    @Put("/update/:id")
    update(@Param("id") id: number, category: CategoryDto) {
        return this.categotyService.update(id, category)
    }

    @Delete("/delete/:id")
    delete(@Param("id") id: number) {
        return this.categotyService.delete(id)
    }
}
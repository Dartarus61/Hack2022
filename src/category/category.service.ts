import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "src/models/category.model";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService{
    constructor(
        @InjectModel(Category)
        private readonly categoryModal: typeof Category
    ){} 

    async getAll() {
        return this.categoryModal.findAll()
    }

    async getOne(id: number) {
        return this.categoryModal.findByPk(id)
    }

    async create(category: CategoryDto) {
        const lastCategory = await this.categoryModal.findOne({
            where: {
                name: category.name
            }
        })
        
        if(lastCategory) {
            throw new HttpException("Сategory already exists", HttpStatus.BAD_REQUEST)
        }

        return this.categoryModal.create({...category})
    }

    async update(id: number, category: CategoryDto) {
        const lastCategory = await this.categoryModal.findByPk(id)

        if(!lastCategory){
            throw new HttpException("Category not found", HttpStatus.BAD_REQUEST)
        }

        await lastCategory.update({
            ...category
        })

        return lastCategory
    }

    async delete(id: number) {
        const lastCategory = await this.categoryModal.findByPk(id)

        if(!lastCategory){
            throw new HttpException("Category not found", HttpStatus.BAD_REQUEST)
        }

        await this.categoryModal.destroy({
            where: {
                id
            }
        })

        return lastCategory
    }
}
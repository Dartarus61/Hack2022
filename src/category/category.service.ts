import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { getNormObject } from "src/company/company.service";
import { EPublished } from "src/models/case.model";
import { Category } from "src/models/category.model";
import { ECrudOperation } from "src/models/moderator.model";
import { ModeratorService } from "src/moderator/moderator.service";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService{
    constructor(
        @InjectModel(Category)
        private readonly categoryModal: typeof Category,
        private readonly moderatorService:ModeratorService
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

        const newCategory = await this.categoryModal.create({...category})
        let sendJSON=getNormObject(newCategory)
        delete sendJSON.id
        const moderatable= await this.moderatorService.create(sendJSON,ECrudOperation.CREATE,'category')
        console.log(moderatable);

        return 
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

    async updateStatus(id: number,status:EPublished) {
        const category= await this.categoryModal.findByPk(id) 
        const newCategory = await category.update({published:status})
        return newCategory
    }
}
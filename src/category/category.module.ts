import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "src/models/category.model";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
    controllers: [CategoryController],
    imports: [SequelizeModule.forFeature([Category])],
    providers: [CategoryService]
})

export class CategoryModule {}
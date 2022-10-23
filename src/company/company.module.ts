import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "src/fileLoader/fileLoader.module";
import { AnotherEmail } from "src/models/anotherEmail.model";
import { Company } from "src/models/company.model";
import { ModeratorModule } from "src/moderator/moderator.module";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";

@Module({
    controllers: [CompanyController],
    providers: [CompanyService],
    imports: [SequelizeModule.forFeature([Company,AnotherEmail]), FilesModule,ModeratorModule]
})
export class CompanyModule {}
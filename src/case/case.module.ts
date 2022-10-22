import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "src/fileLoader/fileLoader.module";
import { Case } from "src/models/case.model";
import { CaseController } from "./case.controller";
import { CaseService } from "./case.service";

@Module({
    controllers: [CaseController],
    providers: [CaseService],
    imports: [SequelizeModule.forFeature([Case]), FilesModule]
})
export class CaseModule {}
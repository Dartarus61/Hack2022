import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "src/fileLoader/fileLoader.module";
import { Partner } from "src/models/partner.model";
import { PartnerController } from "./partners.controller";
import { PartnerService } from "./partners.service";

@Module({
    controllers: [PartnerController],
    imports: [SequelizeModule.forFeature([Partner]),  FilesModule],
    providers: [PartnerService]
})
export class PartnerModule {}
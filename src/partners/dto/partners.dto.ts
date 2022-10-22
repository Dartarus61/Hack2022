import { EPublished } from "src/models/case.model";

export class PartnerDto {
    readonly name: string;
    readonly queue: number;
    readonly published: EPublished;
    readonly companyId?: number;
}
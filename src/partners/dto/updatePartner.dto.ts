import { EPublished } from "src/models/case.model";

export class UpdatePartnerDto {
    readonly id: number;
    readonly name: string;
    readonly logo_dir: string;
    readonly queue: number;
    readonly published: EPublished;
    readonly companyId?: number;
}
import { EPublished, ETypeContent } from "src/models/case.model";

export class CaseDto {
    readonly name: string;
    readonly url: string;
    readonly type: ETypeContent;
    readonly published: EPublished;
    readonly date: Date;
    readonly shieldImport: boolean;
}
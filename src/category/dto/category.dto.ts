import { EPublished } from "src/models/case.model";
import { ETypeRelation } from "src/models/category.model";

export class CategoryDto {
    readonly name:string;
    readonly bornFrom:number;
    readonly published:EPublished;
    readonly type:ETypeRelation;
    readonly date: Date;
}
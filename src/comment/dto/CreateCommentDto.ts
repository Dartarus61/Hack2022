import { EPublished } from "src/models/case.model"

export class CreateCommentDto {
    readonly message: string
    readonly grade:number
    readonly date:Date
    readonly name:string
    readonly surname:string
    readonly lastName:string
    readonly dateOfPublished:Date
    readonly picture_dir:string
    readonly published:EPublished
}
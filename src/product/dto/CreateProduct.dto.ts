import { EPublished } from "src/models/case.model"
import { EDeliveryMethod, EPaymentMethod, ETypeBuy, ETypeProduct } from "src/models/product.model"

export class CreateProductDto {
    readonly type:ETypeProduct
    readonly manifacture:string
    readonly brend:string
    readonly name:string
    readonly price:number
    readonly description:string
    readonly typeBuy:ETypeBuy
    readonly minLot:number
    readonly paymentMethod: EPaymentMethod
    readonly deliveryMethod: EDeliveryMethod
    readonly standart: string
    readonly analogs: string
    readonly published:EPublished
    readonly date:Date
    readonly importozamest:boolean
    readonly visible:boolean

}
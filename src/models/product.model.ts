import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { EPublished } from './case.model'
import { Category } from './category.model'
import { PictureProduct } from './pictureProduct.model'
import { TagsProduct } from './productTags.model'

export enum ETypeProduct {
    PRODUCT='PRODUCT',
    SERVICE='SERVICE'
}

export enum ETypeBuy {
    WHOLESALE='WHOLESALE',//опт
    RETAIL='RETAIL',//розница
    BOTH='BOTH'//оба
}

export enum EPaymentMethod {
    CARD='CARD',
    CASH='CASH',
    BOTH='BOTH'
}

export enum EDeliveryMethod {
    COURER='COURER',
    FAST_DELIVERY='FAST_DELIVERY',
    POSTMAT='POSTMAT',
    PICKUP='PICKUP',
    TRANSPORT_COMPANIES='TRANSPORT_COMPANIES',
}

@Table({ tableName: 'Product', timestamps:false, freezeTableName:true })
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.ENUM('PRODUCT','SERVICE'), allowNull: false })
    type: ETypeProduct
    
    @Column({ type: DataType.STRING, allowNull: false })
    manifacture: string

    @Column({ type: DataType.STRING, allowNull: false })
    brend: string

    @Column({ type: DataType.DOUBLE, allowNull: false })
    price: number

    @Column({ type: DataType.STRING, allowNull: false })
    video_dir: string

    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @Column({ type: DataType.ENUM('WHOLESALE','RETAIL','BOTH'), allowNull: false })
    typeBuy: ETypeBuy

    @Column({ type: DataType.INTEGER, allowNull: false })
    minLot: number

    @Column({ type: DataType.ENUM('CARD','CASH','BOTH'), allowNull: false })
    paymentMethod: EPaymentMethod
    
    @Column({ type: DataType.ENUM('COURER','FAST_DELIVERY','POSTMAT','PICKUP','TRANSPORT_COMPANIES'), allowNull: false })
    deliveryMethod: EDeliveryMethod

    @Column({ type: DataType.STRING, allowNull: false })
    standart: string

    @Column({ type: DataType.STRING, allowNull: false })
    analogs: string

    @Column({ type: DataType.ENUM("YES",'NO','DENIED'), allowNull: false,defaultValue:'NO' })
    published: EPublished

    @Column({ type: DataType.DATE, allowNull: false })
    date: Date

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    importozamest: boolean

    @Column({ type: DataType.BOOLEAN, defaultValue:true })
    visible: boolean

    @ForeignKey(() => Category)
    @Column
    categoryId: number

    @BelongsTo(() => Category)
    category: Category

    @HasMany(() => PictureProduct)
    pictureProduct: PictureProduct[]

    @HasMany(() => TagsProduct)
    tagsProduct: TagsProduct[]
}
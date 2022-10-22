import { deliveryMethod, paymentMethod, Published, typeBuy, typeProduct, TypeRelation } from 'enumConfig'
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Category } from './category.model'
import { PictureProduct } from './pictureProduct.model'
import { TagsProduct } from './productTags.model'

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

    @Column({ type: DataType.ENUM('Product','Service'), allowNull: false })
    type: typeProduct
    
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

    @Column({ type: DataType.ENUM('Wholesale','Retail','Both'), allowNull: false })
    typeBuy: typeBuy

    @Column({ type: DataType.INTEGER, allowNull: false })
    MinLot: number

    @Column({ type: DataType.ENUM('Card','Cash','Both'), allowNull: false })
    paymentMethod: paymentMethod
    
    @Column({ type: DataType.ENUM('Courer','FastDelivery','Postamat','Pickup','Transport Companies'), allowNull: false })
    deliveryMethod: deliveryMethod

    @Column({ type: DataType.STRING, allowNull: false })
    standart: string

    @Column({ type: DataType.STRING, allowNull: false })
    analogs: string

    @Column({ type: DataType.ENUM("Yes",'No','Denied'), allowNull: false })
    published: Published

    @Column({ type: DataType.DATE, allowNull: false })
    date: string

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
    cases: TagsProduct[]
}
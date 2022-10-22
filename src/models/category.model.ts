import { Published, TypeRelation } from 'enumConfig'
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Company } from './company.model'
import { Product } from './product.model'

@Table({ tableName: 'Category', timestamps:false, freezeTableName:true })
export class Category extends Model<Category> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.INTEGER, allowNull: true })
    BornFrom: number

    @Column({ type: DataType.ENUM("Yes",'No','Denied'), allowNull: false })
    published: Published

    @Column({ type: DataType.ENUM('Mother','Doughter'), allowNull: false })
    type: TypeRelation 

    @Column({ type: DataType.DATE, allowNull: false })
    date: string

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company

    @HasMany(() => Product)
    product: Product[]
}
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { EPublished } from './case.model'
import { Company } from './company.model'
import { Product } from './product.model'

export enum ETypeRelation {
    MOTHER='MOTHER',
    DOUGHTER='DOUGHTER'
}


@Table({ tableName: 'Category', timestamps: false, freezeTableName: true })
export class Category extends Model<Category> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false,unique: true })
    name: string

    @Column({ type: DataType.INTEGER, allowNull: true })
    bornFrom: number

    @Column({ type: DataType.ENUM("YES",'NO','DENIED'), allowNull: false ,defaultValue:'NO'})
    published: EPublished

    @Column({ type: DataType.ENUM('MOTHER','DOUGHTER'), allowNull: false })
    type: ETypeRelation 

    @Column({ type: DataType.DATE, allowNull: false })
    date: Date

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company

    @HasMany(() => Product)
    product: Product[]
}
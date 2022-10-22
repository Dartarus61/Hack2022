import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { TagsCompany } from './companyTags.model'
import { TagsProduct } from './productTags.model'


@Table({ tableName: 'MetaTegs' ,timestamps:false, freezeTableName:true })
export class MetaTegs extends Model<MetaTegs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @HasMany(() => TagsCompany)
    tagsCompany: TagsCompany[]

    @HasMany(() => TagsProduct)
    TagsProduct: TagsProduct[]
}
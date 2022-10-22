import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { MetaTegs } from './metaTegs.model'
import { Product } from './product.model'


@Table({ tableName: 'TagsProduct', timestamps:false, freezeTableName:true })
export class TagsProduct extends Model<TagsProduct> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Product)
    @Column
    companyId: number

    @BelongsTo(() => Product)
    company: Product

    @ForeignKey(() => MetaTegs)
    @Column
    metaTegsId: number

    @BelongsTo(() => MetaTegs)
    metaTegs: MetaTegs

}
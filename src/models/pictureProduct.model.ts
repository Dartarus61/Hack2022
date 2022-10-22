import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Product } from './product.model'
@Table({ tableName: 'PictureProduct', timestamps:false, freezeTableName:true })
export class PictureProduct extends Model<PictureProduct> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    dirname: string

    @ForeignKey(() => Product)
    @Column
    categoryId: number

    @BelongsTo(() => Product)
    category: Product
}
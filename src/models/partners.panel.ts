import { Published } from 'enumConfig'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Company } from './company.model'

@Table({ tableName: 'Partners', timestamps:false, freezeTableName:true })
export class Partners extends Model<Partners> {
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
    logo_dir: string

    @Column({ type: DataType.INTEGER, allowNull: false })
    queue: number

    @Column({ type: DataType.ENUM("Yes",'No','Denied'), allowNull: false })
    published: Published

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company
}
import { Published, TypeContent } from 'enumConfig'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Company } from './company.model'

@Table({ tableName: 'Case', timestamps:false, freezeTableName:true })
export class Case extends Model<Case> {
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
    url: string

    @Column({ type: DataType.ENUM('HTML','Video'), allowNull: false })
    type: TypeContent

    @Column({ type: DataType.STRING, allowNull: true })
    html: string

    @Column({ type: DataType.STRING, allowNull: true })
    video_dir: string

    @Column({ type: DataType.ENUM("Yes",'No','Denied'), allowNull: false })
    published: Published

    @Column({ type: DataType.DATE, allowNull: false })
    date: string

    @Column({ type: DataType.BOOLEAN, defaultValue:false })
    shieldImport: boolean

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company

}
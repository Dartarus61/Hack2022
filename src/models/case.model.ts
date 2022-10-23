import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Company } from './company.model'

export enum ETypeContent {
    HTML='HTML',
    VIDEO='VIDEO'
}

export enum EPublished {
    YES="YES",
    NO='NO',
    DENIED='DENIED'
}

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

    @Column({ type: DataType.ENUM('HTML','VIDEO'), allowNull: false })
    type: ETypeContent

    @Column({ type: DataType.STRING, allowNull: true })
    html: string

    @Column({ type: DataType.STRING, allowNull: true })
    video_dir: string

    @Column({ type: DataType.ENUM("YES",'NO','DENIED'), allowNull: false,defaultValue:'NO' })
    published: EPublished

    @Column({ type: DataType.DATE, allowNull: false })
    date: Date

    @Column({ type: DataType.BOOLEAN, defaultValue:false })
    shieldImport: boolean

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company

}
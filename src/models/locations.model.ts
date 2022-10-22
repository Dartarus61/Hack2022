import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Company } from './company.model'

@Table({ tableName: 'Locations', timestamps: false, freezeTableName: true })
export class Locations extends Model<Locations> {
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
    adress: string

    @Column({ type: DataType.STRING, allowNull: false })
    GPS: string

    @Column({ type: DataType.STRING, allowNull: false })
    typeOfRelation: string //*головной офис, филиал, дилер, партнер и т.д

    @Column({ type: DataType.STRING, allowNull: false })
    url: string

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    status: boolean //*выключен\включен

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company
}
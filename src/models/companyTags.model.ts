import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Company } from './company.model'
import { MetaTegs } from './metaTegs.model'


@Table({ tableName: 'TagsCompany', timestamps: false, freezeTableName: true })
export class TagsCompany extends Model<TagsCompany> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company

    @ForeignKey(() => MetaTegs)
    @Column
    metaTegsId: number

    @BelongsTo(() => MetaTegs)
    metaTegs: MetaTegs

}
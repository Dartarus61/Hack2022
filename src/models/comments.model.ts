import { Published } from "enumConfig";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "./company.model";


@Table({ tableName: 'Comments', timestamps:false, freezeTableName:true })
export class Comments extends Model<Comments> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    message: string

    @Column({ type: DataType.INTEGER, allowNull: false })
    grade: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string

    @Column({ type: DataType.DATE, allowNull: false })
    dateOfPublished: string

    @Column({ type: DataType.STRING, allowNull: false })
    picture_dir: string

    @Column({ type: DataType.ENUM("Yes",'No','Denied'), allowNull: false })
    published: Published

    @ForeignKey(() => Company)
    @Column
    companyId: number

    @BelongsTo(() => Company)
    company: Company

}
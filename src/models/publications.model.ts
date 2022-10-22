import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { EPublished } from './case.model'

enum ECrudOperation {
    CREATE='CREATE',
    READ='READ',
    UPDATE='UPDATE',
    DELETE='DELETE'
}

@Table({ tableName: 'TagsProduct', timestamps:false, freezeTableName:true })
export class Publication extends Model<Publication> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({type:DataType.ENUM('CREATE','READ','UPDATE','DELETE'),allowNull:false})
    type_Crud:ECrudOperation

    @Column({ type: DataType.ENUM("YES",'NO','DENIED'), allowNull: false })
    published: EPublished

    @Column({ type: DataType.DATE, allowNull: false })
    date:Date

    @Column({ type: DataType.STRING, allowNull: false })
    commnet:string

    @Column({ type: DataType.JSON, allowNull: false })
    data:JSON
}

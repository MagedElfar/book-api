import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "./../db";
import Section, { SectionAttributes } from "./sections.model";

export interface RowAttributes {
    id: number;
    name: string,
    section_id: number,
    section?: SectionAttributes,
    createdAt?: Date;
    updatedAt?: Date;
}

interface RowCreationAttributes extends Optional<RowAttributes, "id"> { }

class Row extends Model<RowAttributes, RowCreationAttributes> implements RowAttributes {
    public id!: number;
    public name: string
    public section_id: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Row.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        section_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "rows",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);

Row.belongsTo(Section, { as: "section", foreignKey: "section_id", onDelete: "CASCADE" })
Section.hasMany(Row, { as: "rows", foreignKey: "section_id" })

export default Row; 
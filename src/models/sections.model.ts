import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "./../db";

export interface SectionAttributes {
    id: number;
    name: string,
    createdAt?: Date;
    updatedAt?: Date;
}

interface SectionCreationAttributes extends Optional<SectionAttributes, "id"> { }

class Section extends Model<SectionAttributes, SectionCreationAttributes> implements SectionAttributes {
    public id!: number;
    name: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Section.init(
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

    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "sections",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);


export default Section; 
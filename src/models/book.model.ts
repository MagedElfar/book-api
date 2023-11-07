import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "../db";
import Row from "./rows.model";
import User from "./user.model";


export interface BookAttributes {
    id: number;
    title: string,
    author: string,
    ISBN: string,
    qty: number,
    row_id: number
    shelfLocation?: Row
    user_id: number,
    user?: UserAttributes,
    createdAt?: Date;
    updatedAt?: Date;
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> { }

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    public title: string;
    public author: string;
    public ISBN: string;
    public qty: number;
    public row_id: number;
    public user_id: number;
    public id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        qty: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        row_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },

        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },

    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "books",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);

Book.belongsTo(Row, { as: "shelfLocation", foreignKey: "row_id", onDelete: "SET NULL" })
Book.belongsTo(User, { as: "user", foreignKey: "user_id", onDelete: "SET NULL" })



export default Book; 
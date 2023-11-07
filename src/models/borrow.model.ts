import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "../db";
import User from "./user.model";
import Book, { BookAttributes } from "./book.model";


export interface BorrowAttributes {
    id: number;
    book_id: number,
    book?: BookAttributes
    user_id: number,
    user?: UserAttributes,
    checkout_date: string,
    due_date: string,
    return_date?: string | null,
    createdAt?: Date;
    updatedAt?: Date;
}

interface BorrowCreationAttributes extends Optional<BorrowAttributes, "id"> { }

class Borrow extends Model<BorrowAttributes, BorrowCreationAttributes> implements BorrowAttributes {
    public return_date?: string;
    public checkout_date: string;
    public due_date: string;
    public book_id: number;
    public user_id: number;
    public id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Borrow.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        return_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        checkout_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "borrows",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);

Borrow.belongsTo(Book, { as: "book", foreignKey: "book_id", onDelete: "CASCADE" })
Borrow.belongsTo(User, { as: "user", foreignKey: "user_id", onDelete: "CASCADE" })



export default Borrow; 
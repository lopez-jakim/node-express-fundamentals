import {DataTypes} from "sequelize";
import {sequelize} from "../config/db.js";

// 1- create a schema
// 2- model based off of that schema

const product = sequelize.define(
    "Product",
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false // Required field
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false // Required field
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false // Required field
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false // Required field
        }
    },
    {
        tableName: process.env.TABLE_NAME,
        timestamps: true //createdAt, updatedAt
    } 
);

export default product
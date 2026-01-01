import {DataTypes} from "sequelize";
import {sequelize} from "../config/db.js";

// 1- create a schema
// 2- model based off of that schema

const Product = sequelize.define(
    "Product",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false // Required field
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false // Required field
        },
    },
    {timestamps: true} //createdAt, updatedAt
);

export default Product
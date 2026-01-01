import {DataTypes} from "sequelize";
import {sequelize} from "../config/db.js";

// 1- create a schema
// 2- model based off of that schema

const productSchema = new mysql2.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
        },
    },
    {timestamps: true} //createdAt, updatedAt
);

const Product = mysql2.model("Product", productSchema)

export default Product
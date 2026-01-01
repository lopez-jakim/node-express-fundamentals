import {Sequelize} from "sequelize";
import dotenv from "dotenv";

const sequelize = new Sequelize(
    process.env.MYSQL_DB_NAME,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT,
});

const connectDB = async() => {
    try {
        await Sequelize.authenticate();
        console.log("Connected to MySQL DataBase Successfully")
    } catch (error) {
        console.error("Error connecting to MySQL:", error.message);
    }
};

export {sequelize, connectDB} ;
import mysql2 from "mysql2"

const connectDB = async() => {
    try {
        const connection = await mysql2.createConnection({
            host: "localhost",
            user: "root",
            password: "1028",
            database: "accreditrack_db",
        });
    } catch (error) {
        console.error("Error connecting to MySQL:", error.message);
    }
};

export default connectDB;
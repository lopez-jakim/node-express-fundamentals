
const connectDB = async() => {
    try {
        const connection = await mysql2.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB_NAME,
        });
        console.log("Connected to MySQL DataBase Successfully")
    } catch (error) {
        console.error("Error connecting to MySQL:", error.message);
    }
};

export default connectDB;
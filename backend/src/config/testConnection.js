const pool = require("./db");

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL Connected");

        connection.release();
    }
    catch (error) {
        console.error(error);
    }
};

module.exports = testConnection;
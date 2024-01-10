const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

module.exports = pool;
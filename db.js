const { Pool } = require("pg");

const useSSL = process.env.USE_SSL === 'true';

const pool = new Pool({
    user: process.env.DB_USER || "deal_user",
    host: process.env.DB_HOST || "dpg-d0vs846mcj7s73fubrl0-a.oregon-postgres.render.com",
    database: process.env.DB_NAME || "deal_db_j8xg",
    password: process.env.DB_PASSWORD || "5GzwhBiX1xkBr8fnDZ4ORyCCq8ja8o0i",
    port: Number(process.env.DB_PORT || 5432),
    ssl: useSSL ? { require: true, rejectUnauthorized: false } : false,
});
module.exports = pool
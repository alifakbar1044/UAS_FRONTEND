const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

// Test koneksi database
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error menghubungkan ke database:', err.stack);
    } else {
        console.log('Berhasil terhubung ke database!');
        release();
    }
});

// Tambahkan error handler
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;

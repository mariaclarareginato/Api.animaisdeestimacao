
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '16042003',
    database: 'animais_deestimacao',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;

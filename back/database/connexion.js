const { Pool } = require('pg'); // conjunto de conexiones 
require('dotenv').config()
// --------------------------

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
//inicialización de la conexión
pool.connect()

module.exports = pool
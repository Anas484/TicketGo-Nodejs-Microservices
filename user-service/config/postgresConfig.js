const pg = require('pg')
const dotenv = require('dotenv')

const dt = dotenv.config()

async function postgresConnect(url) {
    const client = new pg.Client({
        user : dt.parsed.DB_USER,
        host : dt.parsed.DB_HOST,
        database : dt.parsed.DB_NAME,
        password : dt.parsed.DB_PASSWORD,
        port : dt.parsed.DB_PORT

    });
    await client.connect()
}



module.exports = {
    postgresConnect
}
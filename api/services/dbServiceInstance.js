require('dotenv').config();
const dbService = require('./dbService');

async function initializeDbService(){
    const dbUser = process.env.DB_USER;
    const dbHost = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;
    const dbPassword = process.env.DB_PASSWORD;

    return dbService.getInstance(dbUser, dbHost, dbName, dbPassword);
}

module.exports = initializeDbService;
const { Pool } = require('pg');

class dbService {
    constructor(dbUser, dbHost, dbName, dbPassword) {
        this.connectionPool = new Pool({
            user: dbUser,
            host: dbHost,
            database: dbName,
            password: dbPassword,
            port: 5432,
            max: 100,
            ssl: false,
            idleTimeoutMillis: 60000
        });
    }

    static getInstance(dbUser, dbHost, dbName, dbPassword){
        if (!dbService.instance){
            dbService.instance = new dbService(dbUser, dbHost, dbName, dbPassword);
        }
        return dbService.instance;
    }

    async queryMethod(query, params = []){
        try{
            console.log("conlog from DBService: ", "query: ", query, "params:", params)
            const result = await this.connectionPool.query(query, params);
            return result.rows; 
        }catch(error){
            console.error("Error executing query:", error);
            throw error;
        }
    }
}

module.exports = dbService;
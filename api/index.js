const express = require('express');
const cors = require('cors');
const app = express()
const port = 3001;
const initializeDbService = require("./services/dbServiceInstance.js");

//Express & Middleware
app.use(express.json());
app.use(cors());

//Initializers
let dbServiceInstancePromise = initializeDbService().then(instance => {
    console.log('Database service initialized:', instance);
    return instance;
}).catch(error => {
    console.error('Failed to initialize database service:', error);
    process.exit(1);
})

//Import & Use Routes
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/todos', todoRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log("Server is running on http://localhost:"+port.toString());
})

module.exports = { dbServiceInstancePromise };
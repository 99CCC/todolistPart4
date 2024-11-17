const express = require('express');
const router = express.Router();

const {loginController,
        createUserController} = require('../controllers/userController');

//Login
router.post('/', loginController);

//Create
router.post('/newUser', createUserController);

module.exports = router;
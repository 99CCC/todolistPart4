const express = require('express');
const router = express.Router();
//import controllers
const {getTodosByIdController,
    addTodoController,
    toggleTodoController,
    removeTodoController,
    updateTodoController} = require('../controllers/todoController');

//GET ALL
router.get('/:userId', getTodosByIdController);

//Create
router.post('/:userId', addTodoController);

//toggle
router.put('/:id/:userId', toggleTodoController);

//delete
router.delete('/:id/:userId', removeTodoController);

//update Title
router.put('/updateTitle/:id/:userId', updateTodoController);

module.exports = router;
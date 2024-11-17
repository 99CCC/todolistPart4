const { getAllTodosByIdModel,
    addTodoModel,
    toggleTodoModel,
    removeTodoModel,
    updateTodoModel} = require('../models/todoModel');

async function getTodosByIdController(req, res){
    try{
        const userId = req.params.userId;
        const todos = await getAllTodosByIdModel(userId);
        if(todos){
        res.json(todos)
    }else{
        res.status(404).json({message: "No todo objects found"});
    }
    }catch(error){
        res.status(500).json({message: "Error fetching todo objects", error});
    }
}

async function addTodoController(req, res){
    try{
        const newTodo = req.body.title;
        const userId = req.params.userId;

        const addedTodo = await addTodoModel(newTodo, userId);
        res.status(201).json(addedTodo);
    }catch(error){
        res.status(500).json({message: 'Error adding todo', error});
    }
}

async function toggleTodoController(req, res) {
    console.log("Toggle Controller Called, P:", req.params.id);
    try {
        const id = req.params.id;  
        const userId = req.params.userId;
        const updatedTodo = await toggleTodoModel(id, userId);

        if (updatedTodo) {
            console.log("Returning to frontend");
            res.status(200).json(updatedTodo); //Added in status code here!
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error toggling todo object", error });
    }
}


async function removeTodoController(req, res){
    try{
        const id = req.params.id;
        const userId = req.params.userId;
        const removedTodo = await removeTodoModel(id, userId);
        if(removedTodo){
            res.json({message: 'Todo removed', removedTodo});
        }else{
            res.status(404).json({message: 'Todo not found'});
        }

    }catch(error){
        res.status(500).json({message: 'Error Removing todo object', error});
    }
}

async function updateTodoController(req,res){
    try{
        console.log("Controller P:",req.params, " B:", req.body);

        const id = req.params.id;
        const userId = req.params.userId;

        const updateFields = req.body.title;

        const updateTodo =  await updateTodoModel(id, updateFields, userId);
        if(updateTodo.length){
            res.status(200).json(updateTodo[0]);
        }else{
            res.status(404).json({message: 'Todo not found'});
        }
    }catch (error){
        res.status(500).json({message: 'Error Updating todo object', error});
    }
}

module.exports = {
    getTodosByIdController,
    addTodoController,
    toggleTodoController,
    removeTodoController,
    updateTodoController
}
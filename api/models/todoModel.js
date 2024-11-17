// Get dbServiceInstance
async function getDbServiceInstance() {
    try{
        const { dbServiceInstancePromise } = require("../index.js");
        const dbServiceInstance = await dbServiceInstancePromise;
        if (!dbServiceInstance) {
            throw new Error('Database service not initialized');
        }
        return dbServiceInstance;
    } catch (error){
        throw error;
    }
}

//Get all
async function getAllTodosByIdModel(userId){
        try{
            const dbServiceInstance = await getDbServiceInstance();
            const query = 'SELECT * FROM public.todolist WHERE user_id = $1';
            const params = [userId];
            const response = await dbServiceInstance.queryMethod(query, params);
            return response;
        } catch (error){
            throw error;
        }
}

//Add new
async function addTodoModel(newTodo, userId){
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'INSERT INTO public.todolist (title, user_id) VALUES ($1, $2) RETURNING *';
        const params = [newTodo, userId];
        const response = await dbServiceInstance.queryMethod(query, params);
        return response[0];
    }catch(error){
        throw error
    }
}

//Toggler
async function toggleTodoModel(id, userId) {
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const selectQuery = 'SELECT completed FROM public.todolist WHERE todolist_id = $1 AND user_id = $2';
        const selectParams = [id, userId];

        const selectResponse = await dbServiceInstance.queryMethod(selectQuery, selectParams);

        let check = selectResponse[0].completed;

        if (check){check = false;}else{check = true};

        const updateQuery = 'UPDATE public.todolist SET completed = $1 WHERE todolist_id = $2 AND user_id = $3 RETURNING *';
        const updateParams = [check, id, userId];
        const updateResponse = await dbServiceInstance.queryMethod(updateQuery, updateParams);

        return updateResponse;
    }catch(error){
        throw error;
    }
}

//Remove
async function removeTodoModel(id, userId){
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'DELETE FROM public.todolist WHERE todolist_id = $1 AND user_id = $2 RETURNING *';
        const params = [id, userId];
        const response = await dbServiceInstance.queryMethod(query, params);
        return response;
    }catch(error){
        throw error;
    }
}

//Update Title
async function updateTodoModel(id, updatedFields, userId ){
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'UPDATE public.todolist SET title = $2 WHERE todolist_id = $1 AND user_id = $3 RETURNING *';
        const params = [id, updatedFields, userId];
        const response = await dbServiceInstance.queryMethod(query,params);
        return response;
    }catch(error){
        throw error;
    }
}


module.exports = {
    getAllTodosByIdModel,
    addTodoModel,
    toggleTodoModel,
    removeTodoModel,
    updateTodoModel
}
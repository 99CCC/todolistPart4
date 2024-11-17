const baseurl = "http://localhost:3001/api/todos";

//Get All
export async function fetchTodosFromAPI(userId){
    try{
        const response = await fetch(baseurl+"/"+userId);
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Error fetching todos");
        }
    }catch (error){
        console.error("Error fetching todos:", error);
        return [];
    }
}

export async function addTodoAPI(todo, userId){
    try{
        console.log("From helper:",todo)
        const response = await fetch(baseurl+"/"+userId, {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(todo),
        });
        if(response.ok) {
            return await response.json();
        }else {
            throw new Error("Error adding todo");
        }
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

export async function toggleTodoAPI(todoId, userId){
    try{
        console.log("ID toggle: ",todoId);
        const response = await fetch((baseurl+"/"+todoId+"/"+userId), {
            method: "PUT",
            headers: { "Content-type": "application/json"}
        });

        if (response.ok){
            return await response.json();
        } else {
            throw new Error("Error toggling todo");
        }
    } catch (error){
        console.error("Error toggling todo:", error);
    }
}

export async function removeTodoFromAPI(todoId, userId){
    try{
        const response = await fetch(baseurl+"/"+todoId+"/"+userId, {
            method: "DELETE",
        });
        if (response.ok){
            return true;
        }else {
            throw new Error("Error removing todo");
        }
    } catch (error) {
        console.error("Error removing todo:", error);
        return false;
    }
}

export async function updateTodoFromAPI(todoId, updateField, userId){
    try{
        console.log(todoId);
        const response = await fetch(baseurl+"/"+"updateTitle/"+todoId+"/"+userId, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: updateField})
        });

        if (response.ok){
            return await response.json();
        }else{
            throw new Error("Error updating todo");
        }
    }catch (error){
        console.error("Error updating todo:", error);
    }
}
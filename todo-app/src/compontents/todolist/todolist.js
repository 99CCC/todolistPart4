import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./todolist.css"

import { fetchTodosFromAPI, addTodoAPI, toggleTodoAPI, removeTodoFromAPI, updateTodoFromAPI } from "./apiHelper";


function TodoList({userId}){
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState("");
const [editingTodolist_id, setEditingTodolist_id] = useState(null);
const [editTitle, setEditTitle] = useState("");


async function loadTodos(){
    const todosFromAPI = await fetchTodosFromAPI(userId);
    setTodos(todosFromAPI);
}

//might cause problem
useEffect(() => {
    loadTodos(userId);
}, []);

async function handleAddTodo(){
    if(newTodo.trim() === "") return;
    const newTodoItem = {title: newTodo, completed: false};
    console.log("NewTodoItem:", newTodoItem);
    const addedTodo = await addTodoAPI(newTodoItem, userId);
    if (addedTodo){
        setTodos([...todos, addedTodo]);
        setNewTodo("");
    }
}

async function handleToggleTodo(todolist_id) {
    console.log("handletoggle called");
    const updatedTodos = await toggleTodoAPI(todolist_id, userId);
    if (updatedTodos && updatedTodos.length > 0) {
        const updatedTodo = updatedTodos[0];
        setTodos(todos.map((t) => (t.todolist_id === updatedTodo.todolist_id ? updatedTodo : t)));
    }
}


async function handleRemoveTodo(todolist_id){
    const isRemoved = await removeTodoFromAPI(todolist_id, userId);
    if(isRemoved){
        setTodos(todos.filter((t) => t.todolist_id !== todolist_id));
    }
}

async function handleEdit(todo){
    setEditingTodolist_id(todo.todolist_id);
    setEditTitle(todo.title);
}

async function handleConfirmUpdate(todolist_id) {
    const updatedTodo = await updateTodoFromAPI(todolist_id, editTitle, userId);
    if (updatedTodo) {
        setEditingTodolist_id(null);
        setTodos(todos.map((t) =>
            t.todolist_id === updatedTodo.todolist_id ? updatedTodo : t
        ));
    }
}

function handleCancelUpdate(){
    setEditingTodolist_id(null);
    setEditTitle("");
}

    return(
        <>
        <div className="containr mt-4">
            <h1 className="text-center mb-4">Todo List App</h1>
            <div className="input-group mb-3">
                <input 
                type="text"
                className="form-control"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
                />
                <button className="btn btn-primary" onClick={handleAddTodo}>Add Item</button>
            </div>

            <ul className="list-group">
            {todos.map((todo) => (
                <li
                key={todo.todolist_id}
                className="list-group-item d-flex justify-content-between align-items-center">
                    {editingTodolist_id === todo.todolist_id ?(
                        <>
                        <input
                            type="text"
                            className="form-control me-2"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}/>

                        <div className="d-flex">
                            <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleConfirmUpdate(todo.todolist_id)}>Confirm Update</button>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancelUpdate}>
                                Cancel Update
                            </button>
                        </div>
                        </>
                    ):(
                        <>
                        <span
                        className={`flex-grow-1 todo-title ${todo.completed ? "todo-completed" : ""}`}
                        onClick={() => handleToggleTodo(todo.todolist_id)}
                        style={{ cursor: "pointer" }}
                        >
                        {todo.title}
                        </span>

                        <div className="d-flex">
                            <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(todo)}>
                                Edit
                            </button>
                            <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveTodo(todo.todolist_id)}>
                                Delete
                            </button>
                        </div>
                        </>
                )}
                </li> 
            ))}
            </ul>
        </div>
        </>
    )
}

export default TodoList;
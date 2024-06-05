import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios"
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/tasks");
                setTodos(response.data.map(todo => ({
                    id: todo.id,
                    task: todo.content, // Ensure this matches the structure returned by the backend
                    completed: todo.completed, // Assuming all tasks are incomplete by default
                    isEditing: false
                })));
            } catch (error) {
                console.log("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, []);
    const addTodo = async (todo) => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', { content: todo }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTodos([...todos, { id: response.data.id, task: todo, completed: false, isEditing: false }]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };
    
    
    
    const toggleComplete = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/completed/${id}`);
            setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        } catch (error) {
            console.error("Error completing/uncompleting todo:", error);
        }
    }
    const editTodo = (id) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isEditing: !todo.isEditing };
            }
            return todo;
        }));
    };
    
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };
    
    const editTask = async (updatedTaskContent, id) => {
        try {
            const updatedData = {
                content: updatedTaskContent,
            };
    
            const response = await axios.put(`http://localhost:5000/api/update/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, task: updatedTaskContent, isEditing: false };
                    }
                    return todo;
                })
            );
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };
    
    
    return (
        <div className="TodoWrapper">
            <h1>Hello Azureo !</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
    todo.isEditing ? (
        <EditTodoForm key={index} id={todo.id} editTask={editTask} task={todo.task} />
    ) : (
        <Todo key={index} task={todo.task} id={todo.id} completed={todo.completed} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
    )
))}

        </div>
    );
};

import React, { useState } from "react";

export const EditTodoForm = ({ task, editTask, id }) => {
    const [value, setValue] = useState(task);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        editTask(value, id);
        setValue("");
    }
    return <form className="TodoForm" onSubmit={handleSubmit}>
        <input type="text" 
            className="todo-input" 
            placeholder="Update task" 
            value={value}
            onChange={(e) => setValue(e.target.value)}/>
         <button type="submit" className="todo-btn">Update</button>
         </form>;
}

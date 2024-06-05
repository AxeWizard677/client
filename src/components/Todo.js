import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({ id,task,completed,toggleComplete,deleteTodo,editTodo }) => {
    return <div className="Todo">
        <p onClick={() => toggleComplete(id)} className={completed ? "completed" : "incompleted"}>{task}</p>
        <div>
            <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(id)} />
            <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(id)} />
        </div>
        </div>;
}
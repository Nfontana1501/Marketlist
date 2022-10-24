import React from "react";
import { useState } from "react";
import "./todo.css";

export default function Todo({item, onUpdate, onDelete}){

    const [isEdit, setIsEdit] = useState(false);
    const [newValue, setNewValue] = useState(item.title)


    function handleSubmit (e){
        e.preventDefault();
    }

    function handleChange(e){
        e.preventDefault();
        let listener = e.target.value;
        setNewValue(listener);
    }

    function handleClick(){
        onUpdate(item.id, newValue);
        setIsEdit(false)
    }
    
    return (
        <>
            <div>
                {isEdit
                ?     
                <div className="todoFormContainer">
                    <form className="editForm" onSubmit={handleSubmit}>
                        <input className="editInput" type="text" placeholder="Inserte aquí su nueva tarea" onChange={handleChange}/>
                        <button className="editBtn" onClick={handleClick}>Actualizar</button>
                    </form>
                </div>
                : <div className="todoFormContainer">
                    <div className="todo">
                        <span className="">{item.title}</span>
                    </div>
                    <div className="btnContainer">
                        <button className="btnEdit" onClick={() => setIsEdit (true)}>Editar</button>
                        <button className="btnDelete" onClick={() => onDelete(item.id)}>Borrar</button>
                    </div>
                </div>
                }
            </div>
        </>
        
    )
}
import React from "react";
import { useState } from "react";
import Todo from "./Todo";
import "./todo.css";

export default function TodoList(){

    const [todo, setTodo] = useState("")
    const [list, setList] = useState ([])

    function handleSubmit (e){
        e.preventDefault();
        const newTodo ={
            id: crypto.randomUUID(),
            title: todo,
        }
        setList([...list, newTodo])
    }

    function handleChange(e){
        e.preventDefault();
        let listener = e.target.value
        setTodo(listener)
    }

    function handleUpdate(id, value){
        const template = [...list];
        let item = template.find((item) => item.id === id);
        item.title = value;
        setList(template);
    }

    function handleDelete(id){
        const template = [...list];
        setList(template.filter((item) => item.id !== id))
    }

    function handleClear(){
        setList([]);
    }

    return (
        <>
            <div className="header">
                <p>Lista de pendientes</p>
            </div>
            <div className="todoFormContainer">
                <form className="todoForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Inserte aquí su tarea" className="todoInputText" onChange={handleChange}/>
                    <input type="submit" className="todoInputSubmit" value="Agregar"/>
                </form>
            </div>
            <div className="todoListContainer">
                {list.map((item)=>
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                )}
            </div>
            <div className="clearContainer">
                <button className="btnClear" onClick={handleClear}>Clear</button>
            </div>
        </>
        
    )
}
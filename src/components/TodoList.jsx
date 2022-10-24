import React from "react";
import { useState } from "react";
import Todo from "./Todo";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import "./todo.css";
import { db } from "../firebase/firebase";
import CartWidget from "./CartWidget";
import { useNavigate } from 'react-router-dom';


export default function TodoList(){

    const [todo, setTodo] = useState("")
    const [list, setList] = useState ([])
    const [orderId, setOrderId]= useState("")
    const [loader, setLoader] = useState(false)
    const navegar = useNavigate();

    function handleSubmit (e){
        e.preventDefault();
        const newTodo ={
            id: crypto.randomUUID(),
            title: todo,
        }
        setList([...list, newTodo])
        setTodo("")
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

    const handleSend = (e) =>{
        e.preventDefault()
        const marketList = collection(db,"marketlist")
        addDoc(marketList, {
        items: list,
        date: serverTimestamp()
        })
        .then((res)=>{
            setOrderId(res.id)
            handleClear();
        })
        .catch((error)=> console.log(error))
        .finally(()=> setLoader(false))
    }

    return (
        <>
            <div className="header">
                <div className="headerTitleContainer">
                    <p className="headerTitle">Lista de pendientes</p>
                </div>
                <div className="headerIconContainer">
                    <p className="headerText">Mis listas</p>
                    <button onClick={()=>{navegar("/OldLists")}}>
                    <CartWidget/>
                    </button>
                </div>
            </div>
            <div className="todoFormContainer">
                <form className="todoForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Inserte aquí su tarea" value={todo} className="todoInputText" onChange={handleChange}/>
                    <input type="submit" className="todoInputSubmit" value="Agregar"/>
                </form>
            </div>
            <div className="todoListContainer">
                {list.map((item)=>
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                )}
            </div>
            <div className="clearContainer">
                <button className="btnClear" onClick={handleSend}>Enviar</button>
                <button className="btnClear" onClick={handleClear}>Limpiar</button>
            </div>
        </>
        
    )
}
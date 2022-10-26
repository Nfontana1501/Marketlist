import React from "react";
import { useState } from "react";
import Todo from "./Todo";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import "./todo.css";
import { db } from "../firebase/firebase";
import NavBar from "./NavBar";


export default function TodoList(){

    const [todo, setTodo] = useState("")
    const [title, setTitle] = useState("")
    const [finalTitle, setfinalTitle] = useState("")
    const [list, setList] = useState ([])
    const [orderId, setOrderId]= useState("")
    const [loader, setLoader] = useState(false)

    function handleSubmit (e){
        e.preventDefault();
        const newTodo ={
            id: crypto.randomUUID(),
            title: todo,
        }
        setList([...list, newTodo])
        setTodo("")
    }

    function handleSubmitTitle (e){
        e.preventDefault();
        console.log(title)
        setfinalTitle(title)
        setTitle("")
    }

    function handleChange(e){
        e.preventDefault();
        let listener = e.target.value
        setTodo(listener)
    }

    function handleChangeTitle(e){
        e.preventDefault();
        let listener = e.target.value
        setTitle(listener)
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
        setfinalTitle("");
    }

    const handleSend = (e) =>{
        e.preventDefault()
        const marketList = collection(db,"marketlist")
        addDoc(marketList, {
        title: finalTitle,
        items: list,
        date: serverTimestamp()
        })
        .then((res)=>{
            setOrderId(res.id)
            setTitle("")
            handleClear();
        })
        .catch((error)=> console.log(error))
        .finally(()=> setLoader(false))
    }

    return (
        <>
            <NavBar />
            <div className="todoFormContainer">
                <form className="todoForm" onSubmit={handleSubmitTitle}>
                    <input type="text" placeholder="Inserte aquí el título" value={title} className="todoInputText" onChange={handleChangeTitle}/>
                    <input type="submit" className="todoInputSubmit" value="Setear"/>
                </form>
            </div>
            <div className="todoFormContainer">
                <form className="todoForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Inserte aquí su tarea" value={todo} className="todoInputText" onChange={handleChange}/>
                    <input type="submit" className="todoInputSubmit" value="Agregar"/>
                </form>
            </div>
            <div className="todoListContainer">
                <div className="titleContainer">
                    <span className="title">{finalTitle}</span>
                </div>
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
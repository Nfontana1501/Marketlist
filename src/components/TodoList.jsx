import React from "react";
import { useState } from "react";
import Todo from "./Todo";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import "./todo.css";
import { db } from "../firebase/firebase";
import NavBar from "./NavBar";
import { Watch } from  'react-loader-spinner';


export default function TodoList(){

    const [todo, setTodo] = useState("")
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [finalTitle, setfinalTitle] = useState("")
    const [finalName, setfinalName] = useState("")
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
        e.preventDefault()
        setfinalTitle(title)
        setTitle("")
    }

    function handleSubmitName (e){
        e.preventDefault()
        setfinalName(name)
        setName("")
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

    function handleChangeName(e){
        e.preventDefault();
        let listener = e.target.value
        setName(listener)
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
        setfinalName("");
    }

    const handleSend = (e) =>{
        e.preventDefault()
        setLoader(true)
        const marketList = collection(db,"marketlist")
        addDoc(marketList, {
        name: finalName,
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
            {loader ?
            <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
            <Watch height="80" width="80" radius="48"
            color="#424242"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
            </div> :
            <>
            <div className="todoFormContainer">
                <form className="todoForm" onSubmit={handleSubmitName}>
                    <input type="text" placeholder="Inserte aquí su nombre" value={name} className="todoInputText" onChange={handleChangeName}/>
                    <input type="submit" className="todoInputSubmit" value="Setear"/>
                </form>
            </div>
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
                    <span className="title">Lista de {finalTitle} de {finalName} </span>
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
            }
        </>
        
    )
}
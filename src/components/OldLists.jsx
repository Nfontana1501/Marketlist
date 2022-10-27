import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from "../firebase/firebase";
import NavBar from "./NavBar";
import OldItem from "./OldItem";
import OldCollection from "./OldCollection";
import DeleteCollection from "./DeleteCollection";

export default function OldLists (){

    const [loader, setLoader] = useState(false)
    const [desplegable, setDesplegable] = useState(-1)
    const [marketList, setMarketList] = useState([])
    const [eliminar, setEliminar] = useState(false)
    const [idd, setIdd] = useState("")

    useEffect(()=>{
        setLoader(true)
        const getLista = async()=>{
            try{
                const querySnapshot = await getDocs(collection(db, "marketlist"));
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id: doc.id})
                });
                setMarketList(docs)
            }
            catch(error){
                console.log(error)
            }
        }
        getLista();
    }, [])

    function handleClick(e){
        e.preventDefault()
        let listener = e.target.value
        setDesplegable(listener)
        setIdd(listener)
        console.log(listener)
        console.log(idd)
    }

    async function handleDelete(idElement){
        console.log(idElement)
        //let item = marketList.find((item) => item.id === id);
        //await deleteDoc(doc(db, "marketlist", id));
        const newMarketList = marketList[desplegable].items.filter((item) => item.id !== idElement)
        console.log(newMarketList)
    }

    async function a(idCollection){
        console.log(idCollection)
        const id = await deleteDoc(doc(db, "marketlist", idCollection));
        setIdd(id)
    }

    async function handleEliminar(){
        console.log(idd)
        //esto funciono monardo, ahora ponelo lindo, te lo pido por dalma y por giannina
        await deleteDoc(doc(db, "marketlist", idd));
        setEliminar(false)
    }

    return(
        <>
            <NavBar />
            {!eliminar ?
            <div>
                <div>
                    <h2 className="listTitle">Que lista desea visualizar?</h2>
                </div>
                <div className="selectContainer">
                    <select className="select" name="listas" id="list" onClick={handleClick}>
                        <option value={-1}>Seleccione una opción: </option>
                        {marketList.map((item, i)=>
                            <OldCollection key={item.id} i={i} item={item} />
                            //<option key={item.id+i} value={i}>
                            //  {item.title}
                            //</option>
                        )}
                    </select>
                </div>
                <div className="itemsContainer">
                    {desplegable > -1 && (
                        marketList[desplegable].items.map((element,i) => 
                        <OldItem key={element.id} element={element} onDelete={handleDelete}/>
                        // <div className="itemButtonContainer">
                        //     <div className="item" key={element.id} value="">{element.title}</div> 
                        //     <div className="id" key={element.id} value="">{element.id}</div>
                        //     <div className="buttonContainer">
                        //         <button className="button">Comprado</button>
                        //         <button className="button" onClick={handleDelete(element.id)}>Eliminar</button>
                        //     </div>
                        // </div>
                        )
                    )
                    }
                </div>
                <div>
                <button className="btnDeleteSelect" onClick={()=> setEliminar(true)}>Eliminar listas</button>
                </div>
            </div> :
            <div>
                <div>
                    <h2 className="listTitle">Que lista desea Eliminar</h2>
                </div>
                <div className="selectContainer">
                    <select className="select" name="listas" id="list" onClick={handleClick}>
                        <option value={-1}>Seleccione una opción: </option>
                        {marketList.map((item, i)=>
                            <DeleteCollection key={item.id} i={i} item={item} onDelete={a}/>
                            //<option key={item.id+i} value={i}>
                            //  {item.title}
                            //</option>
                        )}
                    </select>
                </div>
                <div>
                    <button className="btnDeleteList" onClick={()=> handleEliminar()}>Eliminar lista</button>
                </div>
            </div>
            }
        </>
    )
}
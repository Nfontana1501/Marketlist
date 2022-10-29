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
    const [listId, setListId] = useState("")

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
            finally{
                setLoader(false)
            }
        }
        getLista();
    }, [])

    function handleClick(e){
        e.preventDefault()
        let listener = e.target.value
        setDesplegable(listener)
        setListId(listener)
    }

    async function handleEliminar(){
        setLoader(true)
        await deleteDoc(doc(db, "marketlist", listId));
        setEliminar(false)
        setLoader(false)
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
                        )}
                    </select>
                </div>
                <div className="itemsContainer">
                    {desplegable > -1 && (
                        marketList[desplegable].items.map((element) => 
                        <OldItem key={element.id} element={element} />
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
                            <DeleteCollection key={item.id} i={i} item={item} />
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
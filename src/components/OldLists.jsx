import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase/firebase";
import NavBar from "./NavBar";

export default function OldLists (){

    const [loader, setLoader] = useState(false)
    const [desplegable, setDesplegable] = useState(-1)
    const [marketList, setMarketList] = useState([])

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
        console.log(listener)
    }

    return(
        <>
            <NavBar />
            <div>
                <h2 className="listTitle">Que lista desea visualizar?</h2>
            </div>
            <div className="selectContainer">
                <select className="select" name="listas" id="list" onClick={handleClick}>
                    <option value={-1}>Seleccione una opción: </option>
                    {marketList.map((item, i)=>
                            <option key={item.id} value={i}>
                                {item.title}
                            </option>
                        )}
                </select>
            </div>
            <div className="itemsContainer">
                    {desplegable > -1 && (
                        marketList[desplegable].items.map((item,i) => 
                        <div className="item" key={item.id} value="">{item.title}</div>
                        )
                    )
                    }
            </div>

        </>
    )
}
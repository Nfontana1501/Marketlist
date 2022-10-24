import React from "react";
import { useState, useEffect } from "react";
import { getDoc, collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import { db } from "../firebase/firebase";
import { async } from "@firebase/util";

export default function OldLists (){

    const [loader, setLoader] = useState(false)
    const [marketList, setMarketList] = useState([])

    /*useEffect(()=>{
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
        console.log(marketList)
    }, [])*/

    /*useEffect(()=>{
        const querydb = getFirestore();
        const queryCollection = collection(querydb, "marketlist");
        getDocs(queryCollection)
        .then(result => 
            setMarketList(result.doc.map(product => ({
                id: product.id,
                ...product.data()
            }))))
            console.log(marketList)
        .catch((error)=> console.log(error))
        .finally(()=> setLoader(false))
    }, [marketList])*/

    /*useEffect(()=>{
        const coleccionProductos = collection(db, "marketList");
        const referenciaDoc = doc(coleccionProductos);
        getDoc(referenciaDoc)
        .then((result) => {
            setMarketList({
                id: result.id,
                ...result.data()
            })
        })
        .catch((error)=> console.log(error))
        .finally(()=> setLoader(false))
    }, [marketList])*/


    useEffect(()=>{
        setLoader(true)
        const getLista = async()=>{
            try{
                const querySnapshot = await getDocs(collection(db, "marketlist"));
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id: doc.id})
                    //console.log(doc.id, " => ", doc.data());
                });
                console.log(docs)
                setMarketList(docs)
                console.log(marketList)
            }
            catch(error){
                console.log(error)
            }
        }
        getLista();
        console.log(marketList)
    }, [])

    console.log(marketList)

    return(
        <>
            <div>
                <p>niqui</p>
                {marketList.map((item)=>
                    <div key={item.id}>{item.title}</div>
                )}
            </div>
        </>
    )
}
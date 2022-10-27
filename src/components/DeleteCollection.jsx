import React from "react";
import OldItem from "./OldItem";

export default function DeleteCollection({item, a}){

    return(
        <>
            <option onChange={()=>a(item.id)} className="desplegable" key={item.id} value={item.id}>
                {item.title}
                {item.id}
            </option>
        </>
    )
}
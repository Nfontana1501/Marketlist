import React from "react";
import OldItem from "./OldItem";

export default function OldCollection({item, i, a}){

    return(
        <>
            <option onChange={()=>a(item.id)} className="desplegable" key={item.id+i} value={i}>
                {item.title}
                {item.id}
            </option>
        </>
    )
}
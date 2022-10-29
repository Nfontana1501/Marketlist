import React from "react";
import OldItem from "./OldItem";

export default function OldCollection({item, i}){

    return(
        <>
            <option className="desplegable" key={item.id+i} value={i}>
                lista de {item.title} de {item.name}
            </option>
        </>
    )
}
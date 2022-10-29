import React from "react";
import { Watch } from  'react-loader-spinner';

export default function DeleteCollection({item}){

    return(
        <>
            <option className="desplegable" key={item.id} value={item.id}>
                lista de {item.title} de {item.name}
            </option>
        </>
    )
}
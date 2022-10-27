import React from "react";

export default function OldItem({element, onDelete}){

    return(
        <div className="itemButtonContainer">
            <div className="item" key={element.id} value="">{element.title}</div> 
            <div className="buttonContainer">
                <div className="buttonContainer2" key={element.id} value="">
                    <button className="button">Comprado</button>
                    <button className="button" onClick={()=>onDelete(element.id)}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}
import { Checkbox } from "@mui/material";
import React from "react";

export default function OldItem({element}){

    function handleClick(e){
        let listener = e.target.value
        console.log(listener)
    }

    return(
        <div className="itemButtonContainer">
            <div className="item" key={element.id} value="">{element.title}</div> 
            <div className="buttonContainer">
            <Checkbox value={element.id} onClick={handleClick} />
            </div>
        </div>
    )
}
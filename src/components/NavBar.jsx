import React from "react";
import "./todo.css";
import CartWidget from "./CartWidget";
import { NavLink, useNavigate } from 'react-router-dom';

export default function NavBar(){

    const navegar = useNavigate();

    return (
        <>
            <div className="header">
                <div className="headerTitleContainer">
                    <NavLink to='/' className="links" >
                        <p className="headerTitle">Lista de compras</p>
                    </NavLink>
                </div>
                <div className="headerIconContainer">
                    <NavLink to='/marketlists' className="linkIcon" >
                        <p className="headerText">Mis listas</p>
                        <CartWidget/>
                    </NavLink>
                </div>
            </div>
        </>
        
    )
}
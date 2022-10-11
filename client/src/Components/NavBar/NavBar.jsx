import React from "react";
import s from './NavBar.module.css'
import '../global.css'
import { NavLink } from "react-router-dom";

export default function NavBar(){
    return (
        <div className={s.navBar}>
                <NavLink to="/home" 
                    exact={true} className={ isActive => isActive ? `subTitleSelected ${s.typeFilter}` : `subTitleUnselected ${s.typeFilter}`}>ALL</NavLink>
                <NavLink to="/home/movies" 
                    className={ isActive => isActive ? `subTitleSelected ${s.typeFilter}` : `subTitleUnselected ${s.typeFilter}`}>TV Show</NavLink>
                <NavLink to="/home/tv_shows" 
                    className={ isActive => isActive ? `subTitleSelected ${s.typeFilter}` : `subTitleUnselected ${s.typeFilter}`}>Movie</NavLink>
        </div>
    )
}
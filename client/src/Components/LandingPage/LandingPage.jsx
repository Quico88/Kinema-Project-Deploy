import React, { useState, useRef } from "react";
import styles from "./LandingPage.module.css";
import logo from "../../Assets/logo.png";
import menu from "../../Assets/menu.png";
//import close from "../../Assets/close.png";
import { Link } from "react-router-dom";
//import { openAndCloseMenu } from "../menuFunction";

export default function LandingPage() {

    let refMenuBtn = useRef() 
    let list = useRef()
    /* let background = useRef() */
    let refCloseBtn = useRef()

    /* let [open, setOpen] = useState(false)

    function handleClick(){
        setOpen(!open)
    } */

    const handleToggleMenu = (e) =>{

            /* if(refMenuBtn.current.id){

                console.log(refMenuBtn.current.id)
            } */

            if(refMenuBtn.current.id == 5){
                refMenuBtn.current.id = refCloseBtn.current.id
                list.current.style.display = "flex"
            } else{
                refMenuBtn.current.id = 5
                list.current.style.display = "none"
                
            }
        
    }

  return (
    <div className={styles.background} /* ref={background} */>
        
      <nav className={styles.nav}>
        <img className={styles.logo} src={logo} alt="logo" />
        
            {/* <img className={styles.close} onClick={handleClick}  src={open ? close : menu} alt="menu" /> */}
          <ul className={styles.list} ref={list}>
          {/* <img className={styles.close} ref={refCloseBtn} value="hola" onClick={handleToggleMenu} alt="gsa" /> */}
            {/* <p className={styles.close} ref={refCloseBtn}  onClick={handleToggleMenu}  >Close</p> */}
            <div className={styles.nav__close}>
            <p className={styles.close} ref={refCloseBtn} id={6}  onClick={handleToggleMenu}>Close </p>

            </div>
            <p className={styles.sign}>REGISTRARSE</p>
            <p className={styles.sign}>INICIAR SESION</p>
          </ul>
          <div className={styles.nav__toggle}>
          {/* <img className={styles.menu} src={menu} id={5} onClick={handleToggleMenu} alt="menu" /> */}
          <p className={styles.menu} ref={refMenuBtn} id={5}  onClick={handleToggleMenu}> Menu</p>
          </div>
        
      </nav>

      <ul className={styles.movies} >
        <div className={styles.top_blur}></div>
        <li className={styles.movie_list}></li>
        <li className={styles.movie_list2}></li>
        <li className={styles.movie_list3}></li>
        <li className={styles.movie_list4}></li>
        <li className={styles.movie_list5}></li>
        <li className={styles.movie_list6}></li>
        <li className={styles.movie_list7}></li>
        <li className={styles.movie_list8}></li>
        <li className={styles.movie_list_collage}></li>
        <div className={styles.bottom_blur}> </div>
      </ul>

      <div className={styles.container_landing}>
        <div className={styles.container_white}>
          <h1 className={styles.main_text}>
            Las mejores peliculas, en un mismo lugar.
          </h1>
          <div className={styles.container_button}>
            <Link to="/home">
              <button className={styles.button_detail}>COMENZAR</button>
            </Link>
          </div>
          <div className="redes">
            {/* <ul>
     <a href="https://github.com/PedroMtz8" target="_Blank" rel="noreferrer"><img className='social' src="https://elfreneticoinformatico.com/wp-content/uploads/2017/10/GitHubLogo.png" alt="github" /></a>
     <a href="https://www.linkedin.com/in/pedro-martinez-a7a615239/" target="_blank" rel="noreferrer"><img className='social' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png" alt="linkedin" /></a>
 </ul> */}
          </div>

          

        </div>
      </div>
          <div className={styles.enjoy}>
            <h3>hola</h3>
          </div>
    </div>
    
  );
}

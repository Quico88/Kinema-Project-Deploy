import React, { useRef } from 'react';
import styles from './LandingPage.module.css';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getHomeAll } from '../../Redux/actions';

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeAll());
  }, [dispatch]);

  let refMenuBtn = useRef();
  let list = useRef();
  let refCloseBtn = useRef();

  const handleToggleMenu = (e) => {
    if (refMenuBtn.current.id === 5) {
      refMenuBtn.current.id = refCloseBtn.current.id;
      list.current.style.display = 'flex';
    } else {
      refMenuBtn.current.id = 5;
      list.current.style.display = 'none';
    }
  };
  return (
    <div className={styles.background}>
      <nav className={styles.nav}>
        <img className={styles.logo} src={logo} alt="logo" />
        <ul className={styles.list} ref={list}>
          <div className={styles.nav__close}>
            <p
              className={styles.close}
              ref={refCloseBtn}
              id={6}
              onClick={handleToggleMenu}
            >
              Close
            </p>
          </div>
          <Link to={'/register'}>
            <p className={styles.sign}>REGISTER</p>
          </Link>
          <Link to={'/login'}>
            <p className={styles.sign}>LOG IN</p>
          </Link>
        </ul>
        <div className={styles.nav__toggle}>
          <p
            className={styles.menu}
            ref={refMenuBtn}
            id={5}
            onClick={handleToggleMenu}
          >
            Menu
          </p>
        </div>
      </nav>
      <ul className={styles.movies}>
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
            All Movies and TV Shows one click ahead!
          </h1>
          <h3 style={{ textAlign: 'center' }}>Sit, relax and enjoy.</h3>
          <div className={styles.container_button}>
            <Link to="/home">
              <button className={styles.button_detail}>Get Started!</button>
            </Link>
          </div>
          <div className="redes"></div>
        </div>
      </div>
      <div className={styles.enjoy}>
        <h3>Hey</h3>
      </div>
    </div>
  );
}

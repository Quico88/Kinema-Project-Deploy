import React, { useRef } from 'react';
import styles from './LandingPage.module.css';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getHomeAll } from '../../Redux/actions';
import { Box, Button, color, Flex, Image, Text } from '@chakra-ui/react';

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeAll());
  }, [dispatch]);

  let refMenuBtn = useRef();
  let list = useRef();
  let refCloseBtn = useRef();

  const handleToggleMenu = (e) => {
    if (refMenuBtn.current.id === "5") {
      refMenuBtn.current.id = refCloseBtn.current.id;
      list.current.style.display = 'flex';
    } else {
      refMenuBtn.current.id = "5";
      list.current.style.display = 'none';
    }
  };
  return (
    <Box className={styles.background}>
      <Flex className={styles.nav}>
        <Image className={styles.logo} src={logo} alt="logo" />
        <Box className={styles.list} ref={list}>
          <Box className={styles.nav__close}>
            <Text
              className={styles.close}
              ref={refCloseBtn}
              id={"6"}
              onClick={handleToggleMenu}
            >
              Close
            </Text>
          </Box>
          <Link to={'/register'}>
            <Text className={styles.sign}>Register</Text>
          </Link>
          <Link to={'/login'}>
            <Text className={styles.sign}>Log In</Text>
          </Link>
        </Box>
        <Box className={styles.nav__toggle}>
          <Text
            className={styles.menu}
            ref={refMenuBtn}
            id={"5"}
            onClick={handleToggleMenu}
          >
            Menu
          </Text>
        </Box>
      </Flex>
      <Box className={styles.movies}>
        <Box className={styles.top_blur}></Box>
        <Box className={styles.movie_list}></Box>
        <Box className={styles.movie_list2}></Box>
        <Box className={styles.movie_list3}></Box>
        <Box className={styles.movie_list4}></Box>
        <Box className={styles.movie_list5}></Box>
        <Box className={styles.movie_list6}></Box>
        <Box className={styles.movie_list7}></Box>
        <Box className={styles.movie_list8}></Box>
        <Box className={styles.movie_list_collage}></Box>
        <Box className={styles.bottom_blur}> </Box>
      </Box>

      <Box className={styles.container_landing}>
        <Box className={styles.container_white}>
          <Text className={styles.main_text}>
            All Movies and TV Shows one click ahead!
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            Sit, relax and enjoy.
          </Text>
          <Box className={styles.container_button}>
            <Link to="/home">
              <Button
                className={styles.button_detail}
                style={{
                  backgroundColor: '#1cdaff',
                }}
              >
                Explore!
              </Button>
            </Link>
          </Box>
          <Box className="redes"></Box>
        </Box>
      </Box>
      <Box className={styles.enjoy}>
        <Text>Hey</Text>
      </Box>
    </Box>
  );
}

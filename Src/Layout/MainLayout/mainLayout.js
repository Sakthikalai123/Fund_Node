import React, { useRef, useEffect, Fragment } from 'react';
import CommonRouter from '../Router/commonRouter';
import Header from '../Header/header';
import { Container } from 'react-bootstrap';
import Sidebar, { SidebarWithAllDetails } from '../Sidebar/sidebar';
import Navigation from '../Header/navigation';
import classes from './mainLayout.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import {  authActions, sidebarActions } from '../../Redux/action';
import { setCookie,clearCookie} from '../../CommonFunctions/commonFunction';
import axios from 'axios';
import { getBaseUrl } from '../../CommonFunctions/commonFunction';
import jwtDecode from 'jwt-decode';
import LoaderAnimation from '../../Pages/Helpers/loader';
import { useCustomLocation } from '../../CommonFunctions/commonFunction';
import { useLocation } from 'react-router-dom';

const MainLayout = () => {   
  const {pathname} = useLocation(); 
  const dispatch = useDispatch();
  const sidebarData = useSelector((state) => state.sidebarData);
  const authData = useSelector((state) => state.authData);
  const userActive = useRef(true);
  const timeoutId = useRef(null);
  const {isClientView} = useCustomLocation();
  const isSideBarOpen = sidebarData.sidebarIsOpen;
  const showSidebar = sidebarData.showSidebar;  
  const isLogged = authData.isLogged;
  /* const isSessionTimeOut = authData.sessionTimeOut; */  
  const accessToken = authData.accessToken;
  const refreshToken = authData.refreshToken; 
  const isLoginPage = (pathname.split('/')[1] === 'login' || pathname.split('/')[1] === '');
    useEffect(() => {
    const resetTimeout = () => {       
      clearTimeout(timeoutId.current);
      /* console.log(isLogged) */
      if (isLogged) {        
        let id = setTimeout(() => {
          handleLogout();
        }, 3600000); // 1 Hours (idle time)
        timeoutId.current = id;
      }
    };
    const handleActivity = () => {
      /* console.log('Active') */
      userActive.current = true;
      resetTimeout();
    };
    const handleLogout = async () => {      
      clearCookie(); // remove Tokens
      dispatch(authActions.setSessionTimeOut());
      dispatch(authActions.setToken()); //to avoid the refresh call after logged out.
    };
    if (isLogged) {
      document.addEventListener('mousemove', handleActivity);
      document.addEventListener('keydown', handleActivity);
    }
    resetTimeout();
    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
    };
  }, [isLogged,dispatch]);
  useEffect(() => {
    let refreshTimeoutId;       
    if (isLogged) {
      try {
        const accessTokenExpiryTime = new Date(
          jwtDecode(accessToken).exp * 1000
        );
        const timeDiff = accessTokenExpiryTime.getTime() - new Date().getTime();
        if (timeDiff > 0) {
          refreshTimeoutId = setTimeout(async () => {
            try {
              let url = `${getBaseUrl()}/auth/refresh`;
              const response = await axios.post(
                url,
                {
                  fnRefreshToken: refreshToken,
                },
                {
                  headers: {
                    Authorization: null,
                  },
                }
              );
              const accessTokenExpiryTime =
                jwtDecode(response.data.fnAccessToken).exp * 1000;
              const refreshTokenExpiryTime =
                jwtDecode(response.data.fnRefreshToken).exp * 1000;
              setCookie(
                'FN_AT',
                response.data.fnAccessToken,
                accessTokenExpiryTime
              );
              setCookie(
                'FN_RT',
                response.data.fnRefreshToken,
                refreshTokenExpiryTime
              );
              dispatch(authActions.setToken());
            } catch (error) {}
          }, timeDiff - 4200000);// call refresh Api before accesstoken gets expired.         
        }
      } catch (e) {        
        throw Error(e);
      }
    }
    return () => {
      clearTimeout(refreshTimeoutId);
    };
  }, [accessToken, refreshToken, isLogged,dispatch]);
  return (
    <Fragment>     
      <LoaderAnimation></LoaderAnimation>
      {/* {((isLogged || isClientView) && !isSessionTimeOut) && (              */}         
            <Container fluid className='mx-0 px-0'>
            {!isLoginPage && 
            <Header />  
            }
            {(isLogged || isClientView) && // need to chech sessiontimeout for clientview
            <Fragment>
            <section id='sideBarSection'>          
            <div
              className={`${classes.sidebarLayout} ${
                showSidebar ? classes.showSidebar : classes.hideSidebar
              }`}
            >
              <span
                className={classes.sidebarToggler}
                onClick={() => dispatch(sidebarActions.sidebarToggler())}
              >
                {showSidebar && <i className='bi bi-arrow-left-short '></i>}
                {!showSidebar && <i className='bi bi-arrow-right-short'></i>}
              </span>
              {showSidebar && <Sidebar />}
            </div>
            <div className={classes.offcanvas}>
              <Offcanvas
                show={isSideBarOpen}
                style={{ backgroundColor: 'whitesmoke' }}
                onHide={() => {
                  dispatch(sidebarActions.setSidebarState());
                }}
              >
                {/* <Offcanvas.Header closeButton className={classes.offcanvas_Header}>
        <Offcanvas.Title ><i className='bi bi-person-circle' style={{fontSize:'26px'}}></i> User</Offcanvas.Title>
      </Offcanvas.Header> */}
                <Offcanvas.Body className={classes.offcanvas_Body}>
                  <SidebarWithAllDetails></SidebarWithAllDetails>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
             </section>           
            <section id='mainContentSection'>
              <div
                className={`${
                  showSidebar
                    ? classes.mainContainer
                    : classes.expandMainContainer
                }`}              >
                {!isClientView &&
                <Navigation/>}                
                <CommonRouter />
              </div>
            </section> 
            </Fragment>
             }
             {(!isLogged && !isClientView) &&
             <CommonRouter/>}
            </Container>       
     {/*  )} */}
     
    </Fragment>
  );
};

export default MainLayout;

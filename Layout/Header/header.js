import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall } from '../../Redux/action';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../Assert/Fundnode-light@4x.png';
import classes from './header.module.css';
import { sidebarActions, authActions } from '../../Redux/action';
import { Whisper, Tooltip } from 'rsuite';
import { authentication } from '../../Service/apiVariable';
import { useCustomLocation } from '../../CommonFunctions/commonFunction';
import { useNavigate } from 'react-router-dom';
import { WarningModal } from '../../CommonFunctions/commonComponent';
/* import Time from '../../Pages/Helpers/timer'; */

const Header = () => {
  const { isClientView } = useCustomLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowModal,setShowModal] = useState(false);
  const authData = useSelector((state) => state.authData);
  const isUnAuthorized = authData.isUnAuthorized;
  const isSessionTimeOut = authData.sessionTimeOut;
  const isLogged = authData.isLogged;
  const signOut = async () => {
    setShowModal(false);
    await dispatch(apiCall({ ...authentication.logOut }));
    dispatch(authActions.refresh());
    navigate('/login');
  };
  const goToProfile = () => {
    navigate('/profile');
  };
  return (
    <Fragment>
      <Navbar expand='lg' sticky='top' className={classes.main}>
        <Container fluid>
          <Navbar.Brand /* href='#home' */>
            {!isUnAuthorized && !isSessionTimeOut && isLogged && (
              <span className={classes.sidebarToggler}>
                <i
                  className='fa fa-bars'
                  onClick={() => {
                    dispatch(sidebarActions.setSidebarState());
                  }}
                ></i>
              </span>
            )}
            <img src={logo} alt='Fund Node' className={classes.img}></img>
          </Navbar.Brand>
          {!isUnAuthorized &&
            !isSessionTimeOut &&
            !isClientView &&
            isLogged && (
              <Nav className='flex-row align-items-center'>
                <Nav.Item className={classes.icons}>
                  <Whisper
                    placement='bottomEnd'
                    trigger='hover'
                    controlId='control-id-click'
                    speaker={<Tooltip>Profile</Tooltip>}
                  >
                    <i
                      className='bi bi-person-circle'
                      onClick={goToProfile}
                    ></i>
                  </Whisper>
                </Nav.Item>
                <Nav.Item className={classes.icons}>
                  <Whisper
                    placement='bottomEnd'
                    trigger='hover'
                    controlId='control-id-click'
                    speaker={<Tooltip>Log Out</Tooltip>}
                  >
                    <i className='bi bi-box-arrow-right' onClick={()=>setShowModal(true)}></i>
                  </Whisper>
                </Nav.Item>
              </Nav>
            )}
        </Container>
      </Navbar>
      <WarningModal
       isOpen={isShowModal}
       proceed={signOut}
       cancel={()=>setShowModal(false)}
       message={"You want to log out from the current session"}
       />
    </Fragment>
  );
};
export default Header;

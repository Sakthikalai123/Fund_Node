import classes from './navigation.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Navigation = () => {
  const menu = [
    'Home',
    'Distributor',
    'Agent Bank',
    'Transfer Agent',
    'Administration',
  ];
  /*  const [pName,setPName]=useState(null) */
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  /*   const secondPath=pathname.split('/')[2]; */

  return (
    <Fragment>
      <div className={classes.main}>
        <Navbar expand='md' className={classes.navbar}>
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className={classes.navbar}
          >
            <Nav className={classes.navbar}>
              {menu.map((item, index) => {
                let url = item.replaceAll(' ', '').toLowerCase();
                return (
                  <Nav.Item key={index} className={classes.navbar}>
                    <Link
                      to={url}
                      className={`${classes.link} ${
                        path === url ? classes.active : ''
                      }`}
                    >
                      {item}
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Fragment>
  );
};
export default Navigation;

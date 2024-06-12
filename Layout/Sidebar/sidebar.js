import React, { useState } from 'react';
import classes from './sidebar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sidebarActions } from '../../Redux/action';
import { useCustomLocation } from '../../CommonFunctions/commonFunction';

const sidebarDetails = [
  {
    id: 'home',
    name: 'Home',
    menu: [
      { item: 'Dashboard', icon: 'bi bi-boxes' },
      { item: 'Distributor Orders', icon: 'bi bi-search' },
      { item: 'AgentBank Orders', icon: 'bi bi-search' },
      { item: 'Reconciliation', icon: 'bi bi-file-earmark-check' },
    ],
  },
  {
    id: 'distributor',
    name: 'Distributor',
    menu: [
      { item: 'Inbound', icon: 'bi bi-telephone-inbound-fill' },
      { item: 'Acknowledgement', icon: 'bi bi-file-earmark-text-fill' },
      { item: 'Outbound', icon: 'bi bi-telephone-outbound-fill' },
      /*  { item: 'GDEC', icon: '' }, */
      { item: 'Upload', icon: 'bi bi-cloud-upload-fill' },
      { item: 'Exceptional Trades', icon: 'bi bi-bookmarks-fill' },
    ],
  },
  {
    id: 'agentbank',
    name: 'Agent Bank',
    menu: [
      { item: 'Inbound', icon: 'bi bi-telephone-inbound-fill' },
      { item: 'Acknowledgement', icon: 'bi bi-file-earmark-text-fill' },
      { item: 'Outbound', icon: 'bi bi-telephone-outbound-fill' },
    ],
  },
  { id: 'transferagent', name: 'Transfer Agent', menu: [] },
  {
    id: 'administration',
    name: 'Administration',
    menu: [
      { item: 'Participant', icon: 'bi bi-person-fill' },
      { item: 'Job Config', icon: 'bi bi-gear-wide-connected' },
      { item: 'Application Domain', icon: 'bi bi-globe2' },
      { item: 'Application Lov', icon: 'bi bi-file-earmark-text-fill' },
      { item: 'Application Config', icon: 'bi bi-gear-wide-connected' },
    ],
  },
];
/* sidebar_AB_DB for agentbank and distributor users */
const uuid = [
  {id:'pspl',value:'b2d4c049-0574-4981-aa48-18f6d68b5306'},
  {id:'uobkh',value:'dcdf99b6-aa0b-46d7-9ef5-f04bc8a15c34'},
  {id:'dbs',value:'a7405b27-fcc5-4f26-a29e-f007d23470c1'},
  {id:'singlife',value:'e905c49d-d88e-4419-88b8-3f8b946bc63e'}
];
const sidebar_AB_DB = [
  { item: 'Dashboard', icon: 'bi bi-boxes' },
  /* { item: 'Orders', icon: 'bi bi-search' }, */
 /*  { item: 'Reconciliation', icon: 'bi bi-telephone-outbound-fill' }, */
];
const Sidebar = () => {
  const { isClientView } = useCustomLocation();
  const { pathname } = useLocation();
  let content;
  const path = pathname.split('/')[1];
  const sidebarData = sidebarDetails.find((item) => item.id === path);
  if (isClientView) {
    content = sidebar_AB_DB;
  } else {
    content = sidebarData !== undefined ? sidebarData.menu : [];
  }
  return (
    <div className={classes.sidebar}>
      {content.map((data, index) => (
        <Options
          menu={data.item}
          icon={data.icon}
          key={index}          
        ></Options>
      ))}
    </div>
  );
};
export const Options = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {participantName,isClientView} = useCustomLocation();
  const getUuid = () =>{
    const result = uuid.find((data)=>data.id.toLowerCase() === participantName.toLowerCase());
    return result.value;
  }  
  let isActive, url; 
  if (isClientView) {
    isActive =
      pathname.split('/')[3] === props.menu.replaceAll(' ', '').toLowerCase();
    url = `${pathname.split('/')[1]}/${pathname.split('/')[2]}/${props.menu}/${getUuid()}`.replaceAll(' ', '').toLowerCase();
  } else {
    const basePath = props.mobile
      ? props.name.replaceAll(' ', '').toLowerCase()
      : pathname.split('/')[1];
    isActive =
      pathname.split('/')[2] === props.menu.replaceAll(' ', '').toLowerCase() &&
      basePath === pathname.split('/')[1];
    url = `/${basePath}/${props.menu}`.replaceAll(' ', '').toLowerCase();
  }
  const openMenu = () => {    
    navigate(url);
    if (props.mobile) {
      dispatch(sidebarActions.setSidebarState()); // close Offcanvas if it is open.
    }
  };
  return (
    <div
      className={`my-2 p-1 ${classes.menu} ${
        isActive ? classes.activeMenu : ' '
      }`}
      onClick={() => openMenu()}
    >
      <i className={`${props.icon} pe-2`}></i>
      <span>{props.menu}</span>
    </div>
  );
};
export const SidebarWithAllDetails = () => {
  const { isClientView } = useCustomLocation();
  let sideBarData;
  if (isClientView) {
    sideBarData = sidebar_AB_DB.map((data, index) => (
      <Options
        menu={data.item}
        icon={data.icon}
        key={index}
        isClientView={isClientView}
        mobile={true}
      ></Options>
    ));
  } else {
    sideBarData = sidebarDetails.map((data, index) => {
      return <Heading name={data.name} menu={data.menu} key={index}></Heading>;
    });
  }
  return <div className={classes.sidebarwithdetals}>{sideBarData}</div>;
};
export const Heading = (props) => {
  const menuCount = props.menu.length;
  const [toggle, setToggle] = useState(true);
  return (
    <div>
      <div
        className={classes.sideberHeading}
        onClick={() => (menuCount > 0 ? setToggle((prev) => !prev) : null)}
      >
        <span>{props.name}</span>
        {menuCount > 0 &&
          (toggle ? (
            <i className='bi bi-chevron-up'></i>
          ) : (
            <i className='bi bi-chevron-down'></i>
          ))}
      </div>
      <div className={`${toggle ? classes.show : classes.hide}`}>
        {props.menu.map((data, index) => (
          <Options
            name={props.name}
            menu={data.item}
            icon={data.icon}
            key={index}
            mobile={true}
          ></Options>
        ))}
      </div>
    </div>
  );
};
export default React.memo(Sidebar);

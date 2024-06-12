import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';
import { clientRoutes } from '../Layout/Router/routes';

export const startDay = (props) => {  
  if (props === 'dateFormat') {
    return moment().subtract(7, 'days').toDate();
  } else return moment().subtract(7, 'days').format('YYYYMMDD');
};
export const previousDay = (props) => {  
  if (props === 'dateFormat') {
    return moment().subtract(7, 'days').toDate();
  } else return moment().subtract(1, 'days').format('YYYYMMDD');
};
export const today = (props) => { 
  if (props === 'dateFormat') {    
    return moment().toDate();
  } else return moment().format('YYYYMMDD');
};
export const setCookie = (key,value,expTime) => {
        let now = new Date();       
        now.setTime(expTime);
        document.cookie = `${key}=${value};expires=${new Date(now)};path=/`;
}

export const getCookie = (cookie_name) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + cookie_name + '=');
  if (parts.length === 2)
  {
    return parts.pop().split(';').shift(); 
  } else return null
};

export const clearCookie = () =>{  
        let Cookies = document.cookie.split(';');
        for (let i = 0; i < Cookies.length; i++){
        document.cookie = `${Cookies[i] + '=;expires=' + new Date(0).toUTCString()};path=/`       
        }       
};
export const getBaseUrl = ()=>{
  let baseUrl = `${process.env.REACT_APP_URL}${process.env.REACT_APP_BASE_URI}`
  return baseUrl;
}
export const getUserRole = () =>{
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let role = userInfo?.FnUserDetails?.authorities?.map((data)=>data.authority);
  let isAdmin = role?.some((data)=>data === 'ADMINISTRATOR');
  let userRole = isAdmin ? 'Admin' : 'Others'; 
 
  return userRole;
}
/* The below function is customhookfunction because UseLoaction() only used in react component/hooks */
export const useCustomLocation = ()=>{
  const {pathname} = useLocation();
  /* isClientView  */
  const isClientView = clientRoutes.some( (url) =>{
    if(url.childrens){
    return  url.childrens.some(childUrl => (childUrl.path === pathname || url.path === pathname));
    }
    else{ 
     return  url.path === pathname;
    }   
  } ); 
  /* participantName  */
  const participantName = pathname?.split("/")[2]?.toUpperCase();
  /* baseComponentUrl */
  const count = pathname.split('/').length;
  let urlArr = pathname.split('/');
  urlArr.splice(count-1,1);
  const baseComponentUrl = urlArr.join('/');
  const isReconInitialPage = (pathname === "/home/reconciliation/ab-process" || pathname === "/home/reconciliation/ab-process")
  return {isClientView,participantName,baseComponentUrl,pathname,isReconInitialPage}
};


 
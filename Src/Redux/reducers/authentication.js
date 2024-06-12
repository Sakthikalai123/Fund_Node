import { createSlice } from "@reduxjs/toolkit";
import { getCookie,clearCookie } from "../../CommonFunctions/commonFunction";

const userInfo = ()=>{
  let info;
  try{
    info = JSON.parse(localStorage.getItem("userInfo"))
  }
  catch(e){
    info = null
  }
  return info
}
let initialState = {
  isLogged: (getCookie("FN_AT") !== null && getCookie("FN_AT") !== undefined),
  userInfo: userInfo(),
  isUnAuthorized:false,
  sessionTimeOut: false, 
  accessToken: getCookie("FN_AT"),
  refreshToken: getCookie("FN_RT"),
  /* timer:60*5 */
};
const authSlice=createSlice({
    name:"Auth",
    initialState:{...initialState},                   
    reducers:{
      refresh:()=>{        
        return {...initialState,
          isLogged: (getCookie("FN_AT") !== null && getCookie("FN_AT") !== undefined)}        
      },
      setToken:(state)=>{
        state.accessToken = getCookie("FN_AT");
        state.refreshToken = getCookie("FN_RT");       
      },
      isLogged:(state)=>{       
       state.isLogged = (getCookie("FN_AT") !== null && getCookie("FN_AT") !== undefined) ;          
       },
      setUserInfo:(state,action)=>{       
        localStorage.setItem("userInfo",JSON.stringify(action.payload));
        state.userInfo = JSON.parse(localStorage.getItem("userInfo")) ;
       
      },
      triggerLogout:(state)=>{       
        clearCookie(); 
        localStorage.clear()
        state.isLogged = false;      
      },
      setSessionTimeOut:(state)=>{        
        clearCookie();// newly added
        localStorage.clear();    
        state.isLogged = false;         
        state.sessionTimeOut= true;
      },
      setUnAuthorized:(state)=>{
        state.isUnAuthorized = true;      
      }
  /*    resetTimer:(state)=>{    
      state.timer=initialState.timer;
     } */
    }

})
export default authSlice
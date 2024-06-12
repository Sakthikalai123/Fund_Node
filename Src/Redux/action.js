import { getCookie,getBaseUrl } from '../CommonFunctions/commonFunction';
import distributorSlice from './reducers/distributor';
import administrationSlice from './reducers/administration';
import commonSlice from './reducers/common';
import authSlice from './reducers/authentication';
import jobFieldMapSlice from './reducers/jobFiledMap';
import axios from 'axios';
import agentBankSlice from './reducers/agentbank';
import profileSlice from './reducers/profile';
import modalSlice from './reducers/modal';
import sidebarSlice from './reducers/sidebar';
import dashboardSlice  from './reducers/Home/dashboard';
import reconciliationSlice from './reducers/Home/reconciliation';

export const homeActions = dashboardSlice.actions;
export const reconciliationAction = reconciliationSlice.actions;
export const sidebarActions = sidebarSlice.actions;
export const modalActions = modalSlice.actions;
export const commonActions = commonSlice.actions;
export const distributorActions = distributorSlice.actions;
export const authActions = authSlice.actions; 
export const administrationActions = administrationSlice.actions;
export const agentBankActions = agentBankSlice.actions;
export const jobFieldMapActions = jobFieldMapSlice.actions;
export const profileActions = profileSlice.actions;


export const apiCall = (props) => {
  // Destructure props for better readability
  const { api, method, requestData, func, callBack, name, loadingState } = props;

  const url = `${getBaseUrl()}${api}`;

  // Set Authorization header
  if(props.token){
   axios.defaults.headers['Authorization'] = `Bearer ${getCookie('FN_AT')}`;
  }
  else{
   axios.defaults.headers['Authorization'] = null; 
  }

  // List of operations that show toast
  const operationsWithToast = ['update', 'create', 'updateStatus', 'delete', 'upload','email'];
  const isShowToast = operationsWithToast.includes(name);

  return async (dispatch, getState) => {
    const apiRequest = async () => { 
        let response;
        if (method === 'get') {
          const newUrl = requestData !== undefined ? `${url}/${requestData}` : url;
          response = await axios.get(newUrl);
        } else if (method === 'post') {
          const { getRequestData } = getState().commonData;
          const dataToSend = requestData !== undefined ? requestData : getRequestData;
          response = await axios.post(url, dataToSend);
        } else {
          response = await axios.put(url, requestData);
        }
        const result = response.data;
        if (result.message !== undefined && result.status !== undefined) {
          customResponse(result.message, result.status, func, result.data);
        }
        else if(name === "email"){
          let status,message;          
          if(response.status === 200 || response.data === "Success"){
            status = "SUCCESS";
            message = "Email Sent Successfully"
          }
          else{
            status = "FAILED";
            message = "Could Not Sent Email"
          }
          dispatch(func({ message: message, status: status }))
        }else {
          dispatch(func(result));
        }
        callBack !== undefined && await dispatch(apiCall(callBack));      
    };

    const customResponse = (message, status, func, data) => {     
      let newMessage,newStatus;    
      // this condition is added to set response if status have diff value other than SUCCESS/FAILED
      if(message === 'UPLOADED'){        
        newMessage = 'Files Uploaded Successfully'
        newStatus = 'SUCCESS'
        }
        else if(message === 'APPROVED'){
          newMessage = 'File Approved Successfully'
          newStatus = 'SUCCESS'
        }    
        else if(message === 'UPDATED' || message === 'PROCESSED' || message === 'SUBMITTED'){ 
          newMessage = message
          newStatus= 'SUCCESS'
        }
        // This SUCCESS conditon added to avoid confilicts 
        else if(status === 'SUCCESS'){ 
          newMessage = message
          newStatus= status
        }       
        else{
          newMessage = message
          newStatus = 'FAILED'
        }
      if (data !== undefined) {
        dispatch(func({ message: newMessage, status: newStatus, data }));
      } else {
        dispatch(func({ message: newMessage, status: newStatus }));
      }
    };

    const handleApiError = (error) => {
      console.warn("Error",error)
      if (error !== undefined) {
        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {        
          dispatch(authActions.setUnAuthorized(true));          
          dispatch(authActions.triggerLogout());
        }     
        dispatch(commonActions.setResponse({ message: 'Something Went Wrong', status: 'ERROR' }));
        isShowToast && dispatch(commonActions.setUpdating(true));
        dispatch(commonActions.setLoading(false));
        dispatch(commonActions.setError(true));
      }
    };

    try {
      dispatch(commonActions.setUpdating(false));
      if (loadingState) {
        dispatch(commonActions.setLoading(true));
      }
      await apiRequest();
      loadingState && dispatch(commonActions.setLoading(false));
      isShowToast && dispatch(commonActions.setUpdating(true));
      dispatch(commonActions.setError(false));
    } catch (e) {
      handleApiError(e);
    }
  };
};



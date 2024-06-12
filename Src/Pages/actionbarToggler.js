import { Form } from "react-bootstrap"
import React,{useRef,useState} from "react"
import { useSelector,useDispatch } from "react-redux";
import { apiCall,commonActions } from "../Redux/action";

const ActionbarToggler=(props)=>{
    const dispatch=useDispatch();
    const commonData=useSelector(state=>state.commonData);
    const [state,setState]=useState(true);
    const toggleValue=useRef();
    const totalRecords = commonData.records.totalRecords;
    
    const updateToggler=()=>{
        setState(toggleValue.current.checked)
        const value=toggleValue.current.checked;        
       /*   dispatch(commonActions.refresh()); */
        /*  dispatch(commonActions.setSortDate( {sortColumn:"fileProcessedDate",sortOrder:"desc"}))  */
        dispatch(commonActions.setPageNumber(1));
        dispatch(commonActions.setSearchData({...commonData.searchData,excludeEmptyBatch:value}));
        dispatch(commonActions.setGetRequestData());
        dispatch(apiCall({...props.api}));     

    }
    return <div data-testid="actionbarToggler">
        {(totalRecords > 0 && !(commonData.isError)) &&
         <Form>        
        <Form.Check            
            name = "toggler"
            ref = {toggleValue} 
            type = "switch" 
            onChange = {updateToggler} 
            label = "Exclude Empty Batch" 
            reverse 
            defaultChecked = {state}            
        ></Form.Check>  
        </Form> 
    }
        </div>

}
export default React.memo(ActionbarToggler)
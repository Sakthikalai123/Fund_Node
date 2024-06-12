import {Form, Row, Col} from "react-bootstrap";
import React,{ Fragment, useState, useEffect } from "react";
import {  useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { commonActions, modalActions,reconciliationAction} from "../Redux/action";
import { DateSelector,CustomButton } from "../CommonFunctions/commonComponent";
import { startDay, today, useCustomLocation} from "../CommonFunctions/commonFunction";
import { apiCall } from "../Redux/action";
import moment from "moment";

const SearchForm = (props) => {    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(null);   
  const {participantName,pathname,isReconInitialPage} = useCustomLocation();
  const name=props.name;
  const initialApi=props.initialApi;
  // for reconciliation page  
  const isReconSearch = (pathname.includes("ab-process") || pathname.includes("db-process"));
  const reconDate = localStorage.getItem("recon_date");
  const reconPartName = localStorage.getItem("recon_part_name")
  const [reconSelectValue,setReconSelectValue] = useState(reconPartName);
  const handleFormFeilds = (event, id, type) => {  
    let data = { ...inputValue }; 
     
    switch(type){
      case ("date") :                 
                  data[id] = moment(event).format("YYYYMMDD") ;
                  break;      
      case ("map")  :
                  data[id] = parseInt(event.target.value);
                  break;
      case ("reconDate") :                 
                  data[id] = moment(event).format("YYYYMMDD") ;
                  localStorage.setItem("recon_date",moment(event).format("YYYYMMDD"))
                  break;
      case ("reconSelect") :                                  
                  data[id] = event.target.value.trim() ;
                  localStorage.setItem("recon_part_name",event.target.value); 
                  setReconSelectValue(event.target.value);                 
                  break;
      default : event.target.value.trim().replaceAll(" ","").length === 0 
                  ? data[id] = null
                  : data[id] = event.target.value.trim()

    }
    setInputValue(data);
  };
  if(!inputValue){
    let stateValue = {};
    if(isReconSearch){
      props.searchFields.forEach((data)=>{
        if(data.id==="participantShortName"){          
          stateValue = {...stateValue,[data.id]:reconPartName}
        }
        else{
          stateValue = {...stateValue,[data.id]:(reconDate === null) ? data.value : reconDate}
        }
      });
    }
    else
    {    
    props.searchFields.forEach((data) => {
      for (let key in data) {
        if (key === "id" && data[key] !== null) {
          let newKey = data[key];          
          if(name === "inbound"){
            stateValue = { ...stateValue, [newKey]: null,excludeEmptyBatch: true}
          }
          else if(name === "clientViewOrderInfo" || name === "clientViewFileInfo"){
            stateValue = { ...stateValue, [newKey]: null,participantShortName:participantName }
          }
          else{
            stateValue = { ...stateValue, [newKey]: null }
          }
        /*   (name==="inbound" ? stateValue = { ...stateValue, [newKey]: null,excludeEmptyBatch: true}
          : stateValue = { ...stateValue, [newKey]: null }) */
          
        } 
        else if (key === "subName") {
          for (let items of data.subName) {
            for (let key in items) {
              if (key === "id") {
                let newKey = items[key];
                stateValue = { ...stateValue, [newKey]: items.value };
              }
            }           
          }
        }
      }
    });
    }
    setInputValue(stateValue);   
  }  
  useEffect(() => {
     async function api(){
      dispatch(modalActions.refreshModal());  // close all modal
      dispatch(commonActions.refresh()) ;
      dispatch(reconciliationAction.refresh()); 
      dispatch(commonActions.setSortDate(props.sortData));
      dispatch(commonActions.setSearchData(inputValue));
      dispatch(commonActions.setGetRequestData(isReconSearch));
      dispatch(commonActions.setLoading(true)); 
      if(isReconInitialPage){
        await dispatch(apiCall({...initialApi[0]})); // This will call only distributorList API
      }
      else{
        for(let apiData of initialApi){
          await dispatch(apiCall({ ...apiData }));
        }
      }
       dispatch(commonActions.setLoading(false));
     }
      api();
    return ()=>{
      localStorage.removeItem("recon_part_name");
      localStorage.removeItem("recon_date")
    }
  }, []);
 /*  console.log(reconSelectValue) */
 const formSubmitHandler = (e)=>{
  e.preventDefault();  
  /* dispatch(commonActions.refresh())  */
  if(pathname === "/home/reconciliation/ab-process"){
    navigate("/home/reconciliation/ab-process/orders");
  }  
  async function api(){
    dispatch(commonActions.setSearchData(inputValue));
    dispatch(commonActions.setPageNumber(1));
    dispatch(commonActions.setGetRequestData(isReconSearch)); 
    dispatch(commonActions.setLoading(true));
    if(isReconSearch){
      for(let apiData of initialApi){
        await dispatch(apiCall({ ...apiData }));
      }
    }
    else{
      await dispatch(apiCall({...initialApi[0]}));
    }    
    dispatch(commonActions.setLoading(false));
  }
  api();
 }
  return (
    <Fragment>
      <Form onSubmit={formSubmitHandler} className="p-2" data-testid="form">       
        <Row className="d-flex align-items-center">
          {props.searchFields.map((data, index) => {
            return (
              <Col lg={6} key={index}>
                <Form.Group
                  as={Row}
                  className="mb-1 d-flex align-items-center"
                  controlId={`formPlaintext${data.name}`}                  
                >
                  <Form.Label column sm="3" className="d-flex align-items-center">
                    {data.name}
                  </Form.Label>
                  {data.type === "select" && (
                    <Col sm="9" className="d-flex align-items-center">
                      <Form.Select           
                        name={data.id}
                        onChange={(event) =>
                          handleFormFeilds(event, data.id, data.type)
                        }
                      >
                        <option                         
                          hidden                         
                          value={null}
                        >{`select ${data.name.toLowerCase()}`}</option>                       
                         <option value={""} >ALL</option>                         
                        {data?.value?.map((data,index) => (
                          <option value={data} key={index}>{data}</option>
                        ))}                       
                      </Form.Select>
                    </Col>
                  )}
                   {data.type === "map" && (
                    <Col sm="9" className="d-flex align-items-center">
                      <Form.Select
                        name={data.id}                       
                        onChange={(event) =>
                          handleFormFeilds(event, data.id, data.type)
                        }
                      >
                        <option
                          hidden
                          value={null}
                        >{`select ${data.name.toLowerCase()}`}</option>
                         <option value={""} >ALL</option>
                        {data?.value?.map((data,index) => {                         
                            return  <option value={data.value}  key={index} >{data.key}</option>
                         }
                        )}
                        
                      </Form.Select>
                    </Col>
                  )}
                  {data.type === "text" && (
                    <Col sm="9" className="d-flex align-items-center">
                      <Form.Control                     
                        name={data.id}
                        onChange={(event) =>
                          handleFormFeilds(event, data.id, data.type)
                        }                        
                        type="text"
                        placeholder={`enter ${data.name.toLowerCase()}`}                        
                      ></Form.Control>
                    </Col>
                  )}
                  {data.type === "date" && (
                    <Col sm="9" className="d-flex align-items-center">
                      <DateSelector                      
                        defaultValue={startDay("dateFormat")}
                        onChange={(event) =>
                          handleFormFeilds(event, data.subName[0].id, data.type)
                        }
                      />
                      <span className="px-1">                     
                      <i className="bi bi-arrow-left-right"></i>
                      </span>
                      <DateSelector 
                        defaultValue={today("dateFormat")}  
                        onChange={(event) =>
                          handleFormFeilds(event, data.subName[1].id, data.type)
                        }/>
                    </Col>
                  )}
                  {/* The below two for reconciliation search */}
                  {data.type === "reconSelect" && (
                    <Col sm="9" className="d-flex align-items-center">
                      <Form.Select           
                        name={data.id}
                        required ={true}
                        value={reconSelectValue === null ? "" : reconSelectValue} // This condition is added to remove warning msg                   
                        onChange={(event) =>
                          handleFormFeilds(event, data.id, data.type)
                        }
                      >
                        <option                         
                          hidden                         
                          value={""}
                        >{`select ${data.name.toLowerCase()}`}</option>
                        {data?.value?.map((data,index) => (
                          <option value={data} key={index}>{data}</option>
                        ))}                       
                      </Form.Select>
                    </Col>
                  )}
                  {data.type === "reconDate" && (
                    <Col sm="9" className="d-flex align-items-center">
                      <DateSelector                      
                        defaultValue={(reconDate === null) ? today("dateFormat") : moment(reconDate).toDate()}
                        onChange={(event) =>
                          handleFormFeilds(event,data.id, data.type)
                        }
                      />                      
                    </Col>
                  )}
                </Form.Group>
              </Col>
            );
          })}
        </Row>
        {/*  </Row>
            )
          })}  */}
        <div className="text-center">
        <CustomButton type="submit" className="default">Search</CustomButton> 
        </div>
      </Form>
    </Fragment>
  );
};

export default React.memo(SearchForm);

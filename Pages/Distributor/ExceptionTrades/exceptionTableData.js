import { Whisper, Tooltip } from "rsuite";
import React, { useState, Fragment } from "react";
import { apiCall, modalActions,commonActions} from "../../../Redux/action";
import { useDispatch } from "react-redux";
import classes from "./exceptionTable.module.css";
import { exceptionTrade } from "../../../Service/apiVariable";
import { Modal } from "react-bootstrap";


const ExceptionTableData = (props) => {  
  
  const [showFullContent,setShowFullContent] = useState(false);
  const [showStatus,setShowStatus] = useState({show:false,status:null});
  const dispatch = useDispatch();
  const data = props.values;
  const tableData = props.tableData;
  const userRole = props.userRole;
  const updateContentVisibility = (expand) => {
    if(expand){
    setShowFullContent((prev)=>!prev);
    }
    else{
      setShowFullContent(false);
    }
  }; 
  const getAck = ()=>{
    const request = data?.fnReferenceId;
    dispatch(apiCall({...exceptionTrade.getAck,requestData:request}))
  } 
  const closeResponse = ()=>{
    dispatch(commonActions.setUpdating(false));  // to close the response message.  
    dispatch(commonActions.setResponse({message: null, status: null}));  // to close the response message.       
  }
  const openStatus = (swiftStatus)=>{
    closeResponse();
    setShowStatus({show:true,status:swiftStatus});
  }  
  const openEdit = async () => {
      await dispatch(apiCall({ ...exceptionTrade.getRecordById, requestData: data["fnReferenceId"] }));  // set await to set record before open edit window    
      closeResponse();
      dispatch(modalActions.setFormModal({ type: "edit", isOpen: true }));
    
  };
  const openStatusModal = async (msg) => {
     if (userRole === "Admin") {
      await dispatch(apiCall({ ...exceptionTrade.getRecordById, requestData: data["fnReferenceId"] })); //set await to set record before open conformation window
      closeResponse();
      dispatch(modalActions.openStatusModal(msg));
    } 
  };
  //only for distributor inbound
  return (
    <Fragment>
      <tr>
        {tableData.map((item, index) => {         
           if (item.type === "approval") {
            if (userRole === "Admin") {
              let content,approveMsg,rejectMsg;
              if ( data[item.id] === "ACK_RECEIVED" || data[item.id] === "RESPONSE_RECEIVED" ) { 
                approveMsg = (data[item.id] === "ACK_RECEIVED" ? "You want to approve the ACK" : "You want to approve the response");
                rejectMsg = (data[item.id] === "ACK_RECEIVED" ? "You want to reject the ACK" : "You want to reject the response")
                content = (
                  <Fragment>
                   <Whisper
                      placement="bottomStart"
                      controlid={`control-id-${index}${props?.index}-approve`}
                      trigger="hover"
                      speaker={<Tooltip>Approve</Tooltip>}
                    >
                  <span
                    onClick={() =>
                      openStatusModal(approveMsg)
                    }
                    className={`${classes.approveButton} ${classes.actionButton}`}
                  >
                    <i className="bi bi-hand-thumbs-up px-1" />
                  </span>
                  </Whisper>
                  <Whisper
                      placement="rightStart"
                      controlid={`control-id-${index}${props?.index}-reject`}
                      trigger="hover"
                      speaker={<Tooltip>Reject</Tooltip>}
                    >
                  <span
                    onClick={() =>
                      openStatusModal(rejectMsg)
                    }
                    className={`${classes.rejectButton} ${classes.actionButton} text-danger`}
                  >
                    <i className="bi bi-hand-thumbs-down px-1" />                                     
                  </span>
                  </Whisper>
                  </Fragment>
                );
              }else if (data[item.id] === "RESPONSE_PROCESSED") {               
                content = (
                  <span className="text-success">
                    Approved                  
                  </span>
                );
              }else if (data[item.id] === "REJECTED"){
                content = (
                  <span className="text-danger">
                    Rejected                  
                  </span>
                );
              }else {
                content = (
                    <>
                        <span className={`${classes.disableButton} ${classes.actionButton}`}>
                        <i className="bi bi-hand-thumbs-up px-1" />                       
                        </span>  
                        <span className={`${classes.disableButton} ${classes.actionButton}`}>
                        <i className="bi bi-hand-thumbs-down px-1" />                       
                        </span>                      
                    </>
                );                
              }
              return (
                <td key={index} className="text-center">
                  <span>{content}</span>
                </td>
              );
            } else {
              return null;
            }
          }          
          else if (item.type === "edit") {
            let content;
            if(data[item.id] === "NEW"){
              content = ( <span className={`${classes.actionButton} ${classes.approveButton} text-success px-1`} onClick={getAck}>
                              Swift Submit
                            <i className="bi bi-check2-circle ps-1"></i>                            
                           </span>
                           )
            }
            else if(data[item.id] === "SUBMITTED" || data[item.id] === "ACK_PROCESSED" || data[item.id] === "ACK_REJECTED" || data[item.id] === "RESPONSE_REJECTED" ){
              content = (<span className={`${classes.actionButton} ${classes.editButton} text-primary px-1`} onClick={openEdit}>
                        Edit
                        <i className="bi bi-pencil-square ps-1"></i>
                  </span>
                    
                  )
            } else{
              content = <span>{data[item.id]}</span>
            }       
            return (
              <td key={index} className="text-center" >
                <span>{content}</span> 
              </td>
            );
           /*  } */
          } 
          else if(item.type === "status"){
            return <td key={index} className="text-center">
              <span 
                onClick={()=>openStatus(data[item.id])}
                className={`${classes.actionIcon} text-primary `}               
              >
               View
              </span>
            </td>
          }
          else {
            return (
              <td
                key={index}
                className={`${(item.expand && showFullContent) ? classes.showFullContent : classes.showLessContent}
                 `}
                 onClick={()=>updateContentVisibility(item.expand)}
              >
                {data[item.id]}
              </td>
            );
          }
        })}
      </tr>
      {showStatus.show &&
      <StatusModal
        status={showStatus.status}
        onHide={()=>setShowStatus({show:false,status:null})}
      />
    }
    </Fragment>
  );
};

const StatusModal = (props)=>{  
  let status = props.status;
  let swiftSubmit = ["SUBMITTED","ACK_RECEIVED","ACK_PROCESSED","RESPONSE_RECEIVED","RESPONSE_PROCESSED","ACK_REJECTED","RESPONSE_REJECTED"];
  let ackSubmit = ["ACK_RECEIVED","ACK_PROCESSED","RESPONSE_RECEIVED","RESPONSE_PROCESSED","RESPONSE_REJECTED"];
  let ackProcessed = ["ACK_PROCESSED","RESPONSE_RECEIVED","RESPONSE_PROCESSED","RESPONSE_REJECTED"];
  let resSubmit = ["RESPONSE_RECEIVED","RESPONSE_PROCESSED"];  
  const  content = (<div className="d-flex justify-content-around">
        <div className={`${(swiftSubmit.some((data)=>(data === status))) ? classes.enabledStatus : classes.disableStatus}`}>
            <span className={classes.statusContent}>
              <i className={`${(swiftSubmit.some((data)=>(data === status))) ? "bi bi-check-circle-fill text-success" : "bi bi-exclamation-circle"} ${classes.statusIcon}`}></i>
              <span className="text-center">Swift Submitted</span>
            </span>
        </div>
        <div className={`${(ackSubmit.some((data)=>(data === status))) ? classes.enabledStatus : classes.disableStatus}`}>
          <span className={classes.statusContent}>
            <i className={`${(ackSubmit.some((data)=>(data === status))) ? "bi bi-check-circle-fill text-success" : "bi bi-exclamation-circle"} ${classes.statusIcon}`}></i>
            <span className="text-center">ACK Submitted</span>
          </span>
        </div>
        <div className={`${(ackProcessed.some((data)=>(data === status))) ? classes.enabledStatus : classes.disableStatus}`}>
          <span className={classes.statusContent}>
            <i className={`${(ackProcessed.some((data)=>(data === status))) ? "bi bi-check-circle-fill text-success" : "bi bi-exclamation-circle"} ${classes.statusIcon}`}></i>
            <span className="text-center">ACK Processed</span>
          </span>
        </div>
        <div className={`${(resSubmit.some((data)=>(data === status))) ? classes.enabledStatus : classes.disableStatus}`}>
          <span className={classes.statusContent}>
            <i className={`${(resSubmit.some((data)=>(data === status))) ? "bi bi-check-circle-fill text-success" : "bi bi-exclamation-circle"} ${classes.statusIcon}`}></i>
            <span className="text-center">Response Submitted</span>
          </span>
        </div>
        <div className={`${status === "RESPONSE_PROCESSED" ? classes.enabledStatus : classes.disableStatus}`}>
          <span className={classes.statusContent}>
            <i className={`${status === "RESPONSE_PROCESSED" ? "bi bi-check-circle-fill text-success" :  "bi bi-exclamation-circle"} ${classes.statusIcon}`}></i>
            <span className="text-center">Response Processed</span>
          </span>
        </div>
    </div>)  

  return <Modal
  centered
  show = {true}
  onHide={props.onHide}
  size="lg"
  className="border-0"
  > <Modal.Body className="py-4">
    {content}
    </Modal.Body>
  </Modal>
}

export default React.memo(ExceptionTableData);


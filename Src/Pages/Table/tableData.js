import { Whisper, Tooltip } from "rsuite";
import React, { useState, Fragment } from "react";
import {
  apiCall,
  modalActions,
  authActions,
  commonActions,
} from "../../Redux/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorModal } from "../../CommonFunctions/commonComponent";
import { getBaseUrl, getCookie } from "../../CommonFunctions/commonFunction";
import classes from "./table.module.css";
import axios from "axios";
import FdltModal from "../Distributor/inboundFdltDataTable";

const TableData = (props) => {
  const [showFdltModal, setShowFdltModal] = useState(false);
  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const dispatch = useDispatch();
  const data = props.values;
  const id = props.id;
  const api = props.updateApi;
  const tableData = props.tableData;
  const userRole = props.userRole;
  const getRecordById = props.updateApi.getRecordById;
  const openStatus = (errorText) => {
    setErrMsg(errorText);
    setShowErrModal(true);
  };
  const showFdltInfo = async (fileProcessId) => {
    await dispatch(apiCall({ ...api.getFdlt, requestData: fileProcessId }));
    setShowFdltModal(true);    
  };
  const downloadHandler = (link, name) => {
    let baseUrl = `${getBaseUrl()}/${link}`;
    axios({
      url: baseUrl, //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        Authorization: `Bearer ${getCookie("FN_AT")}`,
      },
    })
      .then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);
        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", name); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((e) => {
        let statusCode = e.response.status;
        if (statusCode === 401 || statusCode === 403) {
          dispatch(authActions.setUnAuthorized());
        } else {
          dispatch(
            commonActions.setResponse({
              message: "Unable to download file",
              status: "ERROR",
            })
          );
          dispatch(commonActions.setUpdating(true));
        }
      });
  };
  const openEdit = async () => {
    if (userRole === "Admin") {
      await dispatch(apiCall({ ...getRecordById, requestData: data[id] })); // set await to set record before open edit window
      dispatch(commonActions.setUpdating(false));  // to close the response message. 
      dispatch(commonActions.setResponse({message: null, status: null}));  // to close the response message. 
      dispatch(modalActions.setFormModal({ type: "edit", isOpen: true }));
    }
  };
  const openStatusModal = async (msg) => {
    if (userRole === "Admin") {
      await dispatch(modalActions.setRecordToModify({ data: data })); // set await to set record before open conformation window
      dispatch(commonActions.setUpdating(false));  // to close the response message. 
      dispatch(commonActions.setResponse({message: null, status: null})) ;// to close the response message.  
      dispatch(modalActions.openStatusModal(msg));
    }
  };
  //only for distributor inbound
  return (
    <Fragment>
      <tr>
        {tableData.map((item, index) => {
          if (item.type === "link") {
            return (
              <td key={index}>
                <span
                  className={`${
                    (data["status"] !== "NO_DATA" && data["status"] !== "APPROVED") ? classes.linkData : " "
                  }`}
                  onClick={() => {
                    (data["status"] !== "NO_DATA" && data["status"] !== "APPROVED") &&
                     downloadHandler(
                        `${item.link}${data[item.arg]}`,
                        data[item.id]
                      );
                  }}
                  download
                >
                  {data[item.id]}&nbsp;
                  {(data[item.id] !== null && data["status"] !== "NO_DATA" && data["status"] !== "APPROVED") && (
                    <i className="bi bi-download"></i>
                  )}
                </span>
              </td>
            );
          } else if (item.type === "stats") {
            return (
              <Fragment key={index}>
                {item.id.map((count, index) => (
                  <td className="text-center" key={index}>
                    {data[count]}
                  </td>
                ))}
              </Fragment>
            );
          } else if (item.type === "status") {
            return (
              <td key={index}>
                <span 
                  className={` ${
                    (data[item.id] === "FAILED" ||
                    data[item.id] === "NO_DATA" ||
                    data[item.id] === "REJECTED" ||
                    data[item.id] === "EXPORT_FAILED")
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {data[item.id]}&nbsp;
                  {data[item.arg] !== null && data[item.arg] !== undefined && (
                    <i
                      className={`${classes.actionIcon} bi bi-chat-text`}
                      onClick={() => openStatus(data[item.arg])}
                    ></i>
                  )}
                </span>
              </td>
            );
          } else if (item.type === "info") {
            return (
              <td key={index}>
                {data["fdltOrderFailedCount"] > 0 ? (
                  <span
                    className={classes.linkData}
                    onClick={() => showFdltInfo(data[item.arg])}
                  >
                    view
                  </span>
                ) : (
                  <span>Nil</span>
                )}
              </td>
            );
          } // This condition is only for upload feature  approal/reject
          else if (item.type === "approval") {
            if (userRole === "Admin") {
              let content;
              if (data[item.id] === "UPLOADED") {                
                content = (
                  <Fragment>
                   <Whisper
                      placement="rightStart"
                      controlid={`control-id-${index}${props?.index}-approve`}
                      trigger="hover"
                      speaker={<Tooltip>Approve</Tooltip>}
                    >
                  <span
                    onClick={() =>
                      openStatusModal("You want to Approve the file.")
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
                      openStatusModal("You want to Reject the file.")
                    }
                    className={`${classes.rejectButton} ${classes.actionButton} text-danger`}
                  >
                    <i className="bi bi-hand-thumbs-down px-1" />                                     
                  </span>
                  </Whisper>
                  </Fragment>
                );
              }else if (data[item.id] === "APPROVED") {               
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
                  {content !== null && <span>{content}</span>}
                </td>
              );
            } else {
              return null;
            }
          }
          //Newly added
          else if (item.type === "edit") {
            return (
              <td key={index} className="text-center">
                <div className="d-flex justify-content-evenly">
                  {id === "jobConfigId" && (
                    <Whisper
                      placement="rightStart"
                      controlid={`control-id-${index}${props?.index}-jobConfig`}
                      trigger="hover"
                      speaker={<Tooltip>Goto Job Field Map</Tooltip>}
                    >
                      <Link
                        to={`/administration/jobconfig/jobfieldmap/${data.jobConfigId}/H`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"                          
                          fill="currentColor"
                          className="bi bi-send-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                      </Link>
                    </Whisper>
                  )}
                  {data[item.id] === true ? (
                    <Whisper
                      placement="rightStart"
                      controlid={`control-id-${index}${props?.index}-active`}
                      trigger="hover"
                      speaker={<Tooltip>Active</Tooltip>}
                    >
                      <span onClick={() => openStatusModal()} className={`${userRole === "Admin" ? classes.actionIcon : " "} px-1`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="green"
                          className="bi bi-check-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </span>
                    </Whisper>
                  ) : (
                    <Whisper
                      placement="rightStart"
                      controlid={`control-id-${index}${props?.index}-inActive`}
                      trigger="hover"
                      speaker={<Tooltip>Inactive</Tooltip>}
                    >
                      <span
                        onClick={() => openStatusModal()}
                        /* className="px-1 d-inline-block" */
                        className={`${userRole === "Admin" ? classes.actionIcon : " "} px-1`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="red"
                          className="bi bi-exclamation-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </span>
                    </Whisper>
                  )}
                  {data[item.id] === true && userRole === "Admin" && (
                    <Whisper
                      placement="rightStart"
                      controlid={`control-id-${index}${props?.index}-edit`}
                      trigger="hover"
                      speaker={<Tooltip>Edit</Tooltip>}
                    >
                      <span onClick={openEdit} className={classes.actionIcon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="rgb(13 110 253)"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </span>
                    </Whisper>
                  )}
                </div>
              </td>
            );
          } // This condition is only for upload feature
          else if (item.type === "uploadStatus") { 
            let color, icon;
            if (data[item.id] === "UPLOADED") {
              color = "text-primary";
              icon = null;
            } else if (data[item.id] === "APPROVED") {
              color = "text-success";
              icon = null;
            } else if (data[item.id] === "REJECTED") {
              color = "text-danger";
              icon = null;
            } else {
              color = "text-danger";
              icon = (
                <i
                  className={`${classes.actionIcon} bi bi-chat-text ps-1`}
                  onClick={() => openStatus(data[item.arg])}
                ></i>
              );
            }
            return (
              <td key={index} className={color}>
                {data[item.id]}
                {icon}
              </td>
            );
          } else {
            return (
              <td
                key={index}
                className={`${
                  item.alignment === "center" ? "text-center" : ""
                } `}
              >
                 {data[item.id] === "t" || data[item.id] === "f"
                  ? data[item.id] === "t"
                    ? <span className="text-success">true</span>
                    : <span className="text-danger">false</span>
                  : data[item.id]
                  }
              </td>
            );
          }
        })}
      </tr>
      <ErrorModal
        message={errMsg}
        show={showErrModal}
        size="md"
        scrollable={true}
        onHide={() => setShowErrModal(false)}
        title="Error Message"
      />
      <FdltModal
        show={showFdltModal}
        scrollable={true}
        onHide={() => setShowFdltModal(false)}
      />
    </Fragment>
  );
};

export default React.memo(TableData);

import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useState } from "react";
import classes from "./fdltError.module.css";
import { ErrorModal } from "../../CommonFunctions/commonComponent";

const content = [
  { id: "fnReferenceId", type: "text" },
  { id: "fnStatus", type: "status" },
  { id: "dltErrorMessage", type: "errorText" },
  { id: "dltSentDate", type: "text" },
];
const FdltModal = (props) => {
  const fdltData = useSelector((state) => state.distributorData); //only for distributor inbound
  const data = fdltData.fdltData;
  const ErrMsg = ()=>{
    return <Table bordered striped className={classes.table}>
    <thead>
      <tr>
        <th>FN Ref ID</th>
        <th>FN Status</th>
        <th>FDLT Error</th>
        <th>Submitted Timestamp</th>
      </tr>
    </thead>
    <tbody>
      {data.map((data, index) => (
        <TableData data={data} key={index}></TableData>
      ))}
    </tbody>
  </Table>
  }
  return (
    <ErrorModal
    message={<ErrMsg></ErrMsg>}
    show={props.show}
    size="lg"
    scrollable={true}
    onHide={props.onHide}
    title={"FDLT Error Data"}
    totalError={data.length}
  />  
  );
};
export default FdltModal;

const TableData = (props) => {
  const [showFullError, setShowFullError] = useState(false);
  const updateErrorMsgVisibility = () => {
    setShowFullError((prev) => !prev);
  };
  const showData = (data) => {
    if (data === null) {
      return "Nil";
    } else {
      return data;
    }
  };
  const data = props.data;
  return (
    <tr>
      {content.map((item, index) => {
        if (item.type === "status") {
          return (
            <td
              key={index}
              className={`${
                (data[item.id] === "ERROR" || data[item.id] === "REJECTED") ? "text-danger" : "text-success"
              }`}
            >
              {data[item.id]}
            </td>
          );
        } else if (item.type === "errorText") {
          return (
            <td
              key={index}
              className={`${
                showFullError ? classes.errorTextFullContent : classes.errorText
              }`}
              onClick={updateErrorMsgVisibility}
            >
              {showData(data[item.id])}
            </td>
          );
        } else {
          return <td key={index}>{showData(data[item.id])}</td>;
        }
      })}
    </tr>
  );
};

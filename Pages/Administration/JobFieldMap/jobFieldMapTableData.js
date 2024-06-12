import { FormCheck } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useState, Fragment, forwardRef, useImperativeHandle } from "react";
import { useDispatch} from "react-redux";
import classes from "./jobFieldMap.module.css";
import { jobFieldMapActions } from "../../../Redux/action";
import { getUserRole } from "../../../CommonFunctions/commonFunction";

const FieldMapTableBody = forwardRef((props,ref) => {
  const dispatch = useDispatch();
  const userRole = getUserRole();
  const [select, setSelect] = useState({ isSelect: false, id: null });
  const [focus,setFocus] = useState(0); // For autofocusing newly added empty record.  
  const tableData = props.values;
  const tableHead = props.tableHead;
  const isNewRecord = typeof tableData.id === "string"; 
  // For autofocusing newly added empty record using forwardRef. 
  const triggerFocus = ()=>{
    setFocus(Math.random());
  }
  useImperativeHandle(ref, () => ({
    triggerFocus
  }));
  const selectRecord = (e, id) => {
    if (e.target.checked) {
      props.showWarning();      
      setSelect({ isSelect: true, id: id });
      dispatch(
        jobFieldMapActions.setSelectedRecords({ id: tableData.id, type: "add" })
      );
    } else {
      dispatch(
        jobFieldMapActions.setSelectedRecords({
          id: tableData.id,
          type: "remove",
        })
      );
      setSelect({ isSelect: false, id: id });
    }
  };
  const submitInput = (id, name, value, dataType) => {    
    let result = value.trim().length === 0 ? null : value.trim();
    if (dataType === "number") {
      result = value.length > 0 ? parseInt(value) : null;
    }
    dispatch(
      jobFieldMapActions.updateRecord({
        id: id,
        name: name,
        value: result,
        type: "update",
      })
    );
  };
  let bgColor;
  if (select.isSelect && select.id === tableData.id) {
    bgColor = "rgb(248 215 218)";
  } else if (isNewRecord) {
    bgColor = "rgb(144 238 144 / 15%)";
  } else {
    bgColor = "white";
  }
  return (
    <Fragment>
      {userRole !== "Admin" && (
        <tr key={tableData.id}>
          {tableHead.map((data, index) => (
            <td key={index}>{tableData[data.id]}</td>
          ))}
        </tr>
      )}
      {userRole === "Admin" && (
        <tr
          style={{
            backgroundColor: bgColor,
          }}
          key={tableData.id}
        >
          <td className={classes.td}>
            <FormCheck
              id = {props.index}
              onChange = {(e) => selectRecord(e, tableData.id)}
              key = {props.index}
            ></FormCheck>
          </td>
          {tableHead.map((data, index) => {
            return (
              <td key={index} className={classes.td}>
                {data.type === "text" && (
                  <Form.Control
                    id = {Math.random()}
                    disabled = {props.isDeleted}                    
                    autoFocus = {
                      (props.firstRecord && 
                      typeof(tableData.id) === "string" &&
                      tableData.specFieldName === null &&
                      data.id === "specFieldName")
                    }
                    style={{ width: data.width }}
                    size="sm"
                    defaultValue={tableData[data.id]}
                    /* key={tableData[data.id]} */
                    className={classes.input}
                    type={data.dataType}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    onBlur={(e) => {
                      submitInput(
                        tableData.id,
                        data.id,
                        e.target.value,
                        data.dataType
                      );
                    }}
                  ></Form.Control>
                )}
                {data.type === "select" && (
                  <Form.Select
                    size = "sm"
                    id = {Math.random()}
                    className = {classes.input}
                    /* disabled={props.isDeleted} */
                    style = {{ width: data.width }}
                    onChange = {(e) => {
                      e.target.blur();
                      submitInput(
                        tableData.id,
                        data.id,
                        e.target.value,
                        data.dataType
                      );
                    }}
                    value={
                      tableData[data.id] === null ? "" : tableData[data.id]
                    }
                  >
                    <option value={null} hidden>
                      {`select ${data.name.toLowerCase()}`}
                    </option>
                    {data.value.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </Form.Select>
                )}
              </td>
            );
          })}
        </tr>
      )}
    </Fragment>
  );
});

export default React.memo(FieldMapTableBody);

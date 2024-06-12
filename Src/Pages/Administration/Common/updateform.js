import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../Redux/action";
import { Title, DateSelector } from "../../../CommonFunctions/commonComponent";
import moment from "moment";
import { apiCall } from "../../../Redux/action";
import classes from "./updateForm.module.css";

const UpdateForm = (props) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modalData);
  const recordToEdit = modal.recordToModify;
  const isOpen = modal.formModalData.isOpen;
  const modalType = modal.formModalData.type;
  const formData = props.updateFormData;
  const updateFormLayout = props.updateFormLayout;
  const api = props.updateApi;
  const editParam = props.editParam;
  const [inputValue, setInputValue] = useState({});
 /*  const [isFormValid,setIsFormValid] = useState(true);// added for exceptional trade   */ 
  const handleFormFeilds = (event, id, type) => {    
    let data = { ...inputValue };
    if(type === "date"){
      data[id] = moment(event).format("YYYYMMDD") ;
    } 
    else{
      data[id] =
      (id === "zeroPadding")
        ? JSON.parse(event.target.value.toLowerCase())
        : event.target.value.trim();    }    
    setInputValue(data);
  };
/* //newly added to hide the warning message
  if(!isFormValid){
    let userEnteredValues = Object.values(inputValue);
    let inValidForm = userEnteredValues.some((value)=>{      
      if(typeof(value) === "boolean" || typeof(value) === "number"){
        // skiping the validation if the type is boolean or number
        return false;
       }else if(typeof(value) === "undefined" || typeof(value) === "object"){
        return true;
       }else{
        return (value.trim().length === 0) ;
       }      
      });
    if(!inValidForm) {
      setIsFormValid(true);
     };
  } */

  useEffect(() => {
    let stateValue = {};
    formData.forEach((data) => {
      for (let key1 in data) {
        if (key1 === "id") {
          let key = data[key1];
          if (modalType === "add") {
            return (stateValue = { ...stateValue, [key]: "" });
          } else {
            for (let key2 in recordToEdit) {
              if (key === key2) {
                return (stateValue = {
                  ...stateValue,
                  [key]: recordToEdit[key2],
                });
              }
            }
          }
        }
      }
    });
    setInputValue(stateValue);
  }, [modalType, recordToEdit, formData]); // need to check

  const submitForm = (e) => { 
    e.preventDefault();
   /* let userEnteredValues = Object.values(inputValue)    
    // Newly added for exceptionalTrade date check.
     let inValidForm = userEnteredValues.some((value)=>{      
      if(typeof(value) === "boolean" || typeof(value) === "number"){
        // skiping the validation if the type is boolean or number
        return false;
       }else if(typeof(value) === "undefined" || typeof(value) === "object"){
        return true;
       }else{
        return (value.trim().length === 0) ;
       }      
      }); */    
    if (modalType === "edit") {
        let addtionalParam;
        for (let key in editParam) {
          addtionalParam = {
            ...addtionalParam,
            [editParam[key]]: recordToEdit[editParam[key]],
          };
        }
       let requestData = { ...inputValue, ...addtionalParam };       
       dispatch(apiCall({ ...api.update, requestData: requestData }));
      } else {
       dispatch(apiCall({ ...api.update, requestData: inputValue }));
      }
      dispatch(modalActions.refreshModal());      
      //to refresh          
  };
  const getDefaultvalueForInput = (id) => {   
    if(recordToEdit !== undefined && recordToEdit !== null) {
      return recordToEdit[id];
    }else{
    return null;
    }
  };
  const sftpValidation = () => {
    dispatch(modalActions.openSftpModal());
    dispatch(
      apiCall({ ...api.sftpValidation, requestData: recordToEdit.jobConfigId })
    );
  };
  return (
    <Fragment>
      <Modal
        className={`${modal.sftpModalIsOpen ? classes.updateForm : ""}`}
        onHide={() => dispatch(modalActions.refreshModal())}
        show={isOpen}
        size={`${updateFormLayout === null ? "md" : "xl"} `}
        scrollable={true}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={classes.modalHeader}>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Edit Participant
          </Modal.Title> */}
          <Title
            title={`${modalType === "edit" ? "Edit " : "Add"} ${props.name}`}
          ></Title>
        </Modal.Header>
        <Modal.Body className={`${classes.modalBody}`}>
          <Form onSubmit={submitForm} id="updateForm">
            {updateFormLayout === null && (
              <div>
                {formData.map((data, index) => {
                  return (
                    <Form.Group
                      as={Row}
                      className="mb-1 px-3"
                      controlId={`formPlaintext${data.name}`}
                      key={index}
                    >
                      <Form.Label column sm="3">
                        {data.name}
                        {data.required && <span className="text-danger">&nbsp;*</span>}
                      </Form.Label>
                      {data.type === "select" && (
                        <Col sm="9">
                          <Form.Select
                            key={index}
                            size="sm"
                            name={data.id}
                            required={data.required}
                            onChange={(event) =>
                              handleFormFeilds(event, data.id)
                            }
                            defaultValue={
                              modalType === "edit"
                                ? getDefaultvalueForInput(data.id)
                                : null
                            }
                          >
                            <option
                              hidden
                              value={""}
                            >{`select ${data.name.toLowerCase()}`}</option>
                            {data.value.map((data, index) => (
                              <option value={data} key={index}>
                                {data}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      )}
                      {data.type === "radio" && (
                        <Col sm="9" className="d-flex align-items-end">
                          {data.value.map((item, index) => (
                            <Form.Check
                              id={`${data.name}_${item.id}`}
                              inline
                              key={index}
                              name={data.name}
                              label={item.label}
                              onChange={(event) =>
                                handleFormFeilds(event, data.id)
                              }
                              required={data.required}
                              type="radio"
                              value={item.value}
                              defaultChecked={
                                modalType === "edit"
                                  ? item.value ===
                                    getDefaultvalueForInput(data.id)
                                  : null
                              }
                              /* size="sm" */
                              /* defaultValue={modalData.type==="edit" ? getDefaultvalueForInput(data.id) : null} */
                            ></Form.Check>
                          ))}
                        </Col>
                      )}
                      {data.type === "text" && (
                        <Col sm="9">
                          <Form.Control
                            key={index}
                            name={data.id}
                            onChange={(event) =>
                              handleFormFeilds(event, data.id)
                            }
                            required={data.required}
                            type="text"
                            placeholder={`enter ${data.name.toLowerCase()}`}
                            size="sm"
                            defaultValue={
                              modalType === "edit"
                                ? getDefaultvalueForInput(data.id)
                                : null
                            }
                          ></Form.Control>
                        </Col>
                      )}
                    </Form.Group>
                  );
                })}
              </div>
            )}
            {updateFormLayout !== null && (
              <div>
                {updateFormLayout.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={classes.subTitle}>
                        <strong>{item.title}&nbsp;:</strong>
                      </div>
                      <Row className="">
                        {formData.map((data, index) => {
                          if (!(index <= item.end && index >= item.start)) {
                            return null; // need to check;
                          } else
                            return (
                              <Col lg={6} key={index}>
                                <Form.Group
                                  as={Row}
                                  className="mb-1 px-3"
                                  controlId={`formPlaintext${data.name}`}
                                >
                                  <Form.Label column sm="4">
                                    {data.name}
                                    {data.required && <span className="text-danger">&nbsp;*</span>}
                                  </Form.Label>
                                  {data.type === "select" && (
                                    <Col sm="8">
                                      <Form.Select
                                        key={index}
                                        size="sm"
                                        required={data.required}
                                        name={data.id}
                                        onChange={(event) =>
                                          handleFormFeilds(event, data.id)
                                        }
                                        defaultValue={
                                          modalType === "edit"
                                            ? getDefaultvalueForInput(data.id)
                                            : null
                                        }
                                      >
                                        <option
                                          hidden
                                          value={""}
                                        >{`select ${data.name.toLowerCase()}`}</option>
                                        {data.value.map((data, index) => {
                                          return (
                                            <option value={data} key={index}>
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Form.Select>
                                    </Col>
                                  )}
                                  {data.type === "map" && (
                                    <Col sm="8">
                                      <Form.Select
                                        size="sm"
                                        required={data.required}
                                        name={data.id}
                                        onChange={(event) =>
                                          handleFormFeilds(
                                            event,
                                            data.id,
                                            data.type
                                          )
                                        }
                                        defaultValue={
                                          modalType === "edit"
                                            ? getDefaultvalueForInput(data.id)
                                            : null
                                        }
                                      >
                                        <option
                                          hidden
                                          value={null}
                                        >{`select ${data.name.toLowerCase()}`}</option>
                                        {data.value.map((data, index) => {
                                          return (
                                            <option
                                              value={data.value}
                                              key={index}
                                            >
                                              {data.key}
                                            </option>
                                          );
                                        })}
                                      </Form.Select>
                                    </Col>
                                  )}
                                   {data.type === "radio" && (
                                    <Col sm="8" className="d-flex align-items-end">
                                      {data.value.map((item, index) => (
                                        <Form.Check
                                          id={`${data.name}_${item.id}`}
                                          inline
                                          key={index}
                                          name={data.name}
                                          label={item.label}
                                          onChange={(event) =>
                                            handleFormFeilds(event, data.id)
                                          }
                                          required={data.required}
                                          type="radio"
                                          value={item.value}
                                          defaultChecked={
                                            modalType === "edit"
                                              ? item.value ===
                                                getDefaultvalueForInput(data.id)
                                              : null
                                          }                             
                                        ></Form.Check>
                                      ))}
                                    </Col>
                                  )}
                                  {data.type === "date" && (
                                    <Col sm="8" className={classes.datePicker}> 
                                                                        
                                     <DateSelector                      
                                    /*  defaultValue={moment("20231207").toDate()} */
                                     onChange={(event) =>
                                       handleFormFeilds(event, data.id, data.type)
                                     }
                                   />                             
                                   </Col>
                                  )
                                  }
                                  {data.type === "text" && (
                                    <Col sm="8">
                                      <Form.Control
                                        key={index}
                                        name={data.id}
                                        onChange={(event) =>
                                          handleFormFeilds(event, data.id)
                                        }
                                        required={data.required}
                                        type="text"
                                        placeholder={`enter ${data.name.toLowerCase()}`}
                                        size="sm"
                                        defaultValue={
                                          modalType === "edit"
                                            ? getDefaultvalueForInput(data.id)
                                            : null
                                        }                                       
                                      ></Form.Control>
                                    </Col>
                                  )}
                                </Form.Group>
                              </Col>
                            );
                        })}
                      </Row>
                    </div>
                  );
                })}
              </div>
            )}
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Row className={classes.modalBottom} > 
            <Col>       
              {/*  {(!isFormValid && props.name === "Trade") && (
                  <span className={`${classes.warningText} text-danger`}>
                    <i className="bi bi-exclamation-circle px-1"></i>
                     Please fill all the fields
                  </span>
               )
               }  */}
               </Col>  
               <Col className="d-flex justify-content-end">
              {(updateFormLayout !== null && modalType === "edit" && props.name === "Job Configuration") && (
                <Button
                  size="sm"
                  className="mx-1"
                  variant="primary"
                  type="button"
                  onClick={sftpValidation}
                >
                  Validate
                </Button>
              )}
              <Button
                size="sm"
                variant="success"
                className="mx-1"
                type="submit"
                form="updateForm"
              >
                {`${modalType === "edit" ? "Save" : "Add"}`}
              </Button>
              <Button 
                size="sm"
                variant="danger"
                className="mx-1"
                type="button"
                onClick={() => {dispatch(modalActions.refreshModal());/* setIsFormValid(true) */}}
              >
                Cancel
              </Button>
              </Col>
            </Row>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default UpdateForm;

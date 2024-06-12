import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Fragment, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "rsuite";
import { Title } from "../../../CommonFunctions/commonComponent";
import moment from "moment";
import { apiCall, modalActions } from "../../../Redux/action";
import classes from "./exceptionTable.module.css";
import TradeCloseConformation from "./confirmation";

const ExceptionUpdateForm = (props) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modalData);
  const [showConformationModal, setShowConformationModal] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [showDltStatusWarning, setShowDltStausWarning] = useState(false);
  const recordToEdit = modal.recordToModify;
  const isOpen = modal.formModalData.isOpen;
  const modalType = modal.formModalData.type;
  const formData = props.updateFormData;
  const updateFormLayout = props.updateFormLayout;
  const api = props.updateApi;
  const dateType = useMemo(()=>["navDate", "settlementDate", "dltTaAcceptanceDate"],[]) ;
  const firstApprovalStatus = [
    { name: "ACKNOWLEDGED", value: "ACK" },
    { name: "CLOSED", value: "CLOSED" },
    { name: "REJECTED", value: "RJCTD" },
  ];
  const secondApprovalStatus = [
    { name: "CLOSED", value: "CLOSED" },
    { name: "REJECTED", value: "RJCTD" },
  ];
  const dltStatus =
    getDefaultvalueForInput("swiftStatus") === "ACK_PROCESSED"
      ? secondApprovalStatus
      : firstApprovalStatus;
  /*  const [isFormValid,setIsFormValid] = useState(true);// added for exceptional trade   */
  const handleFormFeilds = (event, id, type) => {
    let data = { ...inputValue };
    if (type === "date") {
      data[id] = moment(event).format("YYYYMMDD");
    } else {
      data[id] = event.target.value.trim();
    }
    //custom validation for dltStatus in edit form.
    if (type === "select") {
      setShowDltStausWarning(false);
    }
    setInputValue(data);
  };
  useEffect(() => {
    let stateValue = {};
    try {
      formData.forEach((data) => {
        for (let key1 in data) {
          if (key1 === "id") {
            let key = data[key1];
            for (let key2 in recordToEdit) {
              if (key === key2) {
                let isDateType = dateType.some((item) => item === key); // checking if any formData id(key) match with dateType
                let getDate = (date) => {
                  if (date === null) {
                    return null;
                  } else {
                    return moment(new Date(recordToEdit[key2])).format(
                      "YYYYMMDD"
                    );
                  }
                };
                let value = isDateType
                  ? getDate(recordToEdit[key2])
                  : recordToEdit[key2];
                return (stateValue = {
                  ...stateValue,
                  [key]: value,
                });
              }
            }
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
    setInputValue(stateValue);
  }, [recordToEdit, formData,dateType]);

  const openConformation = () => {
    try {
      if (
        (recordToEdit.swiftStatus === "ACK_PROCESSED" &&
          inputValue.dltStatus === "ACK") ||
        inputValue.dltStatus === null
      ) {
        setShowDltStausWarning(true);
      } else {
        setShowConformationModal(true);
      }
    } catch (e) {
      console.warn(e);
    }
  };
  const closeConformation = () => {
    setShowConformationModal(false);
  };
  const closeEditForm = () => {
    dispatch(modalActions.refreshModal());
    setShowDltStausWarning(false);
  };
  const submitForm = () => {
    /*  e.preventDefault(); */
    let requestData = { ...inputValue };
    setShowConformationModal(false);
    if (
      recordToEdit?.swiftStatus === "SUBMITTED" ||
      recordToEdit?.swiftStatus === "ACK_REJECTED"
    ) {
      dispatch(apiCall({ ...api.ackSubmit, requestData: requestData }));
    } else {
      dispatch(apiCall({ ...api.resSubmit, requestData: requestData }));
    }
    dispatch(modalActions.refreshModal());
    //to refresh
  };
  function getDefaultvalueForInput(id) {
    try {
      let getDate = (date) => {
        let result;
        if (date === null) {
          result = null;
        } else {
          result = new Date(date);
        }
        return result;
      };
      if (recordToEdit !== undefined && recordToEdit !== null) {
        let value = dateType.some((item) => item === id)
          ? getDate(recordToEdit[id])
          : recordToEdit[id];
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Fragment>
      <Modal
        className={`${showConformationModal ? classes.hideUpdateForm : ""}`}
        onHide={closeEditForm}
        show={isOpen}
        size={`${updateFormLayout === null ? "md" : "xl"} `}
        scrollable={true}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={classes.modalHeader}>
          <Title title={`Edit  ${props.name}`}></Title>
        </Modal.Header>
        <Modal.Body className={`${classes.modalBody}`}>
          <Form id="updateForm">
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
                                    {data.required && (
                                      <span className="text-danger">
                                        &nbsp;*
                                      </span>
                                    )}
                                  </Form.Label>
                                  {data.type === "select" && (
                                    <Col sm="8">
                                      <Form.Select
                                        key={index}
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
                                        defaultValue={getDefaultvalueForInput(
                                          data.id
                                        )}
                                      >
                                        <option
                                          hidden
                                          value={""}
                                        >{`select ${data.name.toLowerCase()}`}</option>
                                        {dltStatus.map((data, index) => {
                                          return (
                                            <option
                                              value={data.value}
                                              key={index}
                                            >
                                              {data.name}
                                            </option>
                                          );
                                        })}
                                      </Form.Select>
                                    </Col>
                                  )}
                                  {data.type === "date" && (
                                    <Col sm="8" className={classes.datePicker}>
                                      <DatePicker                                        
                                        className={classes.datePicker}
                                        cleanable={false}
                                        editable={false}
                                        id={Math.random()}
                                        format="dd MMM yyyy"
                                        placeholder="select Date"
                                        /* showMeridian */
                                        oneTap={true}
                                        placement="auto"
                                        defaultValue={getDefaultvalueForInput(
                                          data.id
                                        )}
                                        onChange={(event) =>
                                          handleFormFeilds(
                                            event,
                                            data.id,
                                            data.type
                                          )
                                        }
                                      />
                                    </Col>
                                  )}
                                  {data.type === "text" && (
                                    <Col sm="8">
                                      <Form.Control
                                        key={index}
                                        name={data.id}
                                        onChange={(event) =>
                                          handleFormFeilds(
                                            event,
                                            data.id,
                                            data.type
                                          )
                                        }
                                        required={data.required}
                                        type="text"
                                        placeholder={`${
                                          !data.readOnly
                                            ? "enter " + data.name.toLowerCase()
                                            : ""
                                        }`}
                                        size="sm"
                                        defaultValue={
                                          modalType === "edit"
                                            ? getDefaultvalueForInput(data.id)
                                            : null
                                        }
                                        readOnly={data.readOnly}
                                        style={{
                                          cursor: `${
                                            data.readOnly ? "not-allowed" : ""
                                          }`,
                                        }}
                                        /* disabled = {data.readOnly}  */
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
        <Modal.Footer className="flex-row-reverse justify-content-between">
          <div>
            <Button
              size="sm"
              variant="success"
              className="mx-1"
              type="button"
              onClick={openConformation}
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="mx-1"
              type="button"
              onClick={closeEditForm}
            >
              Cancel
            </Button>
          </div>
          {showDltStatusWarning && (
            <div className={classes.warningMsg} style={{ fontWeight: 500 }}>
              Please select Dlt Status
            </div>
          )}
        </Modal.Footer>
      </Modal>
      {showConformationModal && (
        <TradeCloseConformation
          close={closeConformation}
          data={inputValue}
          func={submitForm}
        ></TradeCloseConformation>
      )}
    </Fragment>
  );
};

export default ExceptionUpdateForm;

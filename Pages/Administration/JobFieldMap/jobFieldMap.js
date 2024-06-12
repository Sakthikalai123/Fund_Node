import { Col, Table, Row, Container, ButtonGroup, Button } from "react-bootstrap";
import _ from "lodash";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Whisper, Tooltip } from "rsuite";
import * as Card from "../../../CommonFunctions/commonComponent";
import { React, useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./jobFieldMap.module.css";
import { jobFieldMapActions } from "../../../Redux/action";
import { jobFieldMap } from "../../../Service/apiVariable";
import { apiCall } from "../../../Redux/action";
import { JobFieldMapAlertModal } from "./jobFieldMapAlertModal";
import { Title } from "../../../CommonFunctions/commonComponent";
import FieldMapTableBody from "./jobFieldMapTableData";
import useUnsavedChangesWarning from "../../../Hooks/useUnsavedChangesWarning";
import { getUserRole } from "../../../CommonFunctions/commonFunction";

const JobFieldMap = (props) => {
  useUnsavedChangesWarning();
  const navigate = useNavigate();
  const urlParam = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const userRole = getUserRole();
  const onMount = useRef(true);
  const childRef = useRef(true); // to trigger function in thechild component(forwardRef concept)
  const [showRecord, setShowRecord] = useState(false);
  const [showWarning, setShowWarning] = useState({ show: false, msg: null });
  const [pathName, setPathName] = useState(location.pathname);
  const commonData = useSelector((state) => state.commonData);
  const jobFieldMapData = useSelector((state) => state.jobFieldMapData);
  const data = jobFieldMapData.records;
  let discription;
  try {
    const jobConfigRecords = JSON.parse(localStorage.getItem("jobConfigData"));
    const discriptionIndex = jobConfigRecords.data.findIndex(
      (item) => item.jobConfigId == urlParam.id
    );

    discription = jobConfigRecords.data[discriptionIndex];
  } catch (e) {
    /* console.log("error") */
  }
  const tableHead = [
    /* {id:"id",name:"Id",type:"text"}, */
    /*  {id:"jobConfigId",name:"JobConfig Id",type:"text",dataType:"number"}, */
    /* {id:"section",name:"Section",type:"text",dataType:"string"}, */
    {
      id: "specFieldName",
      name: "Spec Field Name",
      type: "text",
      dataType: "string",
      width: "113px",
    },
    {
      id: "javaFieldName",
      name: "Java Field Name",
      type: "text",
      dataType: "string",
      width: "110px",
    },
    {
      id: "conditionType",
      name: "Cond. Type",
      type: "select",
      dataType: "string",
      width: "80px",
      value: jobFieldMapData.conditionTypeList,
    },
    {
      id: "maxLength",
      name: "Max Length",
      type: "text",
      dataType: "number",
      width: "82px",
    },
    {
      id: "stageLength",
      name: "Stage Length",
      type: "text",
      dataType: "number",
      width: "100px",
    },
    {
      id: "dataType",
      name: "Data Type",
      type: "select",
      dataType: "string",
      width: "130px",
      value: jobFieldMapData.dataTypeList,
    },
    {
      id: "dataFormat",
      name: "Data Format",
      type: "text",
      dataType: "string",
      width: "100px",
    },
    {
      id: "dataDecimals",
      name: "Data Decimals",
      type: "text",
      dataType: "number",
      width: "100px",
    },
    {
      id: "lovType",
      name: "Lov Type",
      type: "select",
      dataType: "string",
      width: "170px",
      value: jobFieldMapData.lovTypeList,
    },
    {
      id: "lovDomain",
      name: "Lov Domain",
      type: "select",
      dataType: "string",
      width: "170px",
      value: jobFieldMapData.lovDomainList,
    },
    {
      id: "customValidatorClass",
      name: "Custom Validator Class",
      type: "text",
      dataType: "string",
      width: "153px",
    },
  ];

  const initialApi = [
    { ...jobFieldMap.getConditioTypeList },
    { ...jobFieldMap.getDataTypeList },
    { ...jobFieldMap.getLovDomainList },
    { ...jobFieldMap.getLovTypeList },
  ];
  const addRow = () => {
    let values, isEmpty;
    if (data.length > 0) {
      values = Object.values(data[0]);
      /* console.log(values); */
      values.splice(0, 3);
      /* console.log(values); */
      isEmpty = values.every((data) => data === null || data.length === 0);
    }

    if (
      !isEmpty ||
      data.length ===
        0 /* || jobFieldMapData.deletedRecord.some((id)=>id==data[data.length-1].id) */
    ) {
      let newRecord = {
        id: "new" + Math.random(),
        jobConfigId: parseInt(urlParam.id),
        section: urlParam.section,
      };
      for (let data of tableHead) {
        for (let key in data) {
          if (key === "id") {
            let newKey = data[key];
            newRecord = { ...newRecord, [newKey]: null };
          }
        }
      }
      dispatch(jobFieldMapActions.setRecords([newRecord,...data]));
    }else {
      /* childRef.current.triggerFocus()  */// calling child component func using forwardRef
    }
  };
  const deleteRecords = async () => {
    if (jobFieldMapData.selectedRecords.length > 0) {
      dispatch(jobFieldMapActions.openAlertModal());
    } else {
      setShowWarning({ show: true, msg: "Please select a record to delete" });
    }
  };
  const saveChanges = async () => {
   /*  console.log(jobFieldMapData.recordsToUpdate); */
    if (jobFieldMapData.recordsToUpdate.length > 0) {
      const createRequest = jobFieldMapData.recordsToUpdate.map((data) => {
        let newData = data;
        if (typeof data.id === "string") {
          newData = _.omit(data, ["id"]);
        }
        return { ...newData };
      });
      await dispatch(
        apiCall({ ...jobFieldMap.create, requestData: createRequest })
      );
      dispatch(
        apiCall({
          ...jobFieldMap.getRecords,
          requestData: `${urlParam.id}/${urlParam.section}`,
        })
      );
      dispatch(jobFieldMapActions.refreshCrudRecord({ type: "update" }));
      dispatch(jobFieldMapActions.setIsDirty(false));
    } else {
      setShowWarning({ show: true, msg: "There is no new changes to update" });
    }
  };

  useEffect(() => {
    const getInitialData = async () => {
      await dispatch(
        apiCall({
          ...jobFieldMap.getRecords,
          requestData: `${urlParam.id}/${urlParam.section}`,
        })
      );
      initialApi.map(async (item) => await dispatch(apiCall({ ...item })));
      setShowRecord(true);
    };
    if (onMount.current) {
      onMount.current = false;
      getInitialData();
      return;
    }
    if (pathName !== location.pathname) {
      setPathName(location.pathname);
      dispatch(
        apiCall({
          ...jobFieldMap.getRecords,
          requestData: `${urlParam.id}/${urlParam.section}`,
        })
      );
    }
  }, [location]); // need to check

  return (
    <Container fluid={true}>
      <JobFieldMapAlertModal //warning modal for record deletion.
        jobConfigId={urlParam.id}
        section={urlParam.section}
      />
      <Card.ErrorModal
        show={showWarning.show}
        message={showWarning.msg}
        onHide={() => setShowWarning({ show: false, msg: null })}
        title="Warning"
        size="sm"
      />
      {commonData.isUpdating && (
        <Card.Response
          status={commonData.response.status}
          message={commonData.response.message}
        ></Card.Response>
      )}
      <Title title="Job Field Mapping"></Title>
      <Container fluid={true} className={classes.topLayout}>
        <Row>
          <Col className={classes.heading} xs={5} sm={3}>
            Group
          </Col>
          <Col className={classes.content}>{discription?.participantGroup}</Col>
        </Row>
        <Row>
          <Col className={classes.heading} xs={5} sm={3}>
            Short Name
          </Col>
          <Col className={classes.content}>
            {discription?.participantShortName}
          </Col>
        </Row>
        <Row>
          <Col className={classes.heading} xs={5} sm={3}>
            Config. Type
          </Col>
          <Col className={classes.content}>{discription?.jobConfigType}</Col>
        </Row>
        <Row>
          <Col className={classes.heading} xs={5} sm={3}>
            Bound Type
          </Col>
          <Col className={classes.content}>{discription?.boundType}</Col>
        </Row>
      </Container>
      <div className={classes.navigation}>
        <div>
          <Card.CustomButton
            variant="light"
            onClick={() => navigate("/administration/jobconfig")}
          >
            <i className="bi bi-arrow-left"></i>
            Back
          </Card.CustomButton>
        </div>
        <ButtonGroup aria-label="Basic example">
          <Card.CustomButton
            onClick={() =>
              navigate(`/administration/jobconfig/jobfieldmap/${urlParam.id}/H`)
            }
            variant={`${
              urlParam.section === "H" ? "primary" : "light"
            }`} /* className={`${urlParam.section==="H" ? classes.active :classes.inActive}`} */
          >
            Header
          </Card.CustomButton>
          <Card.CustomButton
            onClick={() =>
              navigate(`/administration/jobconfig/jobfieldmap/${urlParam.id}/F`)
            }
            variant={`${urlParam.section === "F" ? "primary" : "light"}`}
          >
            Footer
          </Card.CustomButton>
          <Card.CustomButton
            onClick={() =>
              navigate(`/administration/jobconfig/jobfieldmap/${urlParam.id}/D`)
            }
            variant={`${urlParam.section === "D" ? "primary" : "light"}`}
          >
            Data
          </Card.CustomButton>
        </ButtonGroup>
      </div>
      {!commonData.isError &&
        jobFieldMapData.records.length > 0 &&
        showRecord && (
          <div>
            {userRole === "Admin" && (
              <div className={classes.tableTop}>
                <Whisper
                  placement="bottom"
                  controlid="control-id-add" 
                  trigger="hover"                 
                  speaker={<Tooltip>Add Record</Tooltip>}
                >
                  <Button size="sm" variant="light" className={classes.crudButton} onClick={addRow}>
                    <i className="bi bi-plus-square-fill text-primary" ></i>
                  </Button>
                </Whisper>
                <Whisper
                  placement="bottom"
                  controlid="control-id-delete" 
                  trigger="hover"                 
                  speaker={<Tooltip>Delete Record</Tooltip>}
                >
                  <Button size="sm" variant="light" className={classes.crudButton} onClick={deleteRecords}>
                    <i className="bi bi-trash-fill text-danger" ></i>
                  </Button>
                </Whisper>
                <Whisper
                  placement="bottom"
                  controlid="control-id-save"
                  trigger="hover"                  
                  speaker={<Tooltip>Save changes</Tooltip>}
                >
                  <Button size="sm" variant="light" className={classes.crudButton} onClick={saveChanges}>
                    <i
                      className="bi bi-floppy2 text-success"
                      
                    ></i>
                  </Button>
                </Whisper>
              </div>
            )}
            {/*   {showWarning && (
              <div className={classes.alert}>
                <span className="p-1">No selection</span>
                <span onClick={() => setShowWarning(false)}>
                  <i className=" p-1m bi bi-x-square"></i>
                </span>
              </div>
            )} */}

            <Table
              responsive
              striped
              bordered
              size="sm"
              className={classes.table}
            >
              <thead>
                <tr>
                  {userRole === "Admin" && <td></td>}
                  {tableHead.map((data, index) => (
                    <th key={index}>
                      <div className="d-flex justify-content-between">
                        {data.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <FieldMapTableBody
                      ref={childRef}
                      key={index}
                      index={index}
                      values={item}
                      tableHead={tableHead}                     
                      firstRecord={index===0}                    
                      showWarning={() => setShowWarning(false)}
                    ></FieldMapTableBody>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      {/* {(!(commonData.isError)  && commonData.isLoading && (jobFieldMapData.records.length===0))  &&
        <div className="text-center"><span><Spinner animation="border" variant="primary" size="sm"/>  Loading</span></div>} */}
      {!commonData.isError &&
        jobFieldMapData.records.length === 0 &&
        !commonData.isLoading && (
          <div className="d-flex align-items-center flex-column">
            <Card.NoRecordFound></Card.NoRecordFound>
            {userRole === "Admin" && (
              <div
                onClick={addRow}
                className="text-primary"
                style={{ cursor: "pointer" }}
              >
                click here to add new record
              </div>
            )}
          </div>
        )}
       {commonData.isError && (
        <Card.ReloadMsg/>
      )}
    </Container>
  );
};
export default JobFieldMap;

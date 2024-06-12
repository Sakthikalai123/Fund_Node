import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { Whisper, Tooltip } from "rsuite";
import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as Card from "../../CommonFunctions/commonComponent";
import classes from "./upload.module.css";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../../Redux/action";
import { distributorInbound } from "../../Service/apiVariable";
import { distributorUpload } from "../../Service/apiVariable";

const Conformation = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const distributorData = useSelector((state) => state.distributorData);
  const userInfo = useSelector((state) => state.authData);
  const [distributor, setDistributor] = useState(null);
  const [comments, setComments] = useState(null);
  const onMount = useRef(true);
  const distributorList = distributorData.distributorInboundList;
  let totalFileSizeInBytes = 0;
  const user = userInfo?.userInfo?.FnUserDetails?.username;
  //To get total file size
  props.uploadedFiles.forEach(
    (file) => (totalFileSizeInBytes = totalFileSizeInBytes + file.size)
  );
  const reset = () => {   
    setComments(null);
    setDistributor(null);
  };
  useImperativeHandle(ref, () => ({ reset }));
  const getFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size >= 1024 && size < 1048063) {
      return `${Math.round(size / 1024)} KB`;
    } else {
      return `${(size / 1048576).toFixed(1)} MB`;
    }
  };
  let totalFileSize = getFileSize(totalFileSizeInBytes);
  const fileList = props.uploadedFiles.map((file, index) => {
    return { name: file.name, size: getFileSize(file.size) };
  });
  const uploadHandler = (e) => {    
    e.preventDefault();
    const formData = new FormData();
    if (distributor !== null && comments !== null) // addtional validation
     {
      props.uploadedFiles.forEach((file, index) => {
        formData.append("multipartFile", file);
      });
      formData.set("participantShortName", distributor);
      formData.set("makerComments", comments);
      formData.set("user", user);      
      dispatch(apiCall({...distributorUpload.upload,requestData:formData})) 
      props.resetFiles()  // toclose conformation modal and reset distributor,comments.
    }
  };
  useEffect(() => {
    if (onMount.current) {
      onMount.current = false;
      dispatch(apiCall({ ...distributorInbound.getDistributorInboundList }));
    }
  }, [dispatch]);
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header className={classes.modalHeader}>
        <Card.Title title="Files To Upload"></Card.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="uploadForm" onSubmit={uploadHandler}>
          <Form.Group as={Row} controlId="reason">
            <Form.Label column sm="3" className={classes.uploadLabel}>
              Reason For Upload
              <span className="text-danger">&nbsp;*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select 
                size="sm"
                name="comments" 
                required 
                onChange={(event) =>setComments(event.target.value)} >
                <option hidden value={""}>{`select Reason`}</option>
                <option>Test Reason 1</option>
                <option>Test Reason 2</option>                
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="distributor">
            <Form.Label column sm="3" className={classes.uploadLabel}>
              Distributor
              <span className="text-danger">&nbsp;*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                size="sm"
                name="distributor"
                required               
                onChange={(event) => setDistributor(event.target.value)}
              >
                <option hidden value={""}>{`select Distributor`}</option>

                {distributorList.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
        <div className={classes.fileList}>
          <div className={classes.uploadLabel}>Selected Files</div>
          <ul>
            {fileList.map((file, index) => (
              <li key={index} className={classes.fileInfo}>
                <Row>
                  <Col sm={8} lg={10}>
                    <span className="d-flex">
                      {
                        /* props.loading ? <Spinner animation="border" size="sm" variant="secondary" /> : */ <i className="bi bi-paperclip px-1 text-primary"></i>
                      }
                      {file.name}
                    </span>
                  </Col>
                  <Col sm={4} lg={2}>
                    <div className={classes.fileSizeContainer}>
                      <span className="px-3">{file.size}</span>
                      <Whisper
                        placement="rightStart"
                        controlid="control-id-active"
                        trigger="hover"
                        speaker={<Tooltip>Remove</Tooltip>}
                      >
                        <span onClick={() => props.onChange(file.name)}>
                          <i
                            className={`bi bi-x-lg ${classes.removeButton}`}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </span>
                      </Whisper>
                    </div>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer className={classes.modalFooter}>
        <div className="d-flex align-items-center">
          <span>{`Total Files : ${props.totalFile} / Total Size : ${totalFileSize} `}</span>        
        </div>

        <div>
          <Button
            /* disabled={props.disableButton} */ type="submit"
            form="uploadForm"
            variant="primary"
            size="sm"
            className="me-1"
          >
            Upload
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="ms-1"
            onClick={props.cancel}
          >
            Cancel
          </Button>
        </div>
        {/*  <Card.CustomButton onClick={props.onHide} className="default">Cancel</Card.CustomButton>  */}
      </Modal.Footer>
    </Modal>
  );
});

export default Conformation;

import { useState, useRef,useEffect } from "react";
import { Container} from "react-bootstrap";
import * as Card from "../../CommonFunctions/commonComponent";
import classes from "./upload.module.css";
import { useDispatch, useSelector } from "react-redux";
import { apiCall, commonActions, modalActions } from "../../Redux/action";
import MainTable from "../Table/table";
import { distributorUpload } from "../../Service/apiVariable";
import Conformation from "./uploadConformation";

const sortData = { sortColumn: null, sortOrder: null };
const availableSortColumn = ["uploadedBy","uploadedDate","approvedBy","approvedDate","status"];
const tableData = [ 
  { name: "Approve / Reject", id: "status", type: "approval",width:"80px"},
  { name: "File ID", id: "fileID", type: "text" },
  { name: "File Name", id: "fileName", type: "link",arg:"fileID",link:"ui/distributor/file/download/" },
  { name: "Status", id:"status",type:"uploadStatus", arg:"errorText"},
  { name: "Uploaded By", id: "uploadedBy", type: "text" },
  { name: "Uploaded Date", id: "uploadedDate", type: "text" },  
  { name: "Approved/Rejected By", id: "approvedBy", type: "text" },
  { name: "Approved Date", id: "approvedDate", type: "text" },
  { name: "Reason for Upload", id: "makerComments", type: "text" },
  
]
const updateApi = {...distributorUpload}
const Upload = () => {
  const commonData = useSelector((state) => state.commonData);
  const userInfo = useSelector(state=>state.authData);
  const modalData = useSelector((state) => state.modalData);
  const dispatch = useDispatch();
  const onMount = useRef(true);
  const inputRef = useRef();
  const childRef = useRef(true);
  const [uploadedFiles, setUploadedFiles] = useState([]); 
  const [show, setShow] = useState(false);
 /*  const [loading,setLoading] = useState(false); *///used to update update spinner in uploadConformation component while upload
  /* const [disableButton,setDisableButton] = useState(false); */
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const user = userInfo?.userInfo?.FnUserDetails?.username
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {    // Filter only CSV files
    /* setDisableButton(false); */
    const csvFiles = Array.from(files).filter((file) =>{
      if(file.name.toLowerCase().endsWith(".csv") || file.name.toLowerCase().endsWith(".dsv")){
        return files
      }else return null;
    }      
    );    
    if (csvFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...csvFiles]);
      setShow(true);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };  

  const resetFiles = () => {
    //cancel button will trigger this action
    inputRef.current.value = null ;
    setShow(false);
    setUploadedFiles([]);
    childRef.current.reset();
  };
  const updateSelectedFiles = (props) => {
    const selectedFiles = uploadedFiles;
    const index = selectedFiles.findIndex((file) => file.name === props);
    selectedFiles.splice(index, 1);
    setUploadedFiles([...selectedFiles]);
    if (selectedFiles.length === 0) {
      resetFiles();
      /* setDistributor(null) */
    }
  };
  const fileDecisionHandler = ()=>{
    const request = {
      fileId:modalData?.recordToModify?.fileID,
      user:user
   }
    if(modalData.modalMsg === "You want to Approve the file."){
      dispatch(apiCall({...distributorUpload.approve,requestData:request}))
    }else{
      dispatch(apiCall({...distributorUpload.reject,requestData:request}))
    }
    closeModal();
  }
  const closeModal = () => {
    dispatch(modalActions.closeStatusModal());
  };
  useEffect(() => {
    if (onMount.current) {
      dispatch(commonActions.refresh()); // remove previous search data
      dispatch(commonActions.setGetRequestData());
      dispatch(apiCall({ ...updateApi.search }));
      onMount.current = false;
      return;
    } 
  }, [dispatch]);
  return (
    <Container fluid>
       <Conformation
        ref={childRef}
        show={show}
        uploadedFiles={uploadedFiles}
        /* upload={handleUpload} */
        cancel={resetFiles}
        onChange={updateSelectedFiles}
        resetFiles={resetFiles}      
        totalFile={uploadedFiles.length}
      ></Conformation> 
       {commonData.isUpdating && (
        <Card.Response
          status={commonData.response.status}
          message={commonData.response.message}
        ></Card.Response>
      )}
      <Card.WarningModal
      isOpen={modalData.statusModalIsOpen}
      proceed={fileDecisionHandler}
      cancel={closeModal}
      message={modalData.modalMsg}
    ></Card.WarningModal>
      <Card.Layout>
        <Card.Header>
          <div
            className={classes.dropzone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div>
              <i className="bi bi-cloud-upload-fill fs-1" style={{color:"rgb(191 201 235)"}}></i>
            </div>
            <div>Drop files here to upload </div>
            <div>or</div>
            <div>
              <input
                type="file"
                id="fileInput"
                multiple
                accept=".csv,.dsv"
                ref={inputRef}
                onChange={(e) =>{ handleFiles(e.target.files)}}
                style={{ display: "none" }}
              />
              <Card.CustomButton className="default" style={{padding:0}}>
                <label htmlFor="fileInput" className="text-primary p-1">
                  Select Files To Upload
                </label>
              </Card.CustomButton>
            </div>
            <span className={classes.fileType}>Supported file format (.csv and .dsv)</span>
          </div>         
        </Card.Header>
        <Card.ActionBar/>        
          <Card.Body>
          <MainTable
               tableData={tableData}
              updateApi={updateApi}
              sortData={sortData}
              availableSortColumn={availableSortColumn} 
            ></MainTable>
          </Card.Body>
        <Card.Footer>
            <Card.Page
              totalRecords={totalRecords}
              recordsPerPage={recordsPerPage}
              pageNo={pageNo}
              updateApi={updateApi}
            />
          </Card.Footer>
      </Card.Layout>
    </Container>
  );
};

export default Upload;



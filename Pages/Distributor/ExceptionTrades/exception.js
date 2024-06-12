import { Fragment,useRef,useEffect } from "react";
import { Container } from "react-bootstrap";
import MainTable from "../ExceptionTrades/exceptionTable";
import * as Card from "../../../CommonFunctions/commonComponent";
import { useSelector,useDispatch } from "react-redux";
import { exceptionTrade } from "../../../Service/apiVariable";
import { apiCall } from "../../../Redux/action";
import { commonActions, modalActions } from "../../../Redux/action";
import ExceptionUpdateForm from "./exceptionUpdateForm";
import ApprovalConformation from "./approvalConformation";


const Exception = () => {  
  const modalData = useSelector((state) => state.modalData);
  const commonData = useSelector((state) => state.commonData);
  const dispatch = useDispatch();
  const onMount = useRef(true);    
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const sortData = { sortColumn: null, sortOrder: null };
  const availableSortColumn = [];
  const updateFormLayout = [
    { title: "Non-Editable", fields: 4, start: 0, end: 3 },
    { title: "Editable", fields: 11, start: 4, end: 14 },
    
  ]; 
   const tableData = [   
    
    { id: "swiftStatus", name: "Action", type: "edit", expand:false, width:"50px" },
    { id: "swiftStatus", name: "Approve / Reject", type: "approval", expand:false, width:"80px" },
    { id: "swiftStatus", name: "Status", type: "status", expand:false, width:"50px" },    
    { id: "fnReferenceId", name: "FN Reference Id", type: "text", expand:false },
    { id: "dataId", name: "Data Id", type: "text", expand:false },    
    { id: "swiftStatus", name: "Swift Status", type: "text", expand:false }, 
    { id: "dltStatus", name: "Dlt Status", type: "select",expand:false },   
    { id: "isinCode", name: "ISIN", type: "text", },
    { id: "fundName", name: "Fund Name", type: "text",expand:true },
    { id: "transactionType", name: "Order Type", type: "text",expand:false },    
    { id: "taReferenceId", name: "Order Id", type: "text",expand:false },
    { id: "units", name: "Order Units", type: "text",expand:false },
    { id: "navDate", name: "Trade Date (Nav Date)", type: "date", expand:false },
    { id: "settlementDate", name: "Settlement Date", type: "date", expand:false },
    { id: "dltTaAcceptanceDate", name: "TA Acceptance Date", type: "date",expand:false },
    { id: "orderAmount", name: "Order Value", type: "text", expand:false},
    { id: "price", name: "Dealt Price", type: "text",expand:false },  
    { id: "dltMasterRef", name: "Dlt MasterRef", type: "text",expand:false },
    { id: "dltErrorMessage", name: "Error Message", type: "text",expand:true },   
   
  ];
  const updateFormData = [
    
    { id: "fnReferenceId", name: "FN Reference Id", type: "text",readOnly:true, required:false },
    { id: "isinCode", name: "ISIN", type: "text",readOnly:true, required:false },
    { id: "fundName", name: "Fund Name", type: "text",readOnly:true, required:false },
    { id: "transactionType", name: "Order Type", type: "text",readOnly:true, required:false },
    { id: "dltStatus", name: "Dlt Status", type: "select", required:true }, 
    { id: "taReferenceId", name: "Order Id", type: "text",readOnly:false, required:false },
    { id: "units", name: "Order Units", type: "text",readOnly:false, required:false },
    { id: "navDate", name: "Trade Date (Nav Date)", type: "date", required:false },
    { id: "settlementDate", name: "Settlement Date", type: "date", required:false },
    { id: "dltTaAcceptanceDate", name: "TA Acceptance Date", type: "date", required:false },
    { id: "orderAmount", name: "Order Value", type: "text",readOnly:false, required:false },
    { id: "price", name: "Dealt Price", type: "text",readOnly:false, required:false },  
    { id: "dltMasterRef", name: "Dlt MasterRef", type: "text",readOnly:false, required:false },
    { id: "dltErrorMessage", name: "Error Message", type: "text",readOnly:false, required:false },  

  ] 

  const updateApi = { ...exceptionTrade };
  const tradeApprovalHandler = ()=>{
    const tradeDetails = modalData?.recordToModify;
    const request = tradeDetails?.fnReferenceId; 
    
    if(tradeDetails?.swiftStatus === "ACK_RECEIVED" && modalData.modalMsg === "You want to approve the ACK"){
      dispatch(apiCall({...exceptionTrade.ackApprove,requestData:request}));      
    }
    else if(tradeDetails?.swiftStatus === "RESPONSE_RECEIVED" && modalData.modalMsg === "You want to approve the response"){
      dispatch(apiCall({...exceptionTrade.resApprove,requestData:request}));
    }
    else if(tradeDetails?.swiftStatus === "ACK_RECEIVED" && modalData.modalMsg === "You want to reject the ACK"){
      dispatch(apiCall({...exceptionTrade.ackReject,requestData:request}));
    }
    else{
      dispatch(apiCall({...exceptionTrade.resReject,requestData:request}));
    }
    closeModal();
  }
  const closeModal = () => {
    dispatch(modalActions.closeStatusModal());
  };
  useEffect(()=>{
    if(onMount.current){
      onMount.current = false;
      dispatch(commonActions.refresh())
      dispatch(commonActions.setPageNumber(1));
      dispatch(commonActions.setPageSize(20))
      dispatch(commonActions.setGetRequestData()); 
      dispatch(apiCall({...exceptionTrade.search}))
    }   
  },[dispatch])

  return (
    <Fragment>
      <Container fluid>
         {commonData.isUpdating && (
        <Card.Response
          status={commonData.response.status}
          message={commonData.response.message}
        ></Card.Response>
      )}
      {modalData.statusModalIsOpen &&
         <ApprovalConformation        
         proceed={tradeApprovalHandler} 
         cancel={closeModal}
         message={modalData.modalMsg}
      />
      }     
        <Card.Layout>
         <Card.Title title={"Exceptional Trades"}></Card.Title>
          <div>
            <MainTable
              tableData={tableData}
              updateApi={updateApi}
              sortData={sortData}
              availableSortColumn={availableSortColumn}             
            ></MainTable>
          </div>
          <Card.Footer>
            <Card.Page
              totalRecords={totalRecords}
              recordsPerPage={recordsPerPage}
              pageNo={pageNo}
              updateApi={updateApi}
              name="Exception Trade"
            />
          </Card.Footer>
        </Card.Layout>
      </Container>
      <ExceptionUpdateForm
              name="Trade"
              updateFormData={updateFormData}
              updateApi={updateApi}
              updateFormLayout={updateFormLayout} 
            ></ExceptionUpdateForm>
    </Fragment>
  );
};
export default Exception;

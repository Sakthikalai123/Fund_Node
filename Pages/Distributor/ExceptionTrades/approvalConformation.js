import { Modal,Button,Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux";
import moment from "moment";


const ApprovalConformation = (props)=>{
    const modalData = useSelector((state) => state.modalData);
    const tradeDetails = (modalData.recordToModify !== null ? modalData.recordToModify : []);   
    const dateType = ["navDate","settlementDate","dltTaAcceptanceDate"] ;
    const conformationFields = [
      {id:"fnReferenceId", name:"FN Reference Id"},
      {id:"isinCode", name:"ISIN"},
      {id:"fundName", name:"Fund Name"},
      {id:"transactionType", name:"Order Type"},
      {id:"dltStatus", name:"Dlt Status"},
      {id:"taReferenceId", name:"Order Id"},
      {id:"units", name:"Order Units"},
      {id:"navDate", name:"Trade Date (Nav Date)"},
      {id:"settlementDate", name:"Settlement Date"},
      {id:"dltTaAcceptanceDate", name:"TA Acceptance Date"},
      {id:"orderAmount", name:"Order Value"},
      {id:"price", name:"Dealt Price"},
      {id:"dltMasterRef", name:"Dlt MasterRef"},
      {id:"dltErrorMessage", name:"Error Message"},                              
    ] ;
    return   <Modal
    scrollable
    size="lg"
    show
    backdrop="static"
    onHide={props.close}
    centered
  >
    <Modal.Header id="contained-modal-title-vcenter" className="d-flex justify-content-center border-0" style={{ backgroundColor: "rgba(255 0 0 / 7%)"}}>
    <div className="d-flex flex-column">
     <h5 className="text-danger d-flex flex-column align-items-center">
            <i className="bi bi-exclamation-triangle m-auto h3"></i>
            <span>Are you sure ?</span>
    </h5> 
    <span >{props.message} with the details below.</span>
    </div>
    
    </Modal.Header>
    <Modal.Body>
      {conformationFields.map((data,index)=>{
        let isDate = dateType.some((item)=>(data.id===item)) ;
        let userEnteredValue = tradeDetails[data.id];        
        let result;
        let getDate = (date)=>{ 
         try{          
          if(date === null){
            result = null;
          } else {
            result = moment(new Date(date)).format('DD-MMM-YYYY');            
          }}
          catch(e){
            /* console.log(e); */
          }
          return result;           
        }
        let valuesToDisplay = (isDate ? getDate(userEnteredValue): userEnteredValue);
          return(
              <Row key={index} className="pb-1">
                  <Col style={{fontWeight:"600",color:"gray"}} className="d-flex justify-content-between">
                    <span>
                      {`${index+1} ) `}{data.name}
                    </span>
                    <span>:</span>
                  </Col>
                  <Col>                 
                  <span>{valuesToDisplay}</span>
                  </Col>
              </Row>
          )
              
      })}     
      </Modal.Body>
      <Modal.Footer>
          <Button size="sm" variant="danger" onClick={props.proceed}>
              Yes
          </Button>
          <Button size="sm" variant="light" onClick={props.cancel}>
              No
          </Button>
      </Modal.Footer>
  </Modal>
}

export default ApprovalConformation
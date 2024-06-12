import { Modal,Row,Col,Button } from "react-bootstrap";
import React from "react";
import moment from "moment";
import { Title } from "../../../CommonFunctions/commonComponent";

const TradeCloseConformation = (props) => {
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
                            ];
 const inputValues = props.data;

   return (
    <Modal
      scrollable
      size="lg"
      show
      backdrop="static"
      onHide={props.close}
      centered
    >
      <Modal.Header closeButton id="contained-modal-title-vcenter" style={{backgroundColor:"rgb(191 201 235 / 62%)"}}>
        <Title title="Confirmation !"></Title>
      </Modal.Header>
      <Modal.Body>
        {conformationFields.map((data,index)=>{
          let isDate = dateType.some((item)=>data.id===item) ;
          let userEnteredValue = inputValues[data.id];
          let result;
          let getDate = (date)=>{           
            if(date === null){
              result = null;
            } else {
              result = moment(date).format('DD-MMM-YYYY');            
            }
            return result;           
          } 
          let valuesToDisplay = (isDate ? getDate(userEnteredValue): userEnteredValue);
            return(
                <Row key={index} className="pb-1">
                   {/*  <Col style={{fontWeight:"600",color:"gray"}}>
                    {`${index+1} ) `}
                    {keyToDisplay}
                    </Col> */}
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
        {/* <div className="pt-2">Check the above details and Proceed if all the details are correct</div> */}
        </Modal.Body>
        <Modal.Footer>
            <Button size="sm" variant="success" onClick={()=>props.func()}>
                Submit
            </Button>
            <Button size="sm" variant="danger" onClick={props.close}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
  );
};
export default TradeCloseConformation;

import {Fragment} from "react"
import { ButtonGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCustomLocation } from "../../../CommonFunctions/commonFunction";
import * as Card from "../../../CommonFunctions/commonComponent";

const border = "1px outset rgba(0, 0, 0, .12)";
export const MainMenu = () => {
  const navigate = useNavigate();
  const { pathname} = useCustomLocation();
  let pageName;
  const changePage = (name) => {   
    if((name === "ab-process" && pathname.includes("ab-process")) || (name === "db-process" && pathname.includes("db-process"))){
      navigate(pathname);
    }
    else if(name === "ab-process"){
      navigate("/home/reconciliation/ab-process");
    }
    else{
      navigate("/home/reconciliation/db-process");
    }
       
  };
  if (pathname.includes("ab-process")) {
    pageName = "ab-process";
  } else {
    pageName = "db-process";
  }
  return (<Fragment>  
    <div className='my-1'>
               <ButtonGroup >
                 <span style={{cursor:"not-allowed"}}> {/* need to remove once this button enabled */}       
                 <Card.CustomButton                   
                   variant="light" 
                  /*  style = {{border:border}}   */
                   disabled={true}
                   style={{pointerEvents:"none",border:border}}
                   /* onClick = {()=>changePage('/home/reconciliation/db-process')} */
                   className={`${
                     pageName === "db-process" ? "text-light bg-secondary" : ""
                   }`}                  
                 >
                   Distributor
                 </Card.CustomButton>
                 </span>
                 <Card.CustomButton
                   variant="light"
                   style = {{border:border }}
                   onClick={()=>changePage("ab-process")}
                   className={`${
                     pageName === "ab-process" ? "text-light bgColor_1" : ""
                   }`}                  
                 >
                   Agent Bank
                 </Card.CustomButton> 
               </ButtonGroup>              
             </div>
 </Fragment>
  );
};

export const SubMenu = () =>{
  const { pathname, baseComponentUrl } = useCustomLocation();
  const navigate = useNavigate();
  let pageName;
  const changePage = (pageName) => {
    navigate(`${baseComponentUrl}/${pageName}`);
  };
  if (pathname.includes("orders")) {
    pageName = "orders";
  } 
  else if (pathname.includes("amount")) {
    pageName = "amount";
  }
  else if (pathname.includes("investor")) {
    pageName = "investor";
  }
  else if (pathname.includes("fundingapproval")) {
    pageName = "fundingapproval";
  }
  else if (pathname.includes("report")) {
    pageName = "report";
  }
  else {
    pageName = "validation";
  }

  return (<>  
    <ButtonGroup>
    <Card.CustomButton
      variant={`${
        pageName === "orders" ? "info" : "light"
        }`}
      style = {{border:border}}
      onClick={() => changePage("orders")}
      className={`${
        pageName === "orders" ? "text-light" : ""
      }`}
    >
      Order
    </Card.CustomButton>
    <Card.CustomButton
      variant={`${
        pageName === "amount" ? "info" : "light"
        }`}
      style = {{border:border}}
      onClick={() => changePage("amount")}
      className={`${
        pageName === "amount" ? "text-light" : ""
      }`}     
    >
      Order Amount
    </Card.CustomButton>
    <Card.CustomButton
      variant={`${
        pageName === "investor" ? "info" : "light"
      }`}     
      style = {{border:border}}
      onClick={() => changePage("investor")}  
      className={`${
        pageName === "investor" ? "text-light" : ""
      }`}    
    >
      Investor
    </Card.CustomButton>
    <Card.CustomButton
      variant={`${
        pageName === "fundingapproval" ? "info" : "light"
      }`}      
      style = {{border:border}}
      onClick={() => changePage("fundingapproval")}
      className={`${
        pageName === "fundingapproval" ? "text-light" : ""
      }`}     
    >
      Funding
    </Card.CustomButton>
    <Card.CustomButton
      variant={`${
      pageName === "report" ? "info" : "light"
       }`}
      style = {{border:border}}
      onClick={() => changePage("report")}
      className={`${
        pageName === "report" ? "text-light" : ""
      }`}     
    >
      Report
    </Card.CustomButton>
    <Card.CustomButton
      variant={`${
      pageName === "validation" ? "info" : "light"
      }`}
      style = {{border:border}}
      onClick={() => changePage("validation")}
      className={`${
        pageName === "validation" ? "text-light" : ""
      }`}     
    >
      Validation
    </Card.CustomButton>
  </ButtonGroup>
  </>  
  )
}


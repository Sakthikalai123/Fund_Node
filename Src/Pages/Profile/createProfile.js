import { Form, Modal, Row, Col, Button } from "react-bootstrap";
import React,{ Fragment, useEffect, useState } from "react";
import classes from "./newProfile.module.css";
import { Title } from "../../CommonFunctions/commonComponent";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../../Redux/action";
import { profile } from "../../Service/apiVariable";

const userInfo = [
  { key: "firstname", value: "First Name", type: "text" },
  { key: "lastname", value: "Last Name", type: "text" },
  { key: "emailId", value: "EmailId", type: "email" }, 
  { key: "username", value: "UserName", type: "text" },
  { key: "password", value: "Password", type: "password" },
  { key: "role", value: "Role", type: "select" }
];
let roleList = [];
const CreateProfile = (props) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileData); 
  const availableRoles = profileData.roleList;
  const [isValidated, setIsValidated] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [passwordIsValid,setPasswordIsValid] = useState(null); 
  const [requestData, setRequestData] = useState(null);  
  let pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let color ;
  if(passwordIsValid){
    color = "green"
  }else if(!passwordIsValid && isValidated){
    color = "rgb(220,53,69)"
  }else{
    color = "gray"
  }
 /*  console.log(color) */
  const handleFormFeilds = (event, key, data) => {   
    let value = event.target.value;   
    if (key === "password") {
      (value.length >= 8) && setPasswordIsValid(true);
      (value.length < 8 && isValidated)
         &&
        setPasswordIsValid(false)
    }
    else if(key === "select"){     
      if(event.target.checked){
       /*  console.log("checked"); */
        roleList = roleList.concat({roleId:data.value,roleName:data.key});
      }else{
       let index = roleList.findIndex((item)=>item.roleId===data.value);
       (index !== -1) && roleList.splice(index,1) ;
      }       
      return   setRequestData((prev)=>{
        return {...prev,roleList}
      })
    }    
    setRequestData((prev) => {
      return { ...prev, [key]: value };
    });    
  }; 
  const handleSubmit = (event) => {   
    event.preventDefault();
    dispatch(apiCall({...profile.create,requestData}))
  /*  console.log(requestData) */
    props.closeModal()
    /*  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("validate");
    } */
  };
  useEffect(() => {
    dispatch(apiCall({ ...profile.roleList }));
  }, []);
  return (
    <Modal centered backdrop="static" show onHide={props.closeModal}>
      <Modal.Header closeButton className={classes.modalHeader}>
        <Title title="Create New User" />
      </Modal.Header>
      <Modal.Body className={`${classes.modalBody}`}>
        <Form onSubmit={handleSubmit}>
          {userInfo.map((data, index) => (
            <Form.Group
              as={Row}
              className="mb-2 px-3 align-items-center"
              controlId={`formPlaintext${data.key}`}
              key={index}
            >
              <Form.Label column sm="3">
                {data.value}
                <span className="text-danger">&nbsp;*</span>
              </Form.Label>
              {(data.type === "text" ) && ( 
                <Col sm="9" className={classes.colForm}>              
                  <Form.Control
                    name={data.key}
                    onChange={(event) => handleFormFeilds(event,data.key)}
                    required
                    isInvalid={(isValidated && !(requestData?.[data.key]?.trim().length > 0))}
                    /* isValid= {isValidated && (requestData?.[data.key]?.length>0)}   */
                    type={data.type}
                    placeholder={`enter ${data.value.toLowerCase()}`}
                    size="sm"
                    /*  defaultValue={modalType==="edit" ? getDefaultvalueForInput(data.id) : null} */
                  ></Form.Control>  
                 </Col>              
              )}
              {(data.type === "email") &&(
                <Col sm="9" className={classes.colForm}>
                  <Form.Control
                  /* as="column" */
                  name={data.key}
                  onChange={(event) => handleFormFeilds(event, data.key)}
                  required
                  isInvalid={(isValidated && !pattern.test(requestData?.[data.key]))}
                  /* isValid= {isValidated && (requestData?.[data.key]?.length>0)}   */
                  type={data.type}
                  placeholder={`enter ${data.value.toLowerCase()}`}
                  size="sm"
                  /*  defaultValue={modalType==="edit" ? getDefaultvalueForInput(data.id) : null} */
                ></Form.Control>
                </Col> 
              )
              }
              {(data.type === "password") && (
                <Fragment>
                  <Col sm="9" className={classes.colForm}>
                  <span className={classes.passwordToggler} onClick={() => setShowPassword((prev)=>!prev)}>
                    <i className={`${showPassword ? "bi bi-eye-slash" : "bi bi-eye"} px-1`} /> 
                    <span>
                      {`${showPassword ? "Hide" : "Show" }` }
                    </span>
                  </span>
                  <Form.Control
                   /*  as="column" */
                    name={data.key}                    
                    onChange={(event) => handleFormFeilds(event, data.key)}
                    required
                    isInvalid={
                      isValidated && !(requestData?.[data.key]?.length >= 8)
                    }
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder={`enter ${data.value.toLowerCase()}`}
                    size="sm"                    
                  >                   
                  </Form.Control>
                   <div className={classes.text}>                                 
                      <ul
                        className="px-2 mb-2"
                        style={{ color: `${color}` }}
                      >                        
                        <li key="key">8 characters minimum</li>
                      </ul>
                    </div>                        
                  </Col> 
                </Fragment>
              )}
              {data.type === "select" && (
                <Col className={classes.colForm}>                   
                {availableRoles.map((data) => (
                    <Form.Check key={data.value} id={data.value} value={data.value} label={data.key} onChange={(event)=>handleFormFeilds(event,"select",data)}>                     
                    </Form.Check>
                  ))}                    
                  <div className={`${(roleList.length === 0 && isValidated) ? classes.show : classes.hide}`}>Please select atleast one role</div>               
                  </Col>
                /* <Form.Select
                  size="sm"
                  onChange={(event) => handleFormFeilds(event, data.key)}
                  name={data.key}
                  isInvalid={
                    isValidated && !(requestData?.[data.key]?.length > 0)
                  }
                  required
                >
                  <option hidden value={""}>{`select role`}</option>
                  {availableRoles.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.key}
                    </option>
                  ))}
                </Form.Select> */
              )}
            </Form.Group>
          ))}
          <div className={classes.modalBottom}>
            <Button
              size="sm"
              variant="success"
              className="mx-1"
              type="submit"
              onClick={() => {
                setIsValidated(true);
              }}
            >              
              Create
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="mx-1"
              type="button"
              onClick={props.closeModal}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(CreateProfile);

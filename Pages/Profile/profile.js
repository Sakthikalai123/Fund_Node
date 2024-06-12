import { Fragment,useState,useCallback } from "react";
import { CustomButton, Title, Response } from "../../CommonFunctions/commonComponent";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./profile.module.css";
import CreateProfile from "./createProfile";
import { getUserRole } from "../../CommonFunctions/commonFunction";

const Profile = () => {
  const [createUser,setCreateUser] = useState(false);
  const commonData = useSelector((state) => state.commonData);
    let userData = [];
    const closeCreateModal =useCallback(()=>{ 
      setCreateUser(false)
    },[setCreateUser])
  const userRole = getUserRole();
  try {
    const userDetails = JSON.parse(localStorage.getItem("userInfo"));
    const data = userDetails.FnUserDetails;
    userData = [
      { key: "FirstName", value: data.firstname },
      { key: "LastName", value: data.lastname },
      { key: "Email", value: data.emailId },
      { key: "UserId", value: data.userId },
      { key: "Role", value: data.roleList[0].roleName },
    ];
  } catch (e) {}  
  return (
    <Fragment>
      <Container fluid>
      {commonData.isUpdating && (
        <Response         
          status={commonData.response.status}
          message={commonData.response.message}
        ></Response>
      )}{userRole === "Admin" &&
        <div className="m-3">
          <CustomButton variant="outline-success"  onClick={()=>setCreateUser(true)}>
            Create New User
            <i className="bi bi-person-plus-fill ps-1"></i>
          </CustomButton>
        </div>
      }
        <div className={classes.profileLayout}>
          <div className={classes.profileHeader}>
            <Title title="Profile Details" />
            {/* <div>
              <CustomButton variant="outline-primary">
                Edit Profile
                <i className="bi bi-pencil-fill ps-1"></i>
              </CustomButton>
            </div> */}
          </div>
          <div className={classes.profileBody}>
            {userData.map((data, index) => (
              <Row key={index} className="mb-3">
                <Col md={6} className={classes.keyName}>
                  {data.key}
                </Col>
                <Col md={6}>{data.value}</Col>
              </Row>
            ))}
          </div>
          {/*  <div className={classes.profileHeader}>         
          <Title title="Edit Profile" />
         </div>   */}
        </div> 
      </Container>
      {createUser &&
      <CreateProfile closeModal={closeCreateModal}></CreateProfile>
      }
    </Fragment>
  );
};

export default Profile;

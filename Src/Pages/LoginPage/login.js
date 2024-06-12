import { Row, Col, Container, Form } from "react-bootstrap";
import { getBaseUrl, setCookie } from "../../CommonFunctions/commonFunction";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { apiCall, authActions, commonActions } from "../../Redux/action";
import classes from "./login.module.css";
import img from "../../Assert/Fundnode-light_1@4x.png";
import { CustomButton } from "../../CommonFunctions/commonComponent";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { authentication } from "../../Service/apiVariable";

const Login = () => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const userName = useRef();
  const password = useRef();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = userName.current.value;
    const passCode = password.current.value;
    const isValid = user.trim().length > 0 && passCode.trim().length > 0;
    setIsValid(true);
    if (isValid) {
      dispatch(commonActions.setLoading(true));
      const requestParam = {
        username: user,
        password: passCode,
      };
      try {
        let url = `${getBaseUrl()}/auth/login`;
        const response = await axios.post(url, requestParam,{
          headers: {
            Authorization: null,
          },
        });
        dispatch(commonActions.setLoading(false));
        const data = response.data;
        if (data.logged) {          
          const accessTokenExpiryTime =
            jwtDecode(data.fnAccessToken).exp * 1000;          
          const refreshTokenExpiryTime =
            jwtDecode(data.fnRefreshToken).exp * 1000;
          setCookie("FN_AT", data.fnAccessToken, accessTokenExpiryTime);         
          setCookie("FN_RT", data.fnRefreshToken, refreshTokenExpiryTime);           
          dispatch(authActions.setToken());
          dispatch(authActions.isLogged());
          await dispatch(apiCall({ ...authentication.userInfo }));
        } else {
          setErrMsg("Invalid Credentials");         
          setIsValid(false);
        }
        /* dispatch(commonActions.setLoading(false)); */
      } catch (e) {        
        dispatch(commonActions.setLoading(false));
        setErrMsg("Server Error");       
        setIsValid(false);
      }
    } else {
      if (user.length === 0 && passCode.length === 0) {
        setErrMsg("Please Enter Credentials");
      } else if (user.length === 0) setErrMsg("Please Enter Username");
      else if (passCode.length === 0) setErrMsg("Please Enter Password");
      setIsValid(false);
    }
  };
  const onChangeHandler = () => {
    setErrMsg(null);
    setIsValid(true);
  };
  return (
    <Container fluid={true} className="mx-0 px-0">
      <Row className="mx-0">
        <Col sm={6} className="d-none d-sm-block px-0">
          <div className={`${classes.loginImage}`}>          
          </div>
        </Col>
        <Col sm={6} className={classes.loginMain}>
          <div
            className=" d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <Form
              className={`w-50 ${classes.loginForm}`}
              onSubmit={onSubmitHandler}
            >
              <div className={classes.loginTop}>
                <img alt="logo" src={img} className={classes.img}></img>
                <div className={`mt-3 ${classes.text}`}>Login to Fundnode</div>
                <div
                  className={`text-danger ${
                    isValid ? classes.valid : classes.inValid
                  } ${classes.errMsg}`}
                  data-testid="errMsg"
                >
                  {errMsg}
                </div>
              </div>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className={classes.floatingLabel}
              >
                <Form.Control
                  /* type="email" */
                  placeholder="username"
                  className={`${classes.input} border-bottom`}
                  ref={userName}
                  onChange={onChangeHandler}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className={classes.floatingLabel}
              >
                <Form.Control
                  type="password"
                  placeholder="password"
                  className={`${classes.input} border-bottom`}                 
                  ref={password}
                  onChange={onChangeHandler}
                />
              </FloatingLabel>
              <div
                className={classes.loginBottom}
              >
                <CustomButton className="default">
                  {"Login "}
                  <i className="bi bi-arrow-right"></i>
                </CustomButton>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;

import {
  useNavigate,
  Navigate,
  Route,
  Routes,  
} from "react-router-dom";
import { Fragment, useEffect } from "react";
import { authenticatedRoutes, unAuthenticatedRoutes } from "./routes";
import * as Pages from "../../Pages/index";
import { useSelector } from "react-redux";

const CommonRouter = () => {
   const navigate = useNavigate();
  const authData = useSelector((state) => state.authData);
  document.title = "Fundnode";
  const isLogged = authData.isLogged;
  const isSessionTimeOut = authData.sessionTimeOut;
  const isUnAuthorized = authData.isUnAuthorized;
  let routesToRender, defaultPath;
  if (isLogged) {
    routesToRender = authenticatedRoutes;
    defaultPath = "/home";
  } else {
    routesToRender = unAuthenticatedRoutes;
    defaultPath = "/login";
  }
  useEffect(() => {
    if (isSessionTimeOut) {
      navigate("/sessiontimeout");
    }
    if (isUnAuthorized) {
      navigate("/unauthorized");
    }
  }, [isUnAuthorized, isSessionTimeOut, navigate]);

  const populateRoutes = (routes) => {
    try {
      return routes.map(
        (
          { component, redirect, path, childrens = []},
          index
        ) => {
          if (childrens.length > 0) {
            return (
              <Fragment key={index}>
                <Route
                  path={path}
                  element={<Navigate to={redirect} />}
                  key={index}
                  caseSensitive
                ></Route>
                {childrens.map(({ path, component, innerChild=[] }, index) => {
                  let Page = Pages[component];
                  return (
                    <Route path={path} element={<Page />} key={index} caseSensitive>
                      {innerChild.length > 0 &&
                        innerChild.map(({ path, component }) => {                         
                          let Page = Pages[component];
                          return (
                            <Route path={path} element={<Page />} key={index} caseSensitive/>
                          );
                        })}
                    </Route>
                  );
                })}
              </Fragment>
            );
          } else {
            let Page = Pages[component];
            return <Route path={path} element={<Page />} key={index} caseSensitive/>;
          }
        }
      );
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <Fragment>
      <Routes>
        {populateRoutes(routesToRender)}
        {isLogged ? (
          <Route
            path="*"
            element={<Navigate to={defaultPath}></Navigate>}
          ></Route>
        ) : (
          <Route path="*" element={<Pages.PageNotFound />}></Route>
        )}
      </Routes>
    </Fragment>
  );
};

export default CommonRouter;

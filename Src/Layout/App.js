import React, { Fragment } from "react";
import "./App.css";
import MainLayout from "./Layout/MainLayout/mainLayout";
import ErrorBoundary from "./Pages/Helpers/errorBoundary";


function App() {
  console.log("Released on (Thu May 23 2024)")
  return <Fragment>
    <ErrorBoundary>
   <MainLayout/>  
   </ErrorBoundary> 
  </Fragment>
}
export default App;

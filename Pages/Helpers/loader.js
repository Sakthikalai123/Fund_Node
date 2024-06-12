
import classes from "./loader.module.css"
import ReactDom from "react-dom";
import {Fragment} from "react"
import { useSelector } from "react-redux";

export const Loader = () => {

 return   <div className={classes.wrapper}>
 <div className={`${classes.circle} ${classes.violet}`}></div>
 <div className={`${classes.circle} ${classes.skyBlue}`}></div>
 <div className={`${classes.circle} ${classes.dark}`}></div>
 <div className={classes.shadow}></div>
 <div className={classes.shadow}></div>
 <div className={classes.shadow}></div>
</div>
}
const BackDrop = () => {
  return <div  className={classes.backDrop}></div>;
};

const LoaderAnimation = (props) => {
  const commonData = useSelector(state => state.commonData);
 
  const loader = <Fragment> {ReactDom.createPortal(
                  <BackDrop></BackDrop>,
                  document.getElementById("backDrop")
                )}
                {ReactDom.createPortal(
                  <Loader></Loader>,
                  document.getElementById("overLay")
                )}
                </Fragment>
  let isLoading = (commonData.isLoading || props.load) ? loader : <></> // It will load onliy for api call and lazy loading
 
  return (
    <Fragment >      
      {isLoading}
    </Fragment>
  );
};
export default LoaderAnimation;

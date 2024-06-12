import classes from './sessionExpired.module.css'
import{Fragment} from 'react'
import { useNavigate } from 'react-router-dom'
import {authActions } from '../../Redux/action'
import { useDispatch } from 'react-redux'
import { CustomButton } from '../../CommonFunctions/commonComponent'
const SessionExpired = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = ()=>{
      dispatch(authActions.refresh());
      navigate('/login')
    }
    return <Fragment>     
    <div className={classes.backDrop}>
             <div className={`${classes.main} bg-light`}>
                <div className={classes.header} >
                     <i className='bi bi-exclamation-triangle-fill text-warning'></i>
                </div> 
                <div className={classes.body}>
                <h3>Your session has expired</h3>                
                <span className='d-6 p-2'>
                    Please login again to contiue                
                </span> 
                </div>
                
                <div className={classes.footer}>
                <CustomButton className='default' style={{width:'5rem'}} onClick={login}>
                  OK
                </CustomButton>
                </div>
             </div>
    </div>
    </Fragment>
}
export default SessionExpired
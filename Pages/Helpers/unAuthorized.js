import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../Redux/action';

const UnAuthorized = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = ()=>{
        dispatch(authActions.refresh());
        navigate('/login')
      }
    return <div className='mt-5 pt-5 d-flex flex-column align-items-center justify-content-center text-secondary' style={{fontWeight:600}}>
    <div className='d-flex align-items-center'>
        <span className='h3'>
            <strong>Error 401</strong>
        </span>
        <span className='h5'>&nbsp;-&nbsp; Unauthorized</span>
    </div>
    <p>Sorry, Your request could not be processed. Please return to <span className='text-primary' onClick={login} style={{cursor:'pointer'}}>login</span> page.</p>
    </div>
}

export default UnAuthorized
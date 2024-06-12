import {useEffect} from'react'
import { useLocation } from 'react-router-dom';
import {useSelector } from 'react-redux';

const useUnsavedChangesWarning=(message='Are you sure')=>{
    const location=useLocation();   
    const jobFieldMapData=useSelector(state=>state.jobFieldMapData);
    const isDirty=jobFieldMapData.isDirty;
    const a=true
    
    useEffect(()=>{
        window.onbeforeunload = a && (()=>message);
       
        return ()=>{
            window.onbeforeunload = null;
        }
    },[isDirty,location,a,message]);
    

    return ;
}
export default useUnsavedChangesWarning
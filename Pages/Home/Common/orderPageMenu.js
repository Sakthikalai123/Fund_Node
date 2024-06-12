import { Fragment} from 'react'
import { ButtonGroup } from 'react-bootstrap';
import { CustomButton } from '../../../CommonFunctions/commonComponent';
import { useNavigate } from 'react-router-dom';
import { useCustomLocation } from '../../../CommonFunctions/commonFunction';

const MenuBar = () => {
 const navigate = useNavigate();
 const {pathname,baseComponentUrl} = useCustomLocation();
 let pageName; 
 const changePage = (pageName)=>{  
  navigate(`${baseComponentUrl}/${pageName}`)
 }
 if(pathname.includes('fileinfo'))
 {
  pageName = 'fileinfo';
 }
 else{
  pageName = 'orderinfo';
 }
 return <Fragment>  
   <div className='my-1'>
              <ButtonGroup >                
                <CustomButton
                  variant="light"
                  onClick={()=>changePage('fileinfo')}
                  className={`${
                    pageName === "fileinfo" ? "text-light bgColor_1" : ""
                  }`}                  
                >
                  File Info
                </CustomButton>                
                <CustomButton
                  variant="light"
                  onClick = {()=>changePage('orderinfo')}
                  className={`${
                    pageName === "orderinfo" ? "text-light bgColor_1" : ""
                  }`}                  
                >
                  Order Info
                </CustomButton>
              </ButtonGroup>              
            </div>
</Fragment>
};
export default MenuBar;

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../Redux/action";
import { apiCall } from "../../../Redux/action";
import { WarningModal } from "../../../CommonFunctions/commonComponent";

const Status = (props) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalData);
  const record = modalData.recordToModify;
  const isOpen = modalData.statusModalIsOpen;
  const api = props.updateApi;
  const msg = "You want to change the status . ";

  /*  ${ (record.active===true)  
                    ? <span><strong>active</strong> to <strong>inactive</strong> .</span>
                    :<span><strong>inactive</strong> to <strong>active</strong> .</span>
                   } */
   const closeModal = () => {
    dispatch(modalActions.closeStatusModal());
  };
  const changeStatus = async() => {
    closeModal();
    if (record.active) {
     await dispatch(apiCall({ ...api.inActivate, requestData: record[props.id] }));
    } else {
     await dispatch(apiCall({ ...api.activate, requestData: record[props.id] }));
    }   
  };
  return (
    <WarningModal
      isOpen={isOpen}
      proceed={changeStatus}
      cancel={closeModal}
      message={msg}
    ></WarningModal>
  );
};
export default Status;

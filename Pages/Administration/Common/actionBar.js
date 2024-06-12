import React from "react";
import { Fragment } from "react";
import Status from "./status";
import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../../../CommonFunctions/commonComponent";
import UpdateForm from "./updateform";
import { modalActions } from "../../../Redux/action";
import SftpConnection from "./sftpConnectionStatus";
import { getUserRole } from "../../../CommonFunctions/commonFunction";

const ActionBar = (props) => {
  const commonData = useSelector((state) => state.commonData);
  const totalRecords = commonData.records.totalRecords;
  const userRole = getUserRole();
  const dispatch = useDispatch();
  const openAdd = () => {
    dispatch(modalActions.setFormModal({ type: "add", isOpen: true }));
  };

  return (
    <Fragment>
      {(totalRecords > 0 || totalRecords === undefined) &&
        !commonData.isError && (
          <div>
            {userRole === "Admin" && (
              <CustomButton onClick={openAdd} variant="outline-success">
                Add
              </CustomButton>
            )}
            <UpdateForm
              name={props.name}
              editParam={props.updateFormParam}
              updateFormLayout={props.updateFormLayout}
              updateFormData={props.updateFormData}
              updateApi={props.updateApi}
            ></UpdateForm>
            <Status
              updateApi={props.updateApi}
              id={props.updateFormParam[0]}
            ></Status>
            <SftpConnection></SftpConnection>
          </div>
        )}
    </Fragment>
  );
};
export default React.memo(ActionBar);

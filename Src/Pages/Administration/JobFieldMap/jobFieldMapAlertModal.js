import { useDispatch, useSelector } from "react-redux";
import { jobFieldMapActions } from "../../../Redux/action";
import { jobFieldMap } from "../../../Service/apiVariable";
import { apiCall } from "../../../Redux/action";
import { WarningModal } from "../../../CommonFunctions/commonComponent";

export const JobFieldMapAlertModal = (props) => {
  const dispatch = useDispatch();
  const jobFieldMapData = useSelector((state) => state.jobFieldMapData);
  const records = jobFieldMapData.records;
  /* console.log(jobFieldMapData.recordsToUpdate.length); */
  const isOpen = jobFieldMapData.isAlertModalOpen;
  const msg =
    "Do you really want to delete these records ? This process cannot be undone";
  const deleteRecord = async () => {
    let newRecords = [...records];
    let requestData = [];
    jobFieldMapData.selectedRecords.forEach((element) => {
      const index = newRecords.findIndex((item) => element == item.id);
      if (index !== -1) {
        const id = newRecords[index].id;
        dispatch(jobFieldMapActions.updateRecord({ type: "delete", id: id }));
        if (typeof id === "number") {
          requestData = requestData.concat(id);
        }
        newRecords.splice(index, 1);
      }
    });

    await dispatch(
      apiCall({ ...jobFieldMap.delete, requestData: requestData })
    );
    dispatch(jobFieldMapActions.refreshCrudRecord({ type: "delete" }));
    dispatch(jobFieldMapActions.closeAlertModal());
    dispatch(jobFieldMapActions.setRecords(newRecords));
  };
  const closeModal = () => {
    dispatch(jobFieldMapActions.closeAlertModal());
  };

  return (
    <WarningModal
      isOpen={isOpen}
      proceed={deleteRecord}
      cancel={closeModal}
      message={msg}
    ></WarningModal>
  );
};

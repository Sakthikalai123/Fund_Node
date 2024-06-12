import { Modal } from "react-bootstrap";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../Redux/action";
import { Title } from "../../../CommonFunctions/commonComponent";

const SftpConnection = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalData);
  const sftpStatus = modalData.sftpValidationStatus;
  const isOpen = modalData.sftpModalIsOpen;
  const keys = sftpStatus !== null ? Object.keys(sftpStatus) : [];
  const response = (
    <ul>
      {keys.map((key, index) => (
        <li key={index}>{`${key} : ${sftpStatus[key]}`}</li>
      ))}
    </ul>
  );
  /*   sftpStatus !== null ? (
      <ul>
        {keys.map((key, index) => (
          <li key={index}>{`${key} : ${sftpStatus[key]}`}</li>
        ))}
      </ul>
    ) : (
      <div className="text-center">
        {" "}
        <Spinner animation="border" variant="primary" />{" "}
      </div>
    ); */
  return (
    <Modal
      size="md"
      show={isOpen && sftpStatus !== null}
      backdrop="static"
      onHide={() => {
        dispatch(modalActions.closeSftpModal());
        dispatch(modalActions.setSftpValidationStatus(null));
      }}
      centered
    >
      <Modal.Header closeButton id="contained-modal-title-vcenter" style={{backgroundColor:"rgb(191 201 235 / 62%)"}}>
        <Title title="Job Configuration validation"></Title>
      </Modal.Header>
      <Modal.Body>{response}</Modal.Body>
    </Modal>
  );
};
export default React.memo(SftpConnection);

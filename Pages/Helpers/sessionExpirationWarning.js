import { Modal } from "react-bootstrap"

const SessionExpirationWarning = ()=>{

    return <Modal show >
            <span className="m-auto">
                <i style={{fontSize:"3rem",color:"red"}} className="bi bi-exclamation-circle"></i>
            </span>
            <Modal.Body>
                
            </Modal.Body>
    </Modal>
}

export default SessionExpirationWarning
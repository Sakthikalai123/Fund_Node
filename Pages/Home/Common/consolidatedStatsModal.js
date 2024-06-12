import { Button, Modal, Table } from "react-bootstrap";
import classes from "./consolidatedStatsModal.module.css";
import { Title } from "../../../CommonFunctions/commonComponent";
import { useCustomLocation } from "../../../CommonFunctions/commonFunction";
import { useSelector } from "react-redux";
import { Tooltip, Whisper } from "rsuite";

const ConsolidatedStatsModal = (props) => {
  const homeData = useSelector((state) => state.homeData);
  const {
    modalFileStats,
    modalSubStats,
    modalRedStats,
    modalSwitchSubStats,
    modalSwitchRedStats,
  } = homeData;
  const { closeModal, user } = props;
  const {participantName} = useCustomLocation();
  const labelType = ["Distributor_Name", "Transaction_Type"];
  const status = ["Total", "Success", "InProgress", "Failed"];
  let validLabelType,colSpanLength = 0, tableContent = [];
  labelType.forEach((label) => {
    Object.keys(
      modalSubStats.Record_Stats !== undefined ? modalSubStats.Record_Stats : {}
    )?.forEach((labelFromDatabase) => {
      if (label === labelFromDatabase) {
        validLabelType = label;
        colSpanLength = modalSubStats.Record_Stats?.[label]?.length; // For Ops dashboard consolidated stats modal
      }
    });
  });
  let fileCount = getCount(modalFileStats, "File_Stats");
  let subCount = getCount(modalSubStats, "Record_Stats");
  let redCount = getCount(modalRedStats, "Record_Stats");
  let switchSubCount = getCount(modalSwitchSubStats, "Record_Stats");
  let switchRedCount = getCount(modalSwitchRedStats, "Record_Stats");  
  const label =
    modalSubStats?.Record_Stats?.[
      validLabelType
    ]; /* to get the label here we are using modalSubStats. why because all the modal will have same label*/
  const tableHeading = label !== undefined ? label : [];  
  let n = 0,
    renderStatsLabel = [];
  while (tableHeading.length > n) {
    renderStatsLabel = [...renderStatsLabel, ...status];
    n++;
  }
  const clientTableContent = [
    { name: "Subscription", data: subCount },
    { name: "Redemption", data: redCount },
    { name: "Switch Subscription", data: switchSubCount },
    { name: "Switch Redemption", data: switchRedCount },
  ];
  const uobkhClientTableContent = [
    { name: "Subscription", data: subCount },
    { name: "Redemption", data: redCount },
  ];
  const opsTableContent = [
    { name: "File Stats", data: fileCount },
    { name: "Record Stats", data: [] },
    ...clientTableContent,
  ];
  if(user === 'ops'){
    tableContent = opsTableContent;
  }
  else if(user === "client" && participantName === "UOBKH"){
    tableContent = uobkhClientTableContent;
  }
  else{
    tableContent = clientTableContent;
  }
  function getCount (data, statsType) {
    let count = [];
    try {
      data?.[statsType]?.[validLabelType]?.forEach((participant, partIndex) => {
        status.forEach((item, labelIndex) => {
          let value = data?.[statsType]?.[item]?.[partIndex];
          count = [...count, value];
        });
      });
      return count;
    } catch (error) {
      throw new Error(error);
    }
  };   
  const clientFileStats = (
    <div>
      <div className={classes.title}>File Statistics :</div>
      <div className="d-flex">
        {status.map((item, index) => (
          <div key={index} className={classes.row}>
            <span className={`${classes.name}`}>{item}</span>
            <span>&nbsp;:&nbsp;{modalFileStats["File_Stats"]?.[item]}</span>
          </div>
        ))}
      </div>
    </div>
  );
  const getIcon = (props) => {
    let icon;
    switch (props) {
      case "Total":
        icon = <i className="bi bi-clipboard2-check-fill text-primary"></i>;
        break;
      case "Success":
        icon = <i className="bi bi-hand-thumbs-up-fill text-success"></i>;
        break;
      case "InProgress":
        icon = (
          <i
            className="bi bi-clock-fill"
            style={{ color: "rgb(252, 244, 3)" }}
          ></i>
        );
        break;
      case "Failed":
        icon = <i className="bi bi-hand-thumbs-down-fill text-danger"></i>;
        break;
      default:
        icon = <i className="bi bi-clipboard2-check-fill"></i>;
    }
    return icon;
  };
  return (
    <Modal
      size="lg"
      show={true}
      onHide={() => closeModal()}
      centered
      backdrop="static"
      scrollable
    >
      <Modal.Header closeButton style={{ backgroundColor: "rgb(210 215 234)" }}>
        <Title title="Consolidated Statistics"></Title>
      </Modal.Header>
      <Modal.Body>
        {user === "client" && clientFileStats}
        {user === "client" && (
          <div className={`${classes.title} mt-3`}>Order Statistics :</div>
        )}
        <Table bordered striped className={classes.table}>
          <thead>
            <tr>
              <th rowSpan={2}></th>
              {tableHeading.map((item, index) => (
                <th key={index} className="text-center" colSpan={4} rowSpan={1}>
                  {item}
                </th>
              ))}
            </tr>
            <tr className={classes.lightBgColor}>
              {renderStatsLabel.map((item) => (
                <th key={Math.random()} className="text-center">
                  <Whisper
                    placement="bottomStart"
                    controlid="control-id-total"
                    trigger="hover"
                    speaker={<Tooltip>{item}</Tooltip>}
                  >
                    {getIcon(item)}
                  </Whisper>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableContent.map(
              (item, index) => (
                <tr key={index}>
                  <td colSpan={`${item.name === "Record Stats" && ((colSpanLength*4) +1)}`} className={`${classes.name} ${classes.lightBgColor}`} style={{fontWeight:`${(item.name === "File Stats" || item.name === "Record Stats") && "700"} `}}>
                    {item.name}
                  </td>
                  {item.data.map((item, index) => (
                    <td key={index} className="text-center">
                      {item}
                    </td>
                  ))}
                </tr>
              )
            )}           
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={() => closeModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsolidatedStatsModal;

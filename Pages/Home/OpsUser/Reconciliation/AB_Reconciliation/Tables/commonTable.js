import { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import classes from "./table.module.css";
import moment from "moment";
import { apiCall, reconciliationAction } from "../../../../../../Redux/action";
import {
  NoRecordFound,
  ErrorModal,
} from "../../../../../../CommonFunctions/commonComponent";
import { abReconProcess } from "../../../../../../Service/apiVariable";
import { today } from "../../../../../../CommonFunctions/commonFunction";
import ReconMsg from "./reconMsgTable";

const orders = [
  "ordersTotal",
  "ordersApproved",
  "ordersRejected",
  "ordersReconciliation",
];
const orderAmount = [
  "ordersAmount",
  "approvedAmount",
  "rejectedAmount",
  "reconciliationAmount",
];
const investors = [
  "investorsTotal",
  "investorsApproved",
  "investorsRejected",
  "investorsReconciliation",
];
const funding = [
  "fundingAmount",
  "approvedFunding",
  "rejectedFunding",
  "reconciliationFunding",
];
const reconId = [
  "ordersReconciliation",
  "reconciliationAmount",
  "investorsReconciliation",
  "reconciliationFunding",
];
const MainTable = (props) => {
  /* const { agentBankList} = useSelector((state) => state.reconciliationData); */
  const { isLoading } = useSelector((state) => state.commonData);
  const { abProcessReconRecord } = useSelector(
    (state) => state.reconciliationData
  );
  const [isShowModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  let totalCountCalcLabel = [];
  const reconDate = localStorage.getItem("recon_date");
  const distributorName = localStorage.getItem("recon_part_name");
  const agentBankList = [
    { id: "03-0100", name: "DBS" },
    { id: "03-0200", name: "OCBC" },
    { id: "03-0300", name: "UOB" },
  ];
  const { tableData, tableBodyContent, tableName } = props;
  const transactionTypeList = [
    { id: "P", name: "Subscription" },
    { id: "S", name: "Redemption" },
  ];
  const accountTypeList = ["SRS", "CPFOA"];
  let tableStruct = [],
    tableContent = [];
  let total = 0,
    approved = 0,
    rejected = 0,
    reconciliation = 0;
  switch (tableName) {
    case "orders":
      totalCountCalcLabel = orders;
      break;
    case "orderAmount":
      totalCountCalcLabel = orderAmount;
      break;
    case "investors":
      totalCountCalcLabel = investors;
      break;
    case "funding":
      totalCountCalcLabel = funding;
      break;
    default:
      totalCountCalcLabel = []; // It will be apply for validation table.
  }
  function getTableStruct() {
    try {
      transactionTypeList.forEach((transType) => {
        accountTypeList.forEach((accType) => {
          agentBankList.forEach((agentBank) => {
            let data = {
              id: "details",
              transactionType: transType,
              accountType: accType,
              agentBank: agentBank,
            };
            tableStruct = [...tableStruct, data];
          });
          tableStruct = [...tableStruct, { id: "total" }];
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
  function getTableContent() {
    try {
      tableStruct.forEach((expectRes) => {
        let isHaveActualResult = false;
        if (expectRes.id === "details") {
          tableBodyContent.forEach((actualRes) => {
            if (
              expectRes.transactionType.id === actualRes.transactionType &&
              expectRes.accountType === actualRes.accountType &&
              expectRes.agentBank.id === actualRes.agentBank
            ) {
              tableContent = [
                ...tableContent,
                {
                  ...actualRes,
                  agentBank: expectRes?.agentBank?.name,
                  transactionType: expectRes?.transactionType?.name,
                  id: "details",
                },
              ];
              isHaveActualResult = true;
              /* For total calc */
              totalCountCalcLabel.forEach((id, index) => {
                switch (index) {
                  case 0:
                    total = total + actualRes[id];
                    break;
                  case 1:
                    approved = approved + actualRes[id];
                    break;
                  case 2:
                    rejected = rejected + actualRes[id];
                    break;
                  case 3:
                    reconciliation = reconciliation + actualRes[id];
                    break;
                  default:
                    return null;
                }
              });
            }
          });
          if (!isHaveActualResult) {
            tableContent = [
              ...tableContent,
              {
                id: "details",
                reconciliationDate: `${
                  reconDate !== null
                    ? moment(reconDate).format("DD-MMM-YYYY")
                    : moment().format("DD-MMM-YYYY")
                }`,
                transactionType: expectRes.transactionType?.name,
                accountType: expectRes.accountType,
                agentBank: expectRes.agentBank?.name,
              },
            ];
          }
        } else {
          /* Adding decimal point */
          if (tableName === "orderAmount" || tableName === "funding") {
            total = parseFloat(total).toFixed(2);
            approved = parseFloat(approved).toFixed(2);
            rejected = parseFloat(rejected).toFixed(2);
            reconciliation = parseFloat(reconciliation).toFixed(2);
          }
          tableContent = [
            ...tableContent,
            { id: "total", total, approved, rejected, reconciliation },
          ];
          /* reseting the valus for calc */
          total = 0;
          approved = 0;
          rejected = 0;
          reconciliation = 0;
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  async function reconMsgHandler(data) {
    let agentBankId, transactionTypeId;
    agentBankList.forEach((item) => {
      if (item.name === data.agentBank) {
        agentBankId = item.id;
      }
    });
    transactionTypeList.forEach((item) => {
      if (item.name === data.transactionType) {
        transactionTypeId = item.id;
      }
    });
    dispatch(reconciliationAction.resetReconRecord());
    const request = {
      reconciliationDate: reconDate === null ? today() : reconDate,
      participantShortName: distributorName,
      transactionType: transactionTypeId,
      accountType: data.accountType,
      agentBank: agentBankId,
    };
    await dispatch(
      apiCall({ ...abReconProcess.getReconRecord, requestData: request })
    );
    setShowModal(true);
  }
  getTableStruct();
  getTableContent();
  return (
    <>
      {tableBodyContent.length > 0 && (
        <div className={classes.table_responsive}>
          <Table size="sm" bordered striped>
            <thead className="bgColor_2">
              <tr>
                {tableData.map((data, index) => (
                  <th key={index}>{data.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableContent.map((data, index) => {
                if (tableName === "validation" && data.id === "total") {
                  return null;
                } else {
                  return (
                    <tr key={index}>
                      {data.id === "details" &&
                        tableData.map((label, index) => (
                          <td key={index}>
                            <div className="d-flex justify-content-between">
                              <span>
                                {data[label.id] !== undefined
                                  ? data[label.id]
                                  : "-"}
                              </span>
                              <span className="">
                                {reconId.some((id) => id === label.id) &&
                                  data[label.id] > 0 && (
                                    <span
                                      className={classes.viewButton}
                                      onClick={() => reconMsgHandler(data)}
                                    >
                                      view
                                    </span>
                                  )}
                              </span>
                            </div>
                          </td>
                        ))}
                      {data.id === "total" && (
                        <>
                          <td
                            colSpan={4}
                            className={`${classes.total} text-center`}
                          >
                            Total
                          </td>
                          <td className={`${classes.total}`}>
                            {data["total"]}
                          </td>
                          <td className={`${classes.total}`}>
                            {data["approved"]}
                          </td>
                          <td className={`${classes.total}`}>
                            {data["rejected"]}
                          </td>
                          <td className={`${classes.total}`}>
                            {data["reconciliation"]}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
      )}
      <ErrorModal
        message={<ReconMsg />}
        show={isShowModal}
        size="xl"
        scrollable={true}
        onHide={() => setShowModal(false)}
        title={"Reconciliation Data"}
        totalError={abProcessReconRecord?.data?.length}
      />
      {tableBodyContent.length === 0 && !isLoading && <NoRecordFound />}
    </>
  );
};
export default MainTable;

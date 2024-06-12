import { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { email } from "../../../../../../Service/apiVariable";
import { apiCall } from "../../../../../../Redux/action";
import classes from "./table.module.css";
import {
  CustomButton,
  NoRecordFound,
  Response,
} from "../../../../../../CommonFunctions/commonComponent";
import { today } from "../../../../../../CommonFunctions/commonFunction";

const ReportTable = (props) => {
  /* console.log("ReportTable"); */
  const { response, isUpdating, isLoading } = useSelector(
    (state) => state.commonData
  );
  const [isButtonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const { tableData, tableBodyContent } = props;
  const agentBankList = [
    { id: "03-0100", name: "DBS" },
    { id: "03-0200", name: "OCBC" },
    { id: "03-0300", name: "UOB" },
  ];
  const accountTypeList = ["SRS", "CPFOA"];
  let tableStruct = [],
    tableContent = [];
  agentBankList.forEach((agentBank) => {
    accountTypeList.forEach((accType) => {
      let data = {
        id: "details",
        accountType: accType,
        agentBank: agentBank,
      };
      tableStruct = [...tableStruct, data];
    });
  });

  function getTableContent() {
    try{
    tableStruct.forEach((expectRes) => {
      let isHaveActualResult = false;
      tableBodyContent.forEach((actualRes) => {
        if (
          expectRes.accountType === actualRes.accountType &&
          expectRes.agentBank.id === actualRes.agentBank
        ) {
          tableContent = [...tableContent, { ...actualRes,agentBank: expectRes?.agentBank?.name }];
          isHaveActualResult = true;
        }
      });
      if (!isHaveActualResult) {
        tableContent = [
          ...tableContent,
          {
            accountType: expectRes.accountType,
            agentBank: expectRes.agentBank?.name,
          },
        ];
      }
    });
  }catch(e){
    console.error(e);
  }
  }
  getTableContent();
  async function sendMail() {
    const reconDate = localStorage.getItem("recon_date");
    const distributorName = localStorage.getItem("recon_part_name");
   const request = {
    reconciliationDate: reconDate === null ? today() : reconDate,
    participantShortName:distributorName
   };
    setButtonLoading(true);
    await dispatch(apiCall({...email.abProcessReportEmail, requestData: request}));
    setButtonLoading(false);
  } 
  return (
    <>
      {isUpdating && (
        <Response status={response.status} message={response.message} />
      )}
      {tableBodyContent.length > 0 && (
        <>
          <div className="d-flex justify-content-end m-1">
            {isButtonLoading ? (
              <CustomButton>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                <span>Sending mail ...</span>
              </CustomButton>
            ) : (
              <CustomButton onClick={sendMail}>
                <i className="bi bi-envelope pe-1"></i>
                <span> Send Report Mail</span>
              </CustomButton>
            )}
          </div>
          <div className={classes.table_responsive_report}>
            <Table size="sm" bordered striped>
              <thead className="bgColor_2">
                <tr>
                  {tableData.map((data, index) => (
                    <th key={index}>{data.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableContent.map((data, index) => (
                  <tr key={index}>
                    {tableData.map((label, index) => (
                      <td key={index}>
                        {data[label.id] !== undefined ? (
                          data[label.id]
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
      {tableBodyContent.length === 0 && !isLoading && <NoRecordFound />}
    </>
  );
};
export default ReportTable;

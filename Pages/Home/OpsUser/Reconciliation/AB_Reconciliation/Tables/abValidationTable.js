import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./table.module.css";
import { NoRecordFound } from "../../../../../../CommonFunctions/commonComponent";

const ABValidiationTable = (props) => {
  const { isLoading } = useSelector((state) => state.commonData);
  const { tableData, tableBodyContent } = props;  
  const agentBankList = [
    { id: "03-0100", name: "DBS" },
    { id: "03-0200", name: "OCBC" },
    { id: "03-0300", name: "UOB" },
  ];
  const transactionTypeList = [
    { id: "P", name: "Subscription" },
    { id: "S", name: "Redemption" },
  ];
  const getAgentBankName = (id,label) => {
    let name;
    let listToIterate = (label === "agentBank" ? agentBankList : transactionTypeList);
    listToIterate?.forEach((data) => {
      if (data.id === id) {
        name = data.name;
      }
    });
    return name;
  };

  return (
    <>
      {tableBodyContent.length > 0 && (
        <>
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
                {tableBodyContent.map((data, index) => (
                  <tr key={index}>
                    {tableData.map((label, index) => (
                      <td key={index}>
                        {(label.id === "agentBank" || label.id === "transactionType")
                          ? getAgentBankName(data[label.id],label.id)
                          : data[label.id]}
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
export default ABValidiationTable;

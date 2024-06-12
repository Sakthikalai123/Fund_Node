import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./table.module.css";

const ReconMsg = () => {
  const { abProcessReconRecord } = useSelector(
    (state) => state.reconciliationData
  );
  const tableData = [
    { id: "distributorRefId", name: "DB Ref Id" },
    { id: "fnReferenceId", name: "FN Ref Id" },
    { id: "identificationNumber", name: "Id Number" },
    { id: "abFNReferenceId", name: "AB FN Ref Id" },
    { id: "endInvestorName", name: "Investor" },
    { id: "fundingAmount", name: "Amount" },
    { id: "abCpfStatus", name: "Status" },
  ];
  return (
    <Table bordered striped className={classes.reconMsgTable}>
      <thead className="bgColor_2">
        <tr>
          {tableData.map((data, index) => (
            <th key={index}>{data.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {abProcessReconRecord?.data?.map((data, index) => (
          <tr key={index}>
            {tableData.map((label, index) => (
              <td key={index}>{data[label.id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default ReconMsg;

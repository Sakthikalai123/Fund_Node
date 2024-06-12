import MainTable from "./Tables/commonTable";
import { useSelector } from "react-redux";
const Investor = () => {
  const { investors } = useSelector((state) => state.reconciliationData);
  const tableData = [
    { id: "reconciliationDate", name: "Date" },
    { id: "transactionType", name: "Transaction Type" },
    { id: "accountType", name: "Account Type" },
    { id: "agentBank", name: "Agent Bank" },
    { id: "investorsTotal", name: "Total Investors" },
    { id: "investorsApproved", name: "No of Investors Funding Approved" },
    { id: "investorsRejected", name: "No of Investors Funding Rejected" },
    { id: "investorsReconciliation", name: "Reconciliation" },
  ];
  /* const tableData =  */
  return (
    <MainTable
      tableData={tableData}
      tableBodyContent={investors.data}
      tableName="investors"
    />
  );
};
export default Investor;

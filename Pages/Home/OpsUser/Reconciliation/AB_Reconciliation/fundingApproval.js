import MainTable from "./Tables/commonTable";
import { useSelector } from "react-redux";
const Funding = () => {
  const { funding } = useSelector((state) => state.reconciliationData);
  const tableData = [
    { id: "reconciliationDate", name: "Date" },
    { id: "transactionType", name: "Transaction Type" },
    { id: "accountType", name: "Account Type" },
    { id: "agentBank", name: "Agent Bank" },
    { id: "fundingAmount", name: "Total Funding Amount" },
    { id: "approvedFunding", name: "Approved Amount" },
    { id: "rejectedFunding", name: "Rejected Amount" },
    { id: "reconciliationFunding", name: "Reconciliation" },
  ];
  /* const tableData =  */
  return (
    <MainTable
      tableData={tableData}
      tableBodyContent={funding.data}
      tableName="funding"
    />
  );
};
export default Funding;

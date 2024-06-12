import MainTable from "./Tables/commonTable";
import { useSelector } from "react-redux";
const Amount = () => {
  const { orderAmount } = useSelector((state) => state.reconciliationData);
  const tableData = [
    { id: "reconciliationDate", name: "Date" },
    { id: "transactionType", name: "Transaction Type" },
    { id: "accountType", name: "Account Type" },
    { id: "agentBank", name: "Agent Bank" },
    { id: "ordersAmount", name: "Total Order Amount" },
    { id: "approvedAmount", name: "Approved Amount" },
    { id: "rejectedAmount", name: "Rejected Amount" },
    { id: "reconciliationAmount", name: "Reconciliation" },
  ];
  /* const tableData =  */
  return (
    <MainTable
      tableData={tableData}
      tableBodyContent={orderAmount.data}
      tableName="orderAmount"
    />
  );
};
export default Amount;

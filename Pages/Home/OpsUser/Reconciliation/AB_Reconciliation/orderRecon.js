import MainTable from "./Tables/commonTable";
import { useSelector } from "react-redux";
const Order = () => {
  const { orders } = useSelector((state) => state.reconciliationData);
  const tableData = [
    { id: "reconciliationDate", name: "Date" },
    { id: "transactionType", name: "Transaction Type" },
    { id: "accountType", name: "Account Type" },
    { id: "agentBank", name: "Agent Bank" },
    { id: "ordersTotal", name: "Orders Received" },
    { id: "ordersApproved", name: "Orders Approved" },
    { id: "ordersRejected", name: "Orders Rejected" },
    { id: "ordersReconciliation", name: "Reconciliation" },
  ];
  /* const tableData =  */
  return (
    <MainTable
      tableData={tableData}
      tableBodyContent={orders.data}
      tableName="orders"
    />
  );
};
export default Order;

import ReportTable from "./Tables/reportTable";
import { useSelector } from "react-redux";
const Report = () => {
  const { report } = useSelector((state) => state.reconciliationData);
  const tableData = [
    { id: "agentBank", name: "Agent Bank" },
    { id: "accountType", name: "Account Type" },
    { id: "ordersTotal", name: " Total Orders Received" },
    { id: "ordersAmount", name: "Total Amount Received" },
    { id: "ordersApproved", name: "Total Orders Approved" },
    { id: "ordersRejected", name: "Total Orders Rejected" },
    { id: "approvedAmount", name: "Total Approved Amount" },
    { id: "rejectedAmount", name: "Total Rejected Amount" },
  ];
  /* const tableData =  */
  return <ReportTable tableData={tableData} tableBodyContent={report.data}/>;
};
export default Report;

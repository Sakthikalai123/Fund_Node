import ABValidiationTable from "./Tables/abValidationTable";
import { useSelector } from "react-redux";
const Validation = () => {
  const { validation } = useSelector((state) => state.reconciliationData);
  const tableData = [
    { id: "reconciliationDate", name: "Date" },
    { id: "transactionType", name: "Transaction Type" },
    { id: "accountType", name: "Account Type" },
    { id: "agentBank", name: "Agent Bank" },
    { id: "distributorRefId", name: "DB Ref Id" },
    { id: "fnReferenceId", name: "FN Ref Id" },
    { id: "abFNReferenceId", name: "AB FN Ref Id" },
    { id: "identificationNumber", name: "Id Number" },
    { id: "investmentType", name: "Investment Type" },
    { id: "endInvestorName", name: "Investor" },
    { id: "fundingAmount", name: "Funding Amount" },
    { id: "abCpfStatus", name: "Status" },

  ];
  /* const tableData =  */
  return (
    <ABValidiationTable
      tableData={tableData}
      tableBodyContent={validation.data}
      tableName="validation"
    />
  );
};
export default Validation;

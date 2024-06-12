import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainTable from "../Table/table";
import ActionBar from "./Common/actionBar";
import * as Card from "../../CommonFunctions/commonComponent";
import SearchForm from "../searchForm";
import { appLOV } from "../../Service/apiVariable";

const AppLov = () => {
  const commonData = useSelector((state) => state.commonData);
  const administrationData = useSelector((state) => state.administrationData);
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const domainList = administrationData.domainList;
  /*  console.log(participant) */

  const updateFormData = [
    { id: "domain", name: "Domain", type: "select", required:true, value: domainList },
    { id: "key", name: "Key", type: "text", required:true },
    { id: "value", name: "Value", type: "text", required:true },
  ];
  const tableData = [
    { id: "active", name: "Action", type: "edit", width: "50px" },
    { id: "id", name: "Id", type: "text" },
    { id: "key", name: "Key", type: "text" },
    { id: "value", name: "Value", type: "text" },
    { id: "domain", name: "Domain", type: "text" },
    { id: "reference1", name: "Reference 1", type: "text" },
    { id: "reference2", name: "Reference 2", type: "text" },
    { id: "reference3", name: "Reference 3", type: "text" },
    { id: "createdDate", name: "Created Date", type: "text" },
    { id: "updatedDate", name: "Updated Date", type: "text" },
  ];
  const searchFields = [
    {
      id: "domain",
      name: "Domain",
      type: "select",
      value: domainList,
    },
    {
      id: "key",
      name: "Key",
      type: "text",
      value: null,
    },
    {
      id: "value",
      name: "Value",
      type: "text",
      value: null,
    },
  ];
  const updateFormParam = [
    "id",
    "active",
    "reference1",
    "reference2",
    "reference3",
  ];
  const initialApi = [{ ...appLOV.search }, { ...appLOV.getDomainList }];
  const updateApi = { ...appLOV };
  const availableSortColumn = ["domain", "key"];
  const sortData = { sortColumn: null, sortOrder: null };

  return (
    <Container fluid>
      {commonData.isUpdating && (
        <Card.Response
          status={commonData.response.status}
          message={commonData.response.message}
        ></Card.Response>
      )}
      <Card.Layout>
        <Card.Header>
          <Card.FormLayout label={4}>
            <Card.Title title={"Application Lov"}></Card.Title>
            <SearchForm
              searchFields={searchFields}
              initialApi={initialApi}
              sortData={sortData}
            ></SearchForm>
          </Card.FormLayout>
        </Card.Header>
        <Card.ActionBar>
          <ActionBar
            updateFormData={updateFormData}
            updateApi={updateApi}
            updateFormParam={updateFormParam}
            updateFormLayout={null}
            name="Application Lov"
          />
        </Card.ActionBar>
        <Card.Body>
          <MainTable
            tableData={tableData}
            updateApi={updateApi}
            sortData={sortData}
            availableSortColumn={availableSortColumn}
            id={updateFormParam[0]}
          />
        </Card.Body>
        <Card.Footer>
          <Card.Page
            totalRecords={totalRecords}
            recordsPerPage={recordsPerPage}
            pageNo={pageNo}
            updateApi={updateApi}
          />
        </Card.Footer>
      </Card.Layout>
    </Container>
  );
};
export default AppLov;

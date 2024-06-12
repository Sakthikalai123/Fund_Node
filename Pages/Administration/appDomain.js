import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainTable from "../Table/table";
import ActionBar from "./Common/actionBar";
import * as Card from "../../CommonFunctions/commonComponent";
import SearchForm from "../searchForm";
import { appDomain } from "../../Service/apiVariable";

const AppDomain = () => {
  const commonData = useSelector((state) => state.commonData);
  const administrationData = useSelector((state) => state.administrationData);
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const domainKeyList = administrationData.domainKeyList;
  /*  console.log(participant) */

  const updateFormData = [
    {
      id: "domainKey",
      name: "Domain Key",
      type: "select",
      required:true,
      value: domainKeyList,
    },
    { id: "description", name: "Description", type: "text", required:true },
  ];

  const tableData = [
    { id: "active", name: "Action", type: "edit", width: "50px" },
    { id: "id", name: "Id", type: "text" /* , value:domainKeyList */ },
    { id: "domainKey", name: "Domain Key", type: "text" },
    { id: "description", name: "Description", type: "text" },
    { id: "createdDate", name: "Created Date", type: "text" },
    { id: "updatedDate", name: "Updated Date", type: "text" },
  ];
  const searchFields = [
    {
      id: "domainKey",
      name: "Domain Key",
      type: "select",
      value: domainKeyList,
    },
    {
      id: "description",
      name: "Description",
      type: "text",
      value: null,
    },
  ];

  const updateFormParam = ["id", "active"];

  const initialApi = [
    { ...appDomain.search },
    { ...appDomain.getDomainKeyList },
  ];
  const updateApi = { ...appDomain };
  const availableSortColumn = [];
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
          <Card.FormLayout label={2}>
            <Card.Title title={"Application Domain"}></Card.Title>
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
            name="Application Domain"
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
export default AppDomain;

import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainTable from "../Table/table";
import ActionBar from "./Common/actionBar";
import * as Card from "../../CommonFunctions/commonComponent";
import SearchForm from "../searchForm";
import { appConfig } from "../../Service/apiVariable";

const AppConfig = () => {
  const commonData = useSelector((state) => state.commonData);
  const administrationData = useSelector((state) => state.administrationData);
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const keyList = administrationData.keyList; /*  console.log(participant) */

  const updateFormData = [
    { id: "key", name: "Key", type: "select", required:true, value: keyList },
    { id: "value", name: "Value", type: "text", required:true },
  ];
  const tableData = [
    { id: "active", name: "Action", type: "edit", width: "50px" },
    { id: "id", name: "Id", type: "text" },
    { id: "key", name: "Key", type: "text" },
    { id: "value", name: "Value", type: "text" },
  ];
  const searchFields = [
    {
      id: "key",
      name: "Key",
      type: "select",
      value: keyList,
    },
    {
      id: "value",
      name: "Value",
      type: "text",
      value: null,
    },
  ];
  const updateFormParam = ["id", "active"];
  const initialApi = [{ ...appConfig.search }, { ...appConfig.getKeyList }];
  const updateApi = { ...appConfig };
  const availableSortColumn = ["key"];
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
            <Card.Title title={"Application Configuration"}></Card.Title>
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
            name="Application Configuration"
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
export default AppConfig;

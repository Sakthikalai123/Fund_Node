import { Fragment } from "react";
import { Container } from "react-bootstrap";
import MainTable from "../Table/table";
import * as Card from "../../CommonFunctions/commonComponent";
import { startDay, today } from "../../CommonFunctions/commonFunction";
import { useSelector } from "react-redux";
import SearchForm from "../searchForm";
import { distributorOutbound } from "../../Service/apiVariable";

const DbOutbound = () => {
  const distributorData = useSelector((state) => state.distributorData);
  const commonData = useSelector((state) => state.commonData);
  const distributorOutboundList = distributorData.distributorOutboundList;
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const sortData = { sortColumn: null, sortOrder: null };
  const availableSortColumn = ["participantShortName", "fileName"];

  const tableData = [
    {
      name: "File Name",
      id: "fileName",
      type: "link",
      arg: "fileId",
      link: "ui/distributoroutbound/search/downloadoutbound/",
    },
    { name: "Part. Short Name", id: "participantShortName", type: "text" },
    { name: "Part. Group", id: "participantGroup", type: "text" },
    { name: "File Id", id: "fileId", type: "text" },
    { name: "File Path", id: "filePath", type: "text" },
    { name: "Distributor Code", id: "distributorCode", type: "text" },
    { name: "Status", id: "status", type: "status", arg: "errorText" },
    { name: "Created Date", id: "createdDate", type: "createdDate" },
    { name: "Updated Date", id: "updatedDate", type: "updatedDate" },
    /* {  name: "Part. Status",     id: "participantStatus",type:"status",arg:"participantErrorText" },    */
  ];

  const searchFields = [
    {
      id: "participantShortName",
      name: "Participant",
      type: "select",
      value: distributorOutboundList,
    },
    { id: "fileName", name: "File Name", type: "text", value: null },
    {
      id: null,
      name: "File Date",
      type: "date",
      subName: [
        { id: "fileStartDate", value: startDay() },
        { id: "fileEndDate", value: today() },
      ],
    },
  ];
  /*   const initialApi=[{method:"post",name:"getDisInboundData"},
  {method:"get",name:"getDistributorList"}]  */
  const initialApi = [
    { ...distributorOutbound.search },
    { ...distributorOutbound.getDistributorOutboundList },
  ];
  const updateApi = { ...distributorOutbound };
  return (
    <Fragment>
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
              <Card.Title title={"Distributor Outbound Search"}></Card.Title>
              <SearchForm
                searchFields={searchFields}
                initialApi={initialApi}
                sortData={sortData}
              ></SearchForm>
            </Card.FormLayout>
          </Card.Header>
          <Card.ActionBar></Card.ActionBar>
          <Card.Body>
            <MainTable
              tableData={tableData}
              updateApi={updateApi}
              sortData={sortData}
              availableSortColumn={availableSortColumn}
            ></MainTable>
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
    </Fragment>
  );
};
export default DbOutbound;

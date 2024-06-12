import { Fragment } from "react";
import { Container } from "react-bootstrap";
import MainTable from "../Table/table";
import * as Card from "../../CommonFunctions/commonComponent";
import { startDay, today } from "../../CommonFunctions/commonFunction";
import { useSelector } from "react-redux";
import SearchForm from "../searchForm";
import { agentBankOutbound } from "../../Service/apiVariable";

const AbOutbound = () => {
  const agentBankData = useSelector((state) => state.agentBankData);
  const commonData = useSelector((state) => state.commonData);
  const agentBankOutboundList = agentBankData.agentBankOutboundList;
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const sortData = { sortColumn: null, sortOrder: null };
  const availableSortColumn = [
    "fileProcessedDate",
    "batchStatus",
    "batchDate",
    "participantShortName",
    "participantCode",
    "fileName",
    "fileStatus",
    "ackFileName",
    "ackFileStatus",
  ];

  /*  errorText
  : 
  null
  */

  const tableData = [
    { name: "Part. Short Name", id: "participantShortName", type: "text" },
    { name: "Part. Group", id: "participantGroup", type: "text" },
    { name: "Agent Code", id: "agentCode", type: "text" },
    { name: "File Id", id: "fileId", type: "text" },
    {
      name: "File Name",
      id: "fileName",
      type: "link",
      arg: "fileId",
      link: `ui/agentbankoutbound/search/downloadoutbound/`,
    },
    { name: "Status", id: "status", type: "status", arg: "errorText" },
    { name: "File Path", id: "filePath", type: "text" },
    { name: "Created Date", id: "createdDate", type: "text" },
    { name: "Updated Date", id: "updatedDate", type: "text" },
  ];
  const searchFields = [
    {
      id: "participantShortName",
      name: "Participant",
      type: "select",
      value: agentBankOutboundList,
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
    {
      id: null,
      name: "Processed Date",
      type: "date",
      subName: [
        { id: "batchStartDate", value: startDay() },
        { id: "batchEndDate", value: today() },
      ],
    },
  ];

  const initialApi = [
    { ...agentBankOutbound.search },
    { ...agentBankOutbound.getAgentBankList },
  ];
  const updateApi = { ...agentBankOutbound };
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
              <Card.Title title={"AgentBank Outbound Search"}></Card.Title>
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
export default AbOutbound;

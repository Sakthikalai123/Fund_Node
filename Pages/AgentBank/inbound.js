import { Fragment } from "react";
import { Container } from "react-bootstrap";
import MainTable from "../Table/table";
import * as Card from "../../CommonFunctions/commonComponent";
import { startDay, today } from "../../CommonFunctions/commonFunction";
import { useSelector } from "react-redux";
import SearchForm from "../searchForm";
import { agentBankInbound } from "../../Service/apiVariable";
import ActionbarToggler from "../actionbarToggler";

const AbInbound = () => {
  const agentBankData = useSelector((state) => state.agentBankData);
  const commonData = useSelector((state) => state.commonData);
  const agentBankList = agentBankData.agentBankList;
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const sortData = { sortColumn: "fileProcessedDate", sortOrder: "desc" };
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

  const tableData = [
    { name: "Processed Date", id: "fileProcessedDate", type: "text" },
    {
      name: "File Name",
      id: "fileName",
      type: "link",
      arg: "fileProcessId",
      link: `ui/agentbank/search/downloadinbound/`,
    },
    {
      name: "File Status",
      id: "fileStatus",
      type: "status",
      arg: "fileErrorText",
    },
    {
      name: "Record Stats",
      id: ["recordsTotalCount", "recordsSuccessCount", "recordsFailedCount"],
      type: "stats",
    },
    {
      name: "Ack File Name",
      id: "ackFileName",
      type: "link",
      arg: "fileProcessId",
      link: `ui/agentbank/search/downloadack/`,
    },
    {
      name: "Ack Status",
      id: "ackFileStatus",
      type: "status",
      arg: "fileErrorTextAck",
    },
    { name: "File Date", id: "fileDate", type: "text" },
    { name: "File Process Id", id: "fileProcessId", type: "text" },
    { name: "Part. Short Name", id: "participantShortName", type: "text" },
    { name: "Part. Code", id: "participantCode", type: "text" },
    {
      name: "Part. Status",
      id: "participantStatus",
      type: "status",
      arg: "participantErrorText",
    },
    {
      name: "File. Stats",
      id: ["fileTotalCount", "fileSuccessCount", "fileFailedCount"],
      type: "stats",
    },
    { name: "Part. Id", id: "participantProcessId", type: "text" },
    { name: "Batch Status", id: "batchStatus", type:"status" ,arg:null },//added arg to display highlighted status. },
    {
      name: "Part. Stats",
      id: [
        "participantTotalCount",
        "participantSuccessCount",
        "participantFailedCount",
      ],
      type: "stats",
    },
    { name: "Batch Date", id: "batchDate", type: "text" },
    { name: "Batch ID", id: "batchProcessId", type: "text" },
  ];
  const searchFields = [
    {
      id: "participantShortName",
      name: "Participant",
      type: "select",
      value: agentBankList,
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
    /*   {
      id: "excludeEmptyBatch",     
      type: null,     
    }, */
  ];

  const initialApi = [
    { ...agentBankInbound.search },
    { ...agentBankInbound.getAgentBankList },
  ];
  const updateApi = { ...agentBankInbound };
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
              <Card.Title title={"AgentBank Inbound Search"}></Card.Title>
              <SearchForm
                searchFields={searchFields}
                initialApi={initialApi}
                sortData={sortData}
                name="inbound"
              ></SearchForm>
            </Card.FormLayout>
          </Card.Header>
          <Card.ActionBar>
            <ActionbarToggler api={agentBankInbound.search}></ActionbarToggler>
          </Card.ActionBar>
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
export default AbInbound;

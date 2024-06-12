import { Fragment } from "react";
import { Container } from "react-bootstrap";
import MainTable from "../Table/table";
import * as Card from "../../CommonFunctions/commonComponent";
import { startDay, today } from "../../CommonFunctions/commonFunction";
import { useSelector } from "react-redux";
import SearchForm from "../searchForm";
import { distributorAcknowledgement } from "../../Service/apiVariable";

const DbAcknowledgement = () => {
  const distributorData = useSelector((state) => state.distributorData);
  const commonData = useSelector((state) => state.commonData);
  const distributorAckList = distributorData.distributorAckList;
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const sortData = { sortColumn: null, sortOrder: null };

  const availableSortColumn = [
    "participantShortName",
    "participantCode",
    "ackFileName",
    "ackFileStatus",
    "ackStatusDate",
  ];
  const tableData = [
    {
      name: "Ack. File Name",
      id: "ackFileName",
      type: "link",
      arg: "fileProcessId",
      link: "ui/distributor/search/downloadack/",
    },
    {
      name: "Ack. Status",
      id: "ackFileStatus",
      type: "status",
      arg: "fileErrorTextAck",
    },
    { name: "File Process Id", id: "fileProcessId", type: "text" },
    { name: "Job Config. Id", id: "jobConfigId", type: "text" },
    { name: "Part. Short Name", id: "participantShortName", type: "text" },
    { name: "Part. Code", id: "participantCode", type: "text" },
    { name: "Ack. Status Date", id: "ackStatusDate", type: "text" },
  ];

  const searchFields = [
    {
      id: "participantShortName",
      name: "Participant",
      type: "select",
      value: distributorAckList,
    },
    { id: "ackFileName", name: "File Name", type: "text", value: null },
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

  const initialApi = [
    { ...distributorAcknowledgement.search },
    { ...distributorAcknowledgement.getDistributorAckList },
  ];
  const updateApi = { ...distributorAcknowledgement };
  return (
    <Fragment>
         {commonData.isUpdating && (
        <Card.Response
          status={commonData.response.status}
          message={commonData.response.message}
        ></Card.Response>
      )}
      <Container fluid>
        <Card.Layout>
          <Card.Header>
            <Card.FormLayout label={4}>
              <Card.Title
                title={"Distributor Acknowledgement Search"}
              ></Card.Title>
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
export default DbAcknowledgement;

import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ActionBar from "./Common/actionBar";
import MainTable from "../Table/table";
import * as Card from "../../CommonFunctions/commonComponent";
import SearchForm from "../searchForm";
import { participant } from "../../Service/apiVariable";

const ParticipantBoarding = () => {
  const commonData = useSelector((state) => state.commonData);
  const administrationData = useSelector((state) => state.administrationData);
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const participantGroup =
    administrationData.participantGroup; /* .map((item)=>({label:item, value:item})) */
  const participantSubGroup =
    administrationData.participantSubGroup; /* .map((item)=>({label:item, value:item})) */
  const timeZone = administrationData.timeZone;
  const searchFields = [
    {
      id: "participantGroup",
      name: "Group",
      type: "select",
      value: participantGroup,
    },
    {
      id: "participantShortName",
      name: "Short Name",
      type: "text",
      value: null,
    },
  ];

  const updateFormData = [
    {
      id: "participantGroup",
      name: "Group",
      type: "select",
      required:true,
      value: participantGroup,      
    },
    {
      id: "participantSubGroup",
      name: "Subgroup",
      type: "select",
      required:true,
      value: participantSubGroup,
    },
    { id: "participantCode", name: "Code", type: "text", required:true, value: null },
    {
      id: "participantShortName",
      name: "Short Name",
      type: "text",
      required:true,
      value: null,
    },
    { id: "participantLongName", name: "Long Name", type: "text",required:true, value: null },
    { id: "timeZone", name: "Time Zone", type: "select",required:true, value: timeZone },
    {
      id: "zeroPadding",
      name: "Zero Padding",
      type: "radio",
      required:true,
      value: [
        { label: "Yes", id: "true", value: true },
        { label: "No", id: "false", value: false },
      ],
    },
  ];
  const tableData = [
    { id: "active", name: "Action", type: "edit",width:"auto" },
    { id: "participantId", name: "Id", type: "text" },
    { id: "participantGroup", name: "Group", type: "text" },
    { id: "participantSubGroup", name: "Subgroup", type: "text" },
    { id: "participantCode", name: "Code", type: "text" },
    { id: "participantShortName", name: "Short Name", type: "text" },
    { id: "participantLongName", name: "Long Name", type: "text" },
    { id: "timeZone", name: "Time Zone", type: "text", alignment: "center" },
    {
      id: "zeroPadding",
      name: "Zero Padding",
      type: "text",
      alignment: "center",
    },
    { id: "createdDate", name: "Created Date", type: "text" },
    { id: "updatedDate", name: "Updated Date", type: "text" },
  ];

  const updateFormParam = ["participantId", "active"];
  const initialApi = [
    { ...participant.search },
    { ...participant.getParticipantGroup },
    { ...participant.getParticipantSubGroup },
    { ...participant.getTimeZone },
  ];

  const updateApi = { ...participant };
  const sortData = { sortColumn: null, sortOrder: null };
  const availableSortColumn = ["participantGroup", "participantShortName"];
  /*  console.log("participant") */
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
            <Card.Title title={"Participant Boarding"}></Card.Title>
            <SearchForm
              searchFields={searchFields}
              initialApi={initialApi}
              sortData={sortData}
            ></SearchForm>
          </Card.FormLayout>
        </Card.Header>
        <Card.ActionBar>
          <ActionBar
            name="Participant"
            updateFormData={updateFormData}
            updateApi={updateApi}
            updateFormParam={updateFormParam}
            updateFormLayout={null}
          />
        </Card.ActionBar>
        <Card.Body>
          <MainTable
            tableData={tableData}
            sortData={sortData}
            availableSortColumn={availableSortColumn}
            updateApi={updateApi}
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
export default ParticipantBoarding;

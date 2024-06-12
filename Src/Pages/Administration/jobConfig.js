import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MainTable from "../Table/table";
import ActionBar from "./Common/actionBar";
import * as Card from "../../CommonFunctions/commonComponent";
import SearchForm from "../searchForm";
import { jobConfig } from "../../Service/apiVariable";

const JobConfig = () => {
  const commonData = useSelector((state) => state.commonData);
  const administrationData = useSelector((state) => state.administrationData);
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const participantGroup = administrationData.participantGroup;
  const boundType = administrationData.boundType;
  const jobConfigType = administrationData.jobConfigType;
  const specType = administrationData.specType;
  const connectionType = administrationData.connectionType;
  const participant = administrationData.participantList.map((item) => {
    return { key: Object.keys(item)[0], value: Object.values(item)[0] };
  });
  const updateFormLayout = [
    { title: "Basic Details", fields: 10, start: 0, end: 9 },
    { title: "SFTP", fields: 8, start: 10, end: 17 },
    { title: "Security", fields: 4, start: 18, end: 20 },
  ];
  const updateFormData = [
    /* {id:"participantGroup",     name: "Group",type:"select",value:participantGroup }, */
    {
      id: "participantId",
      name: "Participant",
      type: "map",
      required:true,
      value: participant,
    },
    {
      id: "jobConfigType",
      name: "Config. Type",
      type: "select",
      required:true,
      value: jobConfigType,
    },
    { id: "boundType", name: "Bound Type", type: "select",required:true, value: boundType },
    { id: "specType", name: "Spec Type", type: "select",required:true, value: specType },
    { id: "fileNamePattern", name: "File Name Pattern", type: "text", required:true },
    { id: "fileNameLength", name: "File Name Length", type: "text", required:true },
    { id: "fileNameExtn", name: "File Name Extn", type: "text", required:true },
    { id: "fileDelimiter", name: "Field Delimiter", type: "text", required:true }, 
    { id: "fileValidationType", name: "File Validation Type", type: "text", required:true },
    {
      id: "connectionType",
      name: "Connection Type",
      type: "select",
      required:true,
      value: connectionType,
    },
    { id: "sftpUser", name: "User", type: "text", required:true },
    { id: "sftpPwd", name: "Pwd", type: "text", required:true },
    { id: "sftpPubKeyPath", name: "PubKey Path", type: "text", required:true },
    { id: "sftpHome", name: "Home", type: "text", required:true },
    { id: "sftpFolder", name: "Folder", type: "text", required:true },
    { id: "sftpServer", name: "Server", type: "text", required:true },
    { id: "sftpPort", name: "Port", type: "text", required:true },
    { id: "localHome", name: "Local Home", type: "text", required:true },
    { id: "encDecType", name: "Enc Dec Type", type: "text", required:true },
    { id: "cryptKeyPath", name: "Crypt Key Path", type: "text", required:true },
    { id: "cryptPassPhrase", name: "Crypt Pass Phrase", type: "text", required:true },
  ];
  const tableData = [
    { id: "active", name: "Action", type: "edit",width:"auto" },
    { id: "jobConfigId", name: "Config. Id", type: "text" },
    { id: "participantId", name: "Part. Id", type: "text" },
    { id: "participantGroup", name: "Group", type: "text" },
    { id: "participantShortName", name: "Short Name", type: "text" },
    { id: "jobConfigType", name: "Config. Type", type: "text" },
    { id: "boundType", name: "Bound Type", type: "text" },
    { id: "specType", name: "Spec Type", type: "text" },
    { id: "fileNamePattern", name: "File Name Pattern", type: "text" },
    { id: "fileNameLength", name: "File Name Length", type: "text" },
    { id: "fileNameExtn", name: "File Name Extn", type: "text" },
    { id: "fileDelimiter", name: "Field Delimiter", type: "text" },
    { id: "fileValidationType", name: "File Validation Type", type: "text" },
    { id: "connectionType", name: "Connection Type", type: "text" },
    { id: "sftpUser", name: "SFTP User", type: "text" },
    { id: "sftpPwd", name: "SFTP Pwd", type: "text" },
    { id: "sftpPubKeyPath", name: "SFTP PubKey Path", type: "text" },
    { id: "sftpHome", name: "SFTP Home", type: "text" },
    { id: "sftpFolder", name: "SFTP Folder", type: "text" },
    { id: "sftpServer", name: "SFTP Server", type: "text" },
    { id: "sftpPort", name: "SFTP Port", type: "text" },
    { id: "encDecType", name: "Enc Dec Type", type: "text" },
    { id: "cryptKeyPath", name: "Crypt Key Path", type: "text" },
    { id: "cryptPassPhrase", name: "Crypt Pass Phrase", type: "text" },
    { id: "localHome", name: "Local Home", type: "text" },
    { id: "createdDate", name: "Created Date", type: "text" },
    { id: "updatedDate", name: "Updated Date", type: "text" },
  ];

  const searchFields = [
    {
      id: "participantGroup",
      name: "Group",
      type: "select",
      value: participantGroup,
    },
    {
      id: "participantShortName",
      name: "Participant",
      type: "map",
      value: participant,
    },
    {
      id: "jobConfigType",
      name: "Config Type",
      type: "select",
      value: jobConfigType,
    },
    { id: "boundType", name: "Bound Type", type: "select", value: boundType },
  ];
  const updateFormParam = ["jobConfigId", "active"];

  const initialApi = [
    { ...jobConfig.search },
    { ...jobConfig.getParticipantList },
    { ...jobConfig.getParticipantGroup },
    { ...jobConfig.getSpecType },
    { ...jobConfig.getBoundType },
    { ...jobConfig.getConnectionType },
    { ...jobConfig.getJobConfigType },
  ];
  const updateApi = { ...jobConfig };
  const availableSortColumn = [
    "participantId",
    "participantGroup",
    "jobConfigType",
    "boundType",
  ];
  const sortData = { sortColumn: null, sortOrder: null };

  useEffect(() => {
    localStorage.setItem("jobConfigData", JSON.stringify(commonData.records));
  }, [commonData.records]);
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
            <Card.Title title={"Job Configuration"}></Card.Title>
            <SearchForm
              searchFields={searchFields}
              initialApi={initialApi}
              sortData={sortData}
            ></SearchForm>
          </Card.FormLayout>
        </Card.Header>
        <Card.ActionBar>
          <ActionBar
            name="Job Configuration"
            updateFormData={updateFormData}
            updateApi={updateApi}
            updateFormParam={updateFormParam}
            updateFormLayout={updateFormLayout}
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
export default JobConfig;

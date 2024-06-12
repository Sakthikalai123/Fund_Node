import { Fragment } from 'react'
import { useSelector } from 'react-redux';
import MainTable from '../../../Table/table';
import * as Card from '../../../../CommonFunctions/commonComponent';
import { startDay, today } from '../../../../CommonFunctions/commonFunction';
import SearchForm from '../../../searchForm';
import {dbFileInfo} from '../../../../Service/apiVariable';
import MenuBar from '../../Common/orderPageMenu';
import { Container } from 'react-bootstrap';

const FileInfo = ()=>{
    const commonData = useSelector((state) => state.commonData);  
    const distributorData = useSelector((state) => state.distributorData);    
    const distributorList = distributorData.distributorInboundList; 
    const totalRecords = commonData.records.totalRecords;
    const recordsPerPage = commonData.pageSize;
    const pageNo = commonData.pageNumber;
   
    const searchFields = [
      {
        id: "participantShortName",
        name: "Participant",
        type: "select",
        value: distributorList,
      },
      {
        id: 'fileName',
        name: 'File name',
        type: 'text',
        value: null,
      },  
      {
        id: null,
        name: "Date",
        type: "date",
        subName: [
          { id: "startDate", value: startDay() },
          { id: "endDate", value: today() },
        ],
      },
    ];
 
    const tableData = [
      { id: 'fileName', name: 'File Name', type: 'text' },
      { id: 'fileStatus', name: 'Status', type: 'status' },
      { id: 'submittedDate', name: 'Submission Date', type: 'text' },
      { id: 'processedDate', name: 'Processed Date', type: 'text' },
    ];
  
    const initialApi = [
      { ...dbFileInfo.search },
      {...dbFileInfo.getDistributorList}      
    ];
  
    const updateApi = { ...dbFileInfo};
    const sortData = { sortColumn: null, sortOrder: null };
    const availableSortColumn = [];
    /*  console.log('participant') */
    return (
    <Fragment>  
      <Container fluid>
      <Card.Layout> 
        <MenuBar/>   
          <Card.Header>
            <Card.FormLayout> 
              <Card.Title title={"File Search"}></Card.Title>             
              <SearchForm
                searchFields={searchFields}
                initialApi={initialApi}
                sortData={sortData}
              ></SearchForm>
            </Card.FormLayout>
          </Card.Header>  
          <br/>              
          <Card.Body>
            <MainTable
              tableData={tableData}
              sortData={sortData}
              availableSortColumn={availableSortColumn}
              updateApi={updateApi}              
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
     </Fragment>
    );
}

export default FileInfo
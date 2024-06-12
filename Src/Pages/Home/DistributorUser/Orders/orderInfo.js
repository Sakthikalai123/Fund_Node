import { Fragment } from "react";
import { useSelector } from "react-redux";
import MainTable from "../../../Table/table";
import * as Card from "../../../../CommonFunctions/commonComponent";
import { startDay, today } from "../../../../CommonFunctions/commonFunction";
import SearchForm from "../../../searchForm";
import { dbOrderInfo } from "../../../../Service/apiVariable";
import MenuBar from "../../Common/orderPageMenu";
import { Container } from "react-bootstrap";

const OrderInfo = () => {
  const commonData = useSelector((state) => state.commonData);
  const totalRecords = commonData.records.totalRecords;
  const recordsPerPage = commonData.pageSize;
  const pageNo = commonData.pageNumber;
  const sortData = { sortColumn: null, sortOrder: null };
  const availableSortColumn = [];

  const tableData = [
    { id: "orderId", name: "Order Id", type: "text" },
    { id: "investorId", name: "Investor Id", type: "text" },
    { id: "fileName", name: "File Name", type: "text" },
    { id: "accountType", name: "Invesment Type", type: "text" },
    { id: "submittedDate", name: "Submission Date", type: "text" },
    { id: "status", name: "Status", type: "text" },
    { id: "processedDate", name: "Processed Date", type: "text" },
  ];
  const searchFields = [    
    {
      id: "orderId",
      name: "Order Id",
      type: "text",
      value: null,
    },
    {
      id: "investorId",
      name: "Investor Id",
      type: "text",
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

  const initialApi = [{ ...dbOrderInfo.search }];
  const updateApi = { ...dbOrderInfo };
  return (
    <Fragment>
      <Container fluid>
        <Card.Layout>
          <MenuBar />
          <Card.Header>
            <Card.FormLayout>
              <Card.Title title={"Order Search"}></Card.Title>
              <SearchForm
                searchFields={searchFields}
                initialApi={initialApi}
                sortData={sortData}
                name="clientViewOrderInfo"
              ></SearchForm>
            </Card.FormLayout>
          </Card.Header>
          <br />
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
};
export default OrderInfo;

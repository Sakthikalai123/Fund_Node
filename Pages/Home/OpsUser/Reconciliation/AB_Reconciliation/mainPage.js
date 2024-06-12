import { Fragment, useMemo } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SearchForm from "../../../../searchForm";
import * as Card from "../../../../../CommonFunctions/commonComponent";
import {
  today,
  useCustomLocation,
} from "../../../../../CommonFunctions/commonFunction";
import { MainMenu, SubMenu } from "../../../Common/reconciliationPageMenu";
import { abReconProcess } from "../../../../../Service/apiVariable";
import { Outlet } from "react-router-dom";

const ABProcess = () => {
  const { isReconInitialPage } = useCustomLocation();
  const { distributorList } = useSelector((state) => state.reconciliationData);
  /*  window.onbeforeunload = (()=>"Are you Sure ?"); */
  const searchFields = useMemo(
    () => [
      {
        id: "participantShortName",
        name: "Distributor",
        type: "reconSelect",
        value: distributorList,
        page: "recon",
      },
      {
        id: "reconciliationDate",
        name: "Date",
        type: "reconDate",
        value: today(),
      },
    ],
    [distributorList]
  );
  const initialApi = useMemo(
    () => [
      { ...abReconProcess.getDistributorList }, // This will be at top / Because this API will call at the time of search page mount
      { ...abReconProcess.getAgentBankList },
      { ...abReconProcess.orderSearch },
      { ...abReconProcess.amountSearch },
      { ...abReconProcess.investorSearch },
      { ...abReconProcess.fundingSearch },
      { ...abReconProcess.reportSearch },
      { ...abReconProcess.validationSearch },
    ],
    []
  );
  return (
    <Fragment>
      <Container fluid>
        <Card.Layout>
          <MainMenu />
          <Card.FormLayout>
            <Card.Title title={"Reconciliation Search"}></Card.Title>
            <SearchForm
              searchFields={searchFields}
              initialApi={initialApi}
              /*  sortData={sortData} */
            ></SearchForm>
          </Card.FormLayout>
          {!isReconInitialPage ? (
            <Fragment>
              <Card.ActionBar>
                <SubMenu />
              </Card.ActionBar>
              <Card.Body>
                <Outlet />
              </Card.Body>
            </Fragment>
          ) : (
            <Card.Frame>
              <span>
                Start your investigation by selecting any one of the distributor
                in the list.
              </span>
            </Card.Frame>
          )}
        </Card.Layout>
      </Container>
    </Fragment>
  );
};
export default ABProcess;

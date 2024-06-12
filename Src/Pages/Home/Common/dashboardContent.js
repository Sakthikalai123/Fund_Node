import { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  CustomButton,
  DateSelector,
  NoRecordFound,
  ReloadMsg,
} from "../../../CommonFunctions/commonComponent";
import { apiCall, commonActions, homeActions } from "../../../Redux/action";
import {
  startDay,
  today,
  previousDay,
  useCustomLocation,
} from "../../../CommonFunctions/commonFunction";
import classes from "./dashboard.module.css";
import ConsolidatedStatsModal from "./consolidatedStatsModal";

const CommonDashboard = (props) => {
  const { user, data, apiList, pointsToPlot } = props;
  const dispatch = useDispatch();
  const [showCustomDateOption, setShowCustomDateOption] = useState(false);
  const [pageName, setPageName] = useState("DB Dashboard");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const { isClientView } = useCustomLocation();
  const [dateRange, setDateRange] = useState({
    startDate: startDay(),
    endDate: today(),
  });
  const [modalContent, setModalContent] = useState({
    show: false,
    title: null,
  });
  const commonData = useSelector((state) => state.commonData);
  const { participantName } = useCustomLocation();
  /*  let isValid = (Object.keys(subFiledata).length >0 && Object.keys(redFiledata).length >0 )  */
  const isOpsUser = user === "ops";
  let barChartClassName = `${
    participantName === "UOBKH"
      ? classes.uobkhPartBarChart
      : classes.otherPartBarChart
  }`;
  const togglePageHandler = (name) => {
    setPageName(name);
  };
  const updateDateHandler = (option) => {
    if (option !== "Custom Date") {
      switch (option) {
        case "Today":
          setDateRange({ startDate: today(), endDate: today() });
          break;
        case "Yesterday":
          setDateRange({ startDate: previousDay(), endDate: previousDay() });
          break;
        case "Last 7 Days":
          setDateRange({ startDate: startDay(), endDate: today() });
          break;
        default:
          setDateRange({ startDate: startDay(), endDate: today() });
      }
      setShowCustomDateOption(false);
      setCustomStartDate(null);
      setCustomEndDate(null);
    } else {
      setShowCustomDateOption(true);
    }
  };
  /*  console.log(showCustomDateOption) */
  const closeModal = () => {
    setModalContent({ show: false, data: null, title: null });
  };
  useEffect(() => {
    const transType = [null, "P", "S", "P", "S"];
    const isSwitchTrans = [null, "N", "N", "Y", "Y"];
    const callApi = async () => {
      dispatch(commonActions.refresh());
      dispatch(homeActions.refresh());
      dispatch(commonActions.setLoading(true));      
      let index = 0;
      for (let apiData of apiList) {
        let requestData;
        if (isOpsUser) {
          requestData = {
            ...dateRange,
            transactionType: transType[index],
            switchTransaction: isSwitchTrans[index],
          };
        } else {
          requestData = {
            ...dateRange,
            transactionType: transType[index],
            switchTransaction: isSwitchTrans[index],
            participantShortName: participantName,
          };
        }
        await dispatch(
          apiCall({
            ...apiData,
            requestData: requestData,
          })
        );
        index++;
      }
      dispatch(commonActions.setLoading(false));
    };
    callApi();
  }, [dateRange]);
  useEffect(() => {
    if (customStartDate !== null && customEndDate !== null) {
      setDateRange({ startDate: customStartDate, endDate: customEndDate });
    }
  }, [customStartDate, customEndDate]);
  const date = (
    <div
      className={`${
        isOpsUser ? classes.opsDateFilter : classes.clientDateFilter
      }`}
    >
      <div className="d-flex align-items-center">
        <span className={classes.dateTitle}>Filter by Date &nbsp;</span>
        <Form.Select
          size="sm"
          className={classes.dateDropdown}
          defaultValue="Last 7 Days"
          onChange={(event) => {
            updateDateHandler(event.target.value);
          }}
        >
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Custom Date">Custom Dates</option>
        </Form.Select>
      </div>
      {showCustomDateOption && (
        <div
          className={`${
            isOpsUser
              ? classes.opsCustomDateSelector
              : classes.clientCustomDateSelector
          }`}
        >
          <div className="d-flex align-items-center">
            <span className={`${classes.dateTitle} px-2`}>From</span>
            <DateSelector
              placement="auto"
              onChange={(event) =>
                setCustomStartDate(moment(event).format("YYYYMMDD"))
              }
            />
          </div>
          <div className="d-flex align-items-center">
            <span className={`${classes.dateTitle} px-2`}>To</span>
            <DateSelector
              placement="autoVerticalEnd"
              onChange={(event) =>
                setCustomEndDate(moment(event).format("YYYYMMDD"))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
  return (
    <Fragment>
      {!commonData.isError ? (
        <>
          <Container fluid className={classes.container}>
            {isOpsUser ? (
              <div className={classes.opsNavBar}>
                <ButtonGroup size="sm">
                  <CustomButton
                    variant="light"
                    className={`${
                      pageName === "DB Dashboard" ? "text-light bgColor_1" : ""
                    }`}
                    onClick={() => togglePageHandler("DB Dashboard")}
                  >
                    DB Dashboard
                  </CustomButton>
                  <span style={{ cursor: "not-allowed" }}>
                    <CustomButton
                      disabled={true}
                      style={{ pointerEvents: "none" }}
                      variant="light"
                      className={`${
                        pageName === "AB Dashboard"
                          ? "text-light bgColor_1"
                          : ""
                      }`}
                      onClick={() => togglePageHandler("AB Dashboard")}
                    >
                      AB Dashboard
                    </CustomButton>
                  </span>
                </ButtonGroup>
                {date}
              </div>
            ) : (
              <div className={classes.clientDateSelectorLayout}>{date}</div>
            )}
            <div>
              {pointsToPlot &&
                data.map((data, index) => {
                  return (
                    <section key={index}>
                      <div className={classes.title}>{data.title}</div>
                      <Row>
                        {data.content.map((item, index) => {
                          return (
                            <Col
                              key={index}
                              sm={6}
                              lg={6}
                              className={`${
                                isClientView
                                  ? classes.clientCol
                                  : classes.opsCol
                              }`}
                            >
                              {item.type === "pieChart" && (
                                <div className={`${classes.pieChart}`}>
                                  <Pie
                                    data={item.data}
                                    options={item.options}
                                    className="chart"
                                  />
                                </div>
                              )}
                              {item.type === "barChart" && (
                                <div className={`${barChartClassName}`}>
                                  {item.isShow ? (
                                    <Bar
                                      data={item.data}
                                      options={item.options}
                                      className="chart"
                                    />
                                  ) : (
                                    <div
                                      className="text-center"
                                      style={{ fontWeight: 500 }}
                                    >
                                      <div className="p-2">{item.name}</div>
                                      <div className="text-danger my-4">
                                        No data found
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {item.type === "annotation" && (
                                <div className={classes.annotation}>
                                  <div className="d-flex">
                                    <div>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={`${classes.totalIndicator}`}
                                        />
                                        <span>Total</span>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={`${classes.successIndicator}`}
                                        />
                                        <span>Success</span>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={`${classes.inprogressIndicator}`}
                                        />
                                        <span>InProgress</span>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={`${classes.failedIndicator}`}
                                        />
                                        <span>Failed</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-3">
                                    <span
                                      className={classes.link}
                                      onClick={() =>
                                        setModalContent({
                                          show: true,
                                          title: data.title,
                                        })
                                      }
                                    >
                                      view consolidated statistics
                                    </span>
                                  </div>
                                </div>
                              )}
                            </Col>
                          );
                        })}
                      </Row>
                    </section>
                  );
                })}
              {!pointsToPlot && !commonData.isLoading && (
                <NoRecordFound page="dashboard" />
              )}
            </div>
          </Container>
          {modalContent.show && (
            <ConsolidatedStatsModal
              user={user}
              closeModal={closeModal}
              title={modalContent.title}
            />
          )}
        </>
      ) : (
        <ReloadMsg />
      )}
    </Fragment>
  );
};
export default CommonDashboard;

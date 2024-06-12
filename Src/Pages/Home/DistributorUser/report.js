import { useState, useEffect } from "react";
import {
  useCustomLocation,
  startDay,
  today,
  previousDay,
} from "../../../CommonFunctions/commonFunction";
import { Title, ReloadMsg } from "../../../CommonFunctions/commonComponent";
import { Container, Form, Table } from "react-bootstrap";
import { DateSelector } from "../../../CommonFunctions/commonComponent";
import moment from "moment";
import classes_1 from "./report.module.css";
import classes_2 from "../Common/dashboard.module.css";
import { apiCall } from "../../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { dBDashboard } from "../../../Service/apiVariable";

const Dashboard = () => {
  const { report } = useSelector((state) => state.homeData);
  const { isLoading, isError } = useSelector((state) => state.commonData);
  const finalReport = report?.Distributor_Summary;
  const [dateRange, setDateRange] = useState({
    startDate: today(),
    endDate: today(),
  });
  const [dateOptionName, setDateOptionName] = useState("SingleDate");
  const [showCustomDateOption, setShowCustomDateOption] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const { participantName } = useCustomLocation();
  const dispatch = useDispatch();
  const updateDateHandler = (option) => {
    if (option !== "Custom Date") {
      switch (option) {
        case "Today":
          setDateOptionName("SingleDate");
          setDateRange({ startDate: today(), endDate: today() });
          break;
        case "Yesterday":
          setDateOptionName("SingleDate");
          setDateRange({ startDate: previousDay(), endDate: previousDay() });
          break;
        case "Last 7 Days":
          setDateOptionName("MultipleDate");
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
  const date = (
    <div className={classes_2.clientDateFilter}>
      <div className="d-flex align-items-center">
        <span className={classes_2.dateTitle}>Filter by Date &nbsp;</span>
        <Form.Select
          size="sm"
          className={classes_2.dateDropdown}
          defaultValue="Today"
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
        <div className={`${classes_2.clientCustomDateSelector}`}>
          <div className="d-flex align-items-center">
            <span className={`${classes_2.dateTitle} px-2`}>From</span>
            <DateSelector
              placement="auto"
              onChange={(event) =>
                setCustomStartDate(moment(event).format("YYYYMMDD"))
              }
            />
          </div>
          <div className="d-flex align-items-center">
            <span className={`${classes_2.dateTitle} px-2`}>To</span>
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
  const tableDate = (
    <div>
      <span className={classes_1.dateText}>Date&nbsp;:&nbsp;</span>
      <span className={classes_1.date}>
        {dateOptionName === "SingleDate"
          ? moment(dateRange.startDate).format("MMM DD, YYYY")
          : `${moment(dateRange.startDate).format("MMM DD, YYYY")} - ${moment(
              dateRange.endDate
            ).format("MMM DD, YYYY")}`}
      </span>
    </div>
  );
  const tableContent = [
    { id: "Total_Files", name: "Total no of files" },
    { id: "Total_Orders", name: "Total no of orders" },
    { id: "TA_Closed_Orders", name: "Total no of orders closed (TA)" },
    { id: "TA_Open_Orders", name: "Total no of orders open (TA)" },
    { id: "AB_Approved_Orders", name: "Total no of orders closed (AB)" },
    { id: "AB_Rejected_Orders", name: "Total no of orders rejected (AB)" },
  ];
  const getValue = (value) => {
    if (value !== undefined) {
      return value;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    const api = async () => {
      let requestData = {
        ...dateRange,
        participantShortName: participantName,
      };
      await dispatch(
        apiCall({ ...dBDashboard.getReport, requestData: requestData })
      );
    };
    api();
  }, [dateRange]);
  useEffect(() => {
    if (customStartDate !== null && customEndDate !== null) {
      setDateOptionName("MultipleDate");
      setDateRange({ startDate: customStartDate, endDate: customEndDate });
    }
  }, [customStartDate, customEndDate]);
  return (
    <>
      <Container fluid>
        <div className="my-2">
          <Title title={`${participantName} - Summary Report`} />
        </div>
        <div>{date}</div>
        {!isError && (
          <div className={classes_1.body}>
            <Table striped bordered className={classes_1.table}>
              <thead>
                <tr className={classes_1.dateRow}>
                  <th colSpan={4}>{tableDate}</th>
                </tr>
                <tr className={classes_1.head}>
                  <th></th>
                  <th>Cash(ORD)</th>
                  <th>Collection</th>
                  <th>Refund</th>
                </tr>
              </thead>
              <tbody className={isLoading ? classes_1.tableBody : ""}>
                {tableContent.map((data, index) => (
                  <tr key={index}>
                    <td className={classes_1.title}>{data.name}</td>
                    <td className={classes_1.value}>
                      {getValue(finalReport?.[data.id]?.Cash)}
                    </td>
                    <td className={classes_1.value}>
                      {getValue(finalReport?.[data.id]?.Collection)}
                    </td>
                    <td className={classes_1.value}>
                      {getValue(finalReport?.[data.id]?.Refund)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {isError && <ReloadMsg />}
      </Container>
    </>
  );
};
export default Dashboard;

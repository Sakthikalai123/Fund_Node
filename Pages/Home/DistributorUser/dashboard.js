import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as Options from "../Common/chartOptions";
import CommonDashboard from "../Common/dashboardContent";
import { dBDashboard } from "../../../Service/apiVariable";

const DBDashboard = () => {
  const dashboardData = useSelector((state) => state.homeData); 
  const { pathname } = useLocation();
  const {
    getFileStats,
    getSubscriptionOrderStats,
    getRedemptionOrderStats,
    getSwitchSubscriptionOrderStats,
    getSwitchRedemptionOrderStats,
  } = dBDashboard;
  const {
    fileStats,
    subscription,
    redemption,
    switchSubscription,
    switchRedemption,
    showFileChart,
    showSubChart,
    showRedChart,
    showSwitchSubChart,
    showSwitchRedChart,
  } = dashboardData;
  const apiList = [
    { ...getFileStats },
    { ...getSubscriptionOrderStats },
    { ...getRedemptionOrderStats },
    { ...getSwitchSubscriptionOrderStats },
    { ...getSwitchRedemptionOrderStats },
    /*  {...getSwitchStats} */
  ];
  const emptyCheckData = [
    fileStats,
    subscription,
    redemption,
    switchSubscription,
    switchRedemption,
  ];
  const isAllChartHasValue = emptyCheckData.every(
    (data) => Object.keys(data)?.length > 0
  );
  const pointsToPlot = isAllChartHasValue && showFileChart;
  const uobkhData = [
    {
      title: "File Statistics",
      content: [
        {
          type: "pieChart",
          name: "fileStats",
          data: fileStats,
          options: Options.pieChartFileOption,
          isShow: showSubChart,
        },
        {
          type: "annotation",
          name: "annotation",
        },
      ],
    },
    {
      title: "Order Statistics",
      content: [
        {
          type: "barChart",
          name: "Subscription",
          data: subscription,
          options: Options.subscriptionOption,
          isShow: showSubChart,
        },
        {
          type: "barChart",
          name: "Redemption",
          data: redemption,
          options: Options.redemptionOption,
          isShow: showRedChart,
        },
      ],
    },
  ];
  const otherPartData = [
    {
      title: "File Statistics",
      content: [
        {
          type: "pieChart",
          name: "fileStats",
          data: fileStats,
          options: Options.pieChartFileOption,
          isShow: showSubChart,
        },
        {
          type: "annotation",
          name: "annotation",
        },
      ],
    },
    {
      title: "Order Statistics",
      content: [
        {
          type: "barChart",
          name: "Subscription",
          data: subscription,
          options: Options.subscriptionOption,
          isShow: showSubChart,
        },
        {
          type: "barChart",
          name: "Redemption",
          data: redemption,
          options: Options.redemptionOption,
          isShow: showRedChart,
        },
        {
          type: "barChart",
          name: "Switch Subscription",
          data: switchSubscription,
          options: Options.switchSubscriptionOption,
          isShow: showSwitchSubChart,
        },
        {
          type: "barChart",
          name: "Switch Redemption",
          data: switchRedemption,
          options: Options.switchRedemptionOption,
          isShow: showSwitchRedChart,
        },
      ],
    },
  ];
  const clientName = pathname.split("/")[2];
  const data = clientName === "uobkh" ? uobkhData : otherPartData;

  return (
    <Fragment>      
        <CommonDashboard
          data={data}
          apiList={apiList}
          pointsToPlot={pointsToPlot}
          user={"client"}
        />     
    </Fragment>
  );
};
export default DBDashboard;

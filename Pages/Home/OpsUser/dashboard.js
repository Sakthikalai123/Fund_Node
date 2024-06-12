import { Fragment} from "react";
import { useSelector } from "react-redux";
import * as Options from "../Common/chartOptions";
import CommonDashboard from "../Common/dashboardContent";
import { opsDBDashboard } from "../../../Service/apiVariable";

const OpsDBDashboard = () => {
  const dashboardData = useSelector((state) => state.homeData);
  const {
    getFileStats,
    getSubscriptionOrderStats,
    getRedemptionOrderStats,
    getSwitchSubscriptionOrderStats,
    getSwitchRedemptionOrderStats,
  } = opsDBDashboard;
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
  const data = [
    {
      title: "File Statistics",
      content: [
        {
          type: "barChart",
          name: "fileStats",
          data: fileStats,
          options: Options.barChartFileOption,
          isShow: showFileChart,
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
  return (
    <Fragment>       
        <CommonDashboard
          data={data}
          apiList={apiList}
          pointsToPlot={pointsToPlot}
          user={"ops"}
        />     
    </Fragment>
  );
};
export default OpsDBDashboard;

import { createSlice } from '@reduxjs/toolkit';

const status = ['Total', 'Success', 'InProgress', 'Failed'];
const bgColor = [
  'rgb(94, 176, 247)',
  'rgb(144, 238, 144)',
  'rgb(252, 244, 3)',
  'rgb(245, 93, 81)',
];
let initialState = {  
  fileStats: {},
  subscription: {},
  redemption: {},
  switchSubscription: {},
  switchRedemption: {},
  modalSubStats: [] /* this state is for order status modal */,
  modalRedStats: [],
  modalSwitchSubStats: [],
  modalSwitchRedStats: [],
  modalFileStats: [],
  showFileChart: false,
  showSubChart: false,
  showRedChart: false,
  showSwitchSubChart: false,
  showSwitchRedChart: false,
  report:{} // only for client dashboard
};
const dashboardSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    refresh: (state) => {
      return { ...initialState };
    },
    /* For Ops user */
    setOverallParticipantFileStats: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getFileStats(action.payload);
      state.fileStats = { labels: label, datasets: dataset };
      state.modalFileStats = action.payload;
      state.showFileChart = hasOrderToDisplay;
    },
    /* For client User */
    setIndividualParticipantFileStats: (state, action) => {
      const response = action.payload;
      const label = ['Success', 'InProgress', 'Failed'];
      const data = label.map((data, index) => response.File_Stats?.[data]);
      const dataset = [
        {
          data: data,
          backgroundColor: bgColor.slice(1),
        },
      ];
      const hasOrderToDisplay = data?.some((value) => value > 0);
      state.fileStats = { labels: label, datasets: dataset };
      state.modalFileStats = action.payload;
      state.showFileChart = hasOrderToDisplay;
    },
    setSubscriptionStatsForClient: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.subscription = { labels: label, datasets: dataset };
      state.modalSubStats = action.payload;
      state.showSubChart = hasOrderToDisplay;
    },
    setRedemptionStatsForClient: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.redemption = { labels: label, datasets: dataset };
      state.modalRedStats = action.payload;
      state.showRedChart = hasOrderToDisplay;
    },
    setSwitchSubscriptionStatsForClient: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.switchSubscription = { labels: label, datasets: dataset };
      state.modalSwitchSubStats = action.payload;
      state.showSwitchSubChart = hasOrderToDisplay;
    },
    setSwitchRedemptionStatsForClient: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.switchRedemption = { labels: label, datasets: dataset };
      state.modalSwitchRedStats = action.payload;
      state.showSwitchRedChart = hasOrderToDisplay;
    },
    /* Ops Data */
    setSubscriptionStatsForOps: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.subscription = { labels: label, datasets: dataset };
      state.modalSubStats = action.payload;
      state.showSubChart = hasOrderToDisplay;
    },
    setRedemptionStatsForOps: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.redemption = { labels: label, datasets: dataset };
      state.modalRedStats = action.payload;
      state.showRedChart = hasOrderToDisplay;
    },
    setSwitchSubscriptionStatsForOps: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.switchSubscription = { labels: label, datasets: dataset };
      state.modalSwitchSubStats = action.payload;
      state.showSwitchSubChart = hasOrderToDisplay;
    },
    setSwitchRedemptionStatsForOps: (state, action) => {
      let { label, dataset, hasOrderToDisplay } = getOrderStats(action.payload);
      state.switchRedemption = { labels: label, datasets: dataset };
      state.modalSwitchRedStats = action.payload;
      state.showSwitchRedChart = hasOrderToDisplay;
    },
    setReport:(state,action)=>{
      state.report = action.payload;
    }
  },
});

const getStats = (props) => {
  const labelType = ['Distributor_Name', 'Transaction_Type'];
  let validLabelType, hasOrderToDisplay;
  labelType.forEach((label) => {
    Object.keys(props)?.forEach((labelFromDatabase) => {
      if (label === labelFromDatabase) {
        validLabelType = label;
      }
    });
  });
  try {
    hasOrderToDisplay = props?.[validLabelType]?.some(
      (participant, partIndex) => {
        return status.some((item, labelIndex) => {
          let value = props?.[item]?.[partIndex];
          return value > 0;
        });
      }
    );
  } catch (error) {
    throw new Error(error);
  }
  const label = props?.[validLabelType]?.map((data, index) => {
    if (data === 'CASH-INDIVIDUAL') {
      return 'Cash-Ind';
    } else if (data === 'CASH-OMNIBUS') {
      return 'Cash-Omni';
    } else return data;
  });
  const dataset = status.map((data, index) => {
    return {
      label: data,
      data: props?.[data],
      backgroundColor: bgColor[index],
    };
  });
  return { label, dataset, hasOrderToDisplay };
};
const getOrderStats = (props) => {
  let orderStats = props?.Record_Stats;
  return getStats(orderStats);
};
const getFileStats = (props) => {
  let fileStats = props?.File_Stats;
  return getStats(fileStats);
};


export default dashboardSlice;

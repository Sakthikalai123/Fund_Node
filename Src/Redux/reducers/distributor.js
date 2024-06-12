import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  distributorInboundList: [],
  distributorOutboundList: [],
  distributorAckList: [],
  fdltData:[]
};
const distributorSlice = createSlice({
  name: "distributor",
  initialState: initialState,
  reducers: {
    setDistributorInboundList: (state, action) => {
      state.distributorInboundList = action.payload;
    },
    setDistributorOutboundList: (state, action) => {
      state.distributorOutboundList = action.payload;
    },
    setDistributorAckList: (state, action) => {
      state.distributorAckList = action.payload;
    },
    setFdltData: (state, action) => { 
      state.fdltData = action.payload.data;
     
    },
  },
});

export default distributorSlice;

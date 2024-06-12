import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  agentBankList: [],
  agentBankAckList: [],
  agentBankOutboundList: [],
};
const agentBankSlice = createSlice({
  name: "agentBank",
  initialState: initialState,
  reducers: {
    setAgentBankList: (state, action) => {
      state.agentBankList = action.payload;
    },
    setAgentBankOutboundList: (state, action) => {
      state.agentBankOutboundList = action.payload;
    },
    setAgentBankAckList: (state, action) => {
      state.agentBankAckList = action.payload;
    },
  },
});
export default agentBankSlice;

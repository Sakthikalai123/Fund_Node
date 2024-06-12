import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  participantList: [],
  boundType: [],
  specType: [],
  jobConfigType: [],
  connectionType: [],
  isEditStatus: false,
  participantGroup: [],
  participantSubGroup: [],
  timeZone: [],
  domainList: [],
  domainKeyList: [],
  keyList: [],

  /*  modalData:{type:null,isOpen:false},  */
};

const administrationSlice = createSlice({
  name: "administration",
  initialState: initialState,
  reducers: {
    refresh: (state) => {
      return { ...initialState };
    },
    /*    refreshModal:(state)=>{ state.modalData=initialState.modalData},  
   openStatusModal:(state)=>{state.isEditStatus=true},
   closeStatusModal:(state)=>{state.isEditStatus=false}, */
    setParticipantGroup: (state, action) => {
      state.participantGroup = action.payload;
    },
    setParticipantSubGroup: (state, action) => {
      state.participantSubGroup = action.payload;
    },
    setDomainList: (state, action) => {
      state.domainList = action.payload;
    },
    setDomainKeyList: (state, action) => {
      state.domainKeyList = action.payload;
    },
    setKeyList: (state, action) => {
      state.keyList = action.payload;
    },
    setParticipantList: (state, action) => {
      state.participantList = action.payload;
    },
    setBoundType: (state, action) => {
      state.boundType = action.payload;
    },
    setSpecType: (state, action) => {
      state.specType = action.payload;
    },
    setJobConfigType: (state, action) => {
      state.jobConfigType = action.payload;
    },
    setConnectionType: (state, action) => {
      state.connectionType = action.payload;
    },
    setTimeZone: (state, action) => {
      state.timeZone = action.payload;
    },
  },
});

export default administrationSlice;

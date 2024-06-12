import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  recordToModify: null,
  statusModalIsOpen: false,
  modalMsg:null,// added for upload modal msg
  formModalData: { type: null, isOpen: false },
  sftpValidationStatus: null,
  sftpModalIsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    refreshModal: (state) => {
      return { ...initialState };
    },
    setFormModal: (state, action) => {
      state.formModalData = action.payload;
    },
    openStatusModal: (state,action) => {
      state.modalMsg = action.payload;  // added for upload modal msg
      state.statusModalIsOpen = true;
    },
    closeStatusModal: (state) => {
      state.statusModalIsOpen = false;
      state.recordToModify = null;
      state.modalMsg = null;      // added for upload modal msg
    },

    setRecordToModify: (state, action) => {
      const result = action.payload.data;
      state.recordToModify = result;
    },
    setSftpValidationStatus: (state, action) => {
      state.sftpValidationStatus = action.payload;
    },
    openSftpModal: (state) => {
      state.sftpModalIsOpen = true;
    },
    closeSftpModal: (state) => {
      state.sftpModalIsOpen = false;
    },
  },
});

export default modalSlice;

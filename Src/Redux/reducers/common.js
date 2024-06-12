import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  records: { totalRecords: 0, data: [] },
  response: { message: null, status: null },
  isLoading: false,
  isUpdating: false,
  isError: false,
  isInitial: true,
  searchData: {},
  sortData: { sortColumn: null, sortOrder: null },
  pageSize: 10,
  pageNumber: 1,
  getRequestData: {},
};
const commonSlice = createSlice({
  name: "commonData",

  initialState: initialState,
  reducers: {
    refresh: (state) => {
      return { ...initialState };
    },   
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUpdating: (state, action) => {      
        state.isUpdating = action.payload;
    },
    setResponse: (state, action) => {    
      state.response = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
    setInitial: (state, action) => {
      state.isInitial = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = { ...action.payload };
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setRecords: (state, action) => {      
      state.records = action.payload;
    },
    setSortDate: (state, action) => {
      state.sortData = { ...action.payload };
    },
    setGetRequestData: (state,action) => {
      /* This conditional check is for reconciliation page */      
      if(action.payload){        
        state.getRequestData = {        
          ...state.searchData,         
        };
      }
      else {
      state.getRequestData = {
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        ...state.searchData,
        ...state.sortData,
      };      
    }    
    },
  },
});
export default commonSlice;

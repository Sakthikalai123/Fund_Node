import { createSlice, current } from "@reduxjs/toolkit";
let initialState = {
  records: [],
  section: null,
  defaultValue: null,
  selectedRecords: [],
  newRecords: [],
  sectionList: [],
  conditionTypeList: [],
  lovDomainList: [],
  lovTypeList: [],
  dataTypeList: [],
  recordsToUpdate: [],
  isAlertModalOpen: false,
  isDirty: false,
};

const jobFieldMapSlice = createSlice({
  name: "jobFieldMap",
  initialState: initialState,
  reducers: {
    refresh: (state) => {
      return { ...initialState };
    },
    setIsDirty: (state, action) => {
      state.isDirty = action.payload;
    },
    refreshCrudRecord: (state, action) => {
      if (action.payload.type === "update") {
        state.recordsToUpdate = initialState.recordsToUpdate;
      } else {
        state.selectedRecords = initialState.selectedRecords;
      }
    },

    setDefaultValue: (state, action) => {
      state.defaultValue = action.payload;
    },
    openAlertModal: (state, action) => {
      state.isAlertModalOpen = true;
    },
    closeAlertModal: (state, action) => {
      state.isAlertModalOpen = false;
    },
    setRecords: (state, action) => {
      state.records = action.payload;
    },
    setSectionList: (state, action) => {
      state.sectionList = action.payload;
    },
    setConditionTypeList: (state, action) => {
      state.conditionTypeList = action.payload;
    },
    setLovDomainList: (state, action) => {
      state.lovDomainList = action.payload;
    },
    setLovTypeList: (state, action) => {
      state.lovTypeList = action.payload;
    },
    setDataTypeList: (state, action) => {
      state.dataTypeList = action.payload;
    },
    updateRecord: (state, action) => {
      /* console.log("update"); */
      const payload = action.payload;
      let newRecord;
      const oldRecordIndex = state.records.findIndex((data) => {
        return data.id === payload.id;
      });
      const updatedRecordIndex = state.recordsToUpdate.findIndex((data) => {
        return data.id === payload.id;
      });
      if (payload.type === "delete") {
        state.recordsToUpdate.splice(updatedRecordIndex, 1);
      } else if (updatedRecordIndex !== -1) {
        newRecord = state.recordsToUpdate[updatedRecordIndex];
        newRecord[payload.name] = payload.value;
        /* console.log({ ...newRecord }); */
        let key = Object.keys(newRecord);
        let validRecord = key.some(
          (key, index) =>
            key !== "id" &&
            key !== "section" &&
            key !== "jobConfigId" &&
            newRecord[key] !== null
        );
        if (validRecord) {
          state.recordsToUpdate.splice(updatedRecordIndex, 1, newRecord);
          state.records.splice(oldRecordIndex, 1, newRecord);
        } else {
          state.recordsToUpdate.splice(updatedRecordIndex, 1);
        }
      } else {
        /*  console.log((state.records[oldRecordIndex][payload.name]===payload.value),state.records[oldRecordIndex][payload.name],payload.value) */
        if (!(state.records[oldRecordIndex][payload.name] === payload.value)) {
          newRecord = state.records[oldRecordIndex];
          newRecord[payload.name] = payload.value;
          state.recordsToUpdate = state.recordsToUpdate.concat(newRecord);
          state.records[oldRecordIndex][payload.name] = payload.value;
          state.records.splice(oldRecordIndex, 1, newRecord);
          state.isDirty = true;
        }
      }
      /* console.log(state.recordsToUpdate.length); */
    },
    setSelectedRecords: (state, action) => {
      const data = action.payload;
      if (data.type === "add") {
        state.selectedRecords = state.selectedRecords.concat(data.id);
      } else {
        const index = state.selectedRecords.findIndex(
          (item) => item === data.id
        );
        if (index !== -1) {
          state.selectedRecords.splice(index, 1);
        }
      }
    },
    /*   setNewRecords:(state,action)=>{
      state.newRecords= state.newRecords.concat(action.payload);
   }, */
    /*  setRecordsToDelete:(state,action)=>{
      state.recordsToDelete=state.recordsToDelete.concat(action.payload);
      console.log(state.recordsToDelete)
   } */
  },
});

export default jobFieldMapSlice;

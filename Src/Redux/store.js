import { configureStore} from '@reduxjs/toolkit';
import distributorSlice from './reducers/distributor';
import administrationSlice from './reducers/administration';
import commonSlice from './reducers/common';
import authSlice from './reducers/authentication';
import jobFieldMapSlice from './reducers/jobFiledMap';
import agentBankSlice from './reducers/agentbank';
import profileSlice from './reducers/profile';
import modalSlice from './reducers/modal';
import sidebarSlice from './reducers/sidebar';
import dashboardSlice  from './reducers/Home/dashboard';
import reconciliationSlice from './reducers/Home/reconciliation';

const Store = configureStore({
  reducer: {
    homeData:dashboardSlice.reducer,
    reconciliationData:reconciliationSlice.reducer,
    agentBankData:agentBankSlice.reducer,
    distributorData: distributorSlice.reducer,
    administrationData: administrationSlice.reducer,
    authData: authSlice.reducer,
    commonData:commonSlice.reducer,
    modalData:modalSlice.reducer,
    sidebarData:sidebarSlice.reducer,
    jobFieldMapData:jobFieldMapSlice.reducer,
    profileData:profileSlice.reducer
  },
});
console.log(distributorSlice)
export default Store;
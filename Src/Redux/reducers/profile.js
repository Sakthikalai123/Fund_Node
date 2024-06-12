import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleList: [],
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setRoleList: (state, action) => {
      let roleList = action.payload[0]; // extracting the data.
      let keys = Object.keys(roleList);
      let roles = keys.map((data) => {
        return { [data]: roleList[data] };
      });
      let roleArray = roles.map((item) => {
        return { key: Object.keys(item)[0], value: Object.values(item)[0] };
      });
      state.roleList = roleArray;
    },
  },
});

export default profileSlice;

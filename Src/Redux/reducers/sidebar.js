import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  sidebarIsOpen: false,
  showSidebar: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    setSidebarState: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
    sidebarToggler: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export default sidebarSlice;

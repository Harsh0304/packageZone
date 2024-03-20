import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packageData: [],
    packageDetailData: [],
  },
  reducers: {
    addPackage: (state, action) => {
      state.packageData.push(...action.payload);
    },
    addPackageDetailData: (state, action) => {
      state.packageDetailData.push(action.payload);
    },
    clearPackage: (state) => {
      // Clear existing data
      state.packageData = [];
    },
    clearPackageDetail: (state) => {
      state.packageDetailData = [];
    },
  },
});

export const {
  addPackage,
  clearPackage,
  addPackageDetailData,
  clearPackageDetail,
} = packageSlice.actions;
export default packageSlice.reducer;

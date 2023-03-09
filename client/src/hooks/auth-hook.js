import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "23249714102",
  role: "admin",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;

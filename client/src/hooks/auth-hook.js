import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuth: false,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log("setLogin action:", action.payload.user); // Add a console.log statement to check if the action is being called correctly

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.role = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;

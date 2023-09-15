import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUserName = (state) => {
  if (state.user) {
    return state.user.name;
  }
  return null;
};

export const selectUserEmail = (state) => {
  if (state.user) {
    return state.user.email;
  }
  return null;
};

export const selectUserPhoto = (state) => {
  if (state.user) {
    return state.user.photo;
  }
  return null;
};

export default userSlice.reducer;

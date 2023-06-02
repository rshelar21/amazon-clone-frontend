import { createSlice, } from "@reduxjs/toolkit";
import type { RootState } from '../app/store'

interface userState {
    email: string,
    name: string,
    id : string,
}

const initialState : userState = {
  email: "",
  name: "",
  id : ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser: (state, action) => {
      state.name = "";
      state.email = "";
      state.id = "";
    },
  },
});

export const { createUser, removeUser } = userSlice.actions;

export const selectUser = (state : RootState) => state.user;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { addMenuThunk } from "../Thunks/MenuApi";

const initialState = {
  status: "initails menu api status",
  message: "",
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addMenuItem: (state, action) => {
      state.menu.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMenuThunk.fulfilled, (state, action) => {
      console.log("Sub slice", action.payload);
      state.status = "success";
    });
    builder.addCase(addMenuThunk.rejected, (state, action) => {
      // add show Error toast here
    });
  },
});

export const { defaultReducer, addMenuItem } = menuSlice.actions;

export default menuSlice.reducer;

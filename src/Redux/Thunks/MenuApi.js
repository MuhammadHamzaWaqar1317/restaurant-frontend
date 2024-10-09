import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMenu } from "../../Api/Endpoints/ApiEndpoints";

export const addMenuThunk = createAsyncThunk(
  "addMenuThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addMenu(body);
      console.log(res);

      return { res, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
        abc: "abc",
      });
    }
  }
);

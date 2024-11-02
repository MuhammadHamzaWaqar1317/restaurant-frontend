import { createSlice } from "@reduxjs/toolkit";
import {
  addOrderThunk,
  getOrdersThunk,
  updateOrderStatusThunk,
} from "../Thunks/OrderApi";

import {
  showError,
  showPending,
  showSuccess,
  removePending,
} from "../../Components/Toaster/Toaster";

const initialState = {
  status: "initails menu api status",
  message: "",
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addOrder: (state, action) => {
      state.orders?.push(action.payload);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      state.orders = state.orders?.map((orders) =>
        orders?._id == orderId ? { ...orders, status } : orders
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload.data?.reverse();
    });

    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      console.log(action.payload);

      showError(action.payload?.message);
    });
    builder.addCase(addOrderThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(addOrderThunk.pending, (state, action) => {
      showPending("Submitting Data ");
    });

    builder.addCase(addOrderThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(updateOrderStatusThunk.pending, (state, action) => {
      showPending("Updating Status ");
    });

    builder.addCase(updateOrderStatusThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
  },
});

export const { defaultReducer, addOrder, updateOrderStatus } =
  orderSlice.actions;

export default orderSlice.reducer;

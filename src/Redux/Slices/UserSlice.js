import { createSlice } from "@reduxjs/toolkit";
import {
  signInThunk,
  signUpThunk,
  getUserInfoThunk,
  forgetPasswordThunk,
  verifyOtpThunk,
  createNewPasswordThunk,
} from "../Thunks/UserApi";
import {
  showError,
  showPending,
  showSuccess,
  removePending,
} from "../../Components/Toaster/Toaster";

const initialState = {
  status: "initails menu api status",
  message: "",
  socketId: "",
  _id: "",
  cart: [],
  address: "",
  userInfo: {},
  notifications: [
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at  has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "order",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
  ],
  unreadNotificationsCounter: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    setSocketId: (state, action) => {
      state.socketId = action.payload.socketId;
    },

    logout: (state, action) => {
      const { navigate } = action.payload;
      localStorage.setItem("token", "");
      navigate("/");
    },

    addToCart: (state, action) => {
      const index = state.cart?.findIndex(
        (item) => item._id == action.payload._id
      );

      if (index == -1) {
        state.cart?.push({
          ...action.payload,
          qty: 1,
          // total: action.payload.price,
        });
      } else {
        state.cart[index].qty += 1;
        // state.cart[index].total =
        //   state.cart[index].qty * state.cart[index].price;
      }
    },

    decrementQty: (state, action) => {
      const index = state.cart?.findIndex(
        (item) => item._id == action.payload._id
      );
      console.log(state.cart[index].qty);

      if (state.cart[index].qty == 1) {
        state.cart = state.cart?.filter(({ _id }) => _id != action.payload._id);
      } else {
        state.cart[index].qty -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart?.filter(({ _id }) => _id != action.payload._id);
    },

    emptyCart: (state, action) => {
      state.cart = [];
    },

    addNotification: (state, action) => {
      state.notifications?.unshift(action.payload);
      state.unreadNotificationsCounter += 1;
    },
    readAllNotifications: (state, action) => {
      state.unreadNotificationsCounter = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      const { navigate, authToken } = action.payload;
      localStorage.setItem("token", authToken);
      removePending();
      navigate("/admin");
    });

    builder.addCase(signUpThunk.pending, (state, action) => {
      showPending("Creating Account");
    });

    builder.addCase(signUpThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      const { navigate, authToken } = action.payload;
      localStorage.setItem("token", authToken);
      removePending();
      navigate("/admin");
    });

    builder.addCase(signInThunk.pending, (state, action) => {
      showPending("Validating Credentials");
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.address = action.payload?.data?.address;
      state.userInfo = action.payload?.data;
    });

    builder.addCase(getUserInfoThunk.rejected, (state, action) => {
      // add show Error toast here
    });

    builder.addCase(forgetPasswordThunk.fulfilled, (state, action) => {
      const { message, navigate, email } = action.payload;
      // console.log(action.payload.message);
      localStorage.setItem("verified_email", email);
      removePending();
      showSuccess(message);
      navigate("/enterOtp");
    });
    builder.addCase(forgetPasswordThunk.pending, (state, action) => {
      showPending("Sending OTP");
    });
    builder.addCase(forgetPasswordThunk.rejected, (state, action) => {
      // add show Error toast here
      removePending();
      showError(action.payload.message);
    });

    builder.addCase(verifyOtpThunk.fulfilled, (state, action) => {
      const { message, navigate, passwordResetToken } = action.payload;
      console.log(passwordResetToken);

      localStorage.setItem("token", passwordResetToken);
      removePending();
      showSuccess(message);
      navigate("/createNewPassword");
    });
    builder.addCase(verifyOtpThunk.pending, (state, action) => {
      showPending("Verifying OTP");
    });
    builder.addCase(verifyOtpThunk.rejected, (state, action) => {
      // add show Error toast here
      removePending();
      showError(action.payload.message);
    });

    builder.addCase(createNewPasswordThunk.fulfilled, (state, action) => {
      const { message, navigate } = action.payload;

      localStorage.setItem("token", "");
      localStorage.setItem("verified_email", "");
      removePending();
      showSuccess(message);
      navigate("/login");
    });

    builder.addCase(createNewPasswordThunk.pending, (state, action) => {
      showPending("Creating New Password");
    });

    builder.addCase(createNewPasswordThunk.rejected, (state, action) => {
      // add show Error toast here
      removePending();
      showError(action.payload.message);
    });
  },
});

export const {
  setSocketId,
  addToCart,
  decrementQty,
  removeFromCart,
  emptyCart,
  addNotification,
  readAllNotifications,
  logout,
} = userSlice.actions;

export default userSlice.reducer;

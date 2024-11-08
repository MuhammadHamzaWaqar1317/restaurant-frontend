import {
  addReservation,
  updateReservation,
  deleteReservation,
} from "../../Redux/Slices/ReservationSlice";
import { setSocketId, addNotification } from "../../Redux/Slices/UserSlice";
import { getUserId } from "../../Utils/getUserId";
import { notificationIcon } from "../../constants/constant";

import { roles } from "../../constants/constant";

export const insertReservation = (message, dispatch) => {
  const { role, _id } = getUserId();
  const { date } = message;

  if (role == roles.admin) {
    dispatch(addReservation(message));
    dispatch(
      addNotification({
        icon: notificationIcon.reservation,
        message: `A new Reservation has been made at ${date}`,
      })
    );
  } else if (_id == message.customerId) {
    dispatch(addReservation(message));
  }
};

export const editReservation = (message, dispatch) => {
  const { date } = message;
  const { role, _id } = getUserId();

  if (_id == message.customerId) {
    dispatch(updateReservation(message));
    dispatch(
      addNotification({
        icon: notificationIcon.reservation,
        message: `Reservation at ${date} has been updated `,
      })
    );
  } else if (role == roles.admin) {
    dispatch(updateReservation(message));
    dispatch(
      addNotification({
        icon: notificationIcon.reservation,
        message: `Reservation at ${date} has been updated `,
      })
    );
  }
};

export const removeReservation = (message, dispatch) => {
  const { role, _id } = getUserId();

  if (role == "admin") {
    dispatch(deleteReservation(message));
    dispatch(
      addNotification({
        icon: notificationIcon.reservation,
        message: `Your Reservation at ${message.date} has been deleted `,
      })
    );
  } else if (_id == message.customerId) {
    dispatch(deleteReservation(message));
    dispatch(
      addNotification({
        icon: notificationIcon.reservation,
        message: `Your Reservation at ${message.date} has been deleted `,
      })
    );
  }
};

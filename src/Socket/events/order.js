import { addOrder, updateOrderStatus } from "../../Redux/Slices/OrderSlice";
import { setSocketId, addNotification } from "../../Redux/Slices/UserSlice";
import { getUserId } from "../../Utils/getUserId";
import { roles } from "../../constants/constant";
import { notificationIcon } from "../../constants/constant";

export const insertOrder = (message, dispatch) => {
  const { role, _id } = getUserId();

  if (role == roles.admin) {
    dispatch(addOrder(message));
    dispatch(
      addNotification({
        icon: notificationIcon.order,
        message: `A new Order has been made at ${
          message.createdAt.split("T")[0]
        }`,
      })
    );
  } else if (_id == message.customerId) {
    dispatch(addOrder(message));
  }
};

export const modifyOrderStatus = (message, dispatch) => {
  const { role, _id } = getUserId();

  if (role == roles.admin) {
    dispatch(updateOrderStatus(message));
    dispatch(
      addNotification({
        icon: notificationIcon.order,
        message: `Order ID: ${message.orderId.slice(-5)} status is ${
          message.status
        }`,
      })
    );
  } else if (_id == message.customerId) {
    dispatch(updateOrderStatus(message));
    dispatch(
      addNotification({
        icon: notificationIcon.order,
        message: `Order ID: ${message.orderId.slice(-5)} status is ${
          message.status
        }`,
      })
    );
  }
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import socket from "../src/Socket/socket";
import "./App.css";

import {
  editMenuItem,
  insertMenuItem,
  removeMenuItem,
} from "./Socket/events/menu";

import { updateMenuCategory } from "./Redux/Slices/MenuCategorySlice";

import {
  insertMenuCategory,
  removeMenuCategory,
} from "./Socket/events/menuCategory";

import { editBranch, insertBranch, removeBranch } from "./Socket/events/branch";

import {
  editReservation,
  insertReservation,
  removeReservation,
} from "./Socket/events/reservation";

import { Navigate } from "react-router-dom";
import { insertOrder, modifyOrderStatus } from "./Socket/events/order";

import { socketEvents } from "./constants/constant";
import { setSocketId } from "./Redux/Slices/UserSlice";

function App({ children }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {
    connection,
    sign_up_successfull,
    menu,
    menuCategory,
    reservation,
    order,
    branch,
  } = socketEvents;

  const { menu_item_added, menu_item_updated, menu_item_deleted } = menu;
  const { menu_category_added, menu_category_updated, menu_category_deleted } =
    menuCategory;
  const { branch_added, branch_updated, branch_deleted } = branch;
  const { reservation_added, reservation_deleted, reservation_updated } =
    reservation;
  const { order_added, order_status_update } = order;
  const reservations = useSelector(
    (state) => state.reservationSlice.reservations
  );
  const socketId = useSelector((state) => state.userSlice.socketId);
  console.log("socket events", socketEvents);

  useEffect(() => {
    socket.on(connection, (message) => dispatch(setSocketId(message)));

    socket.on(sign_up_successfull, () => <Navigate to={"/admin"} />);

    socket.on(menu_item_added, (message) => insertMenuItem(message, dispatch));
    socket.on(menu_item_updated, (message) => editMenuItem(message, dispatch));
    socket.on(menu_item_deleted, (message) =>
      removeMenuItem(message, dispatch)
    );

    socket.on(menu_category_added, (message) =>
      insertMenuCategory(message, dispatch)
    );
    socket.on(menu_category_updated, (message) =>
      updateMenuCategory(message, dispatch)
    );
    socket.on(menu_category_deleted, (message) =>
      removeMenuCategory(message, dispatch)
    );

    socket.on(branch_added, (message) => insertBranch(message, dispatch));
    socket.on(branch_updated, (message) => editBranch(message, dispatch));
    socket.on(branch_deleted, (message) => removeBranch(message, dispatch));

    socket.on(reservation_added, (message) =>
      insertReservation(message, dispatch)
    );
    socket.on(reservation_updated, (message) =>
      editReservation(message, dispatch)
    );
    socket.on(reservation_deleted, (message) =>
      removeReservation(message, dispatch)
    );

    socket.on(order_added, (message) => insertOrder(message, dispatch));
    socket.on(order_status_update, (message) =>
      modifyOrderStatus(message, dispatch)
    );

    return () => {
      socket.off(menu_item_added);
      socket.off(menu_item_updated);
      socket.off(menu_item_deleted);
      socket.off(menu_category_added);
      socket.off(menu_category_updated);
      socket.off(menu_category_deleted);
      socket.off(branch_added);
      socket.off(branch_updated);
      socket.off(branch_deleted);
      socket.off(reservation_added);
      socket.off(reservation_updated);
      socket.off(reservation_deleted);
      socket.off(order_added);
      socket.off(order_status_update);
    };
  }, []);
  return (
    <>
      {children} <ToastContainer />
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import { getOrdersThunk } from "../../../Redux/Thunks/OrderApi";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";

function Order() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.orders);
  const branches = useSelector((state) => state.branchSlice.branches);
  const menu = useSelector((state) => state.menuSlice.menu);

  useEffect(() => {
    dispatch(getOrdersThunk());
    dispatch(getBranchThunk());
    dispatch(getMenuThunk());
  }, []);
  return (
    <>
      {orders?.map((orderDetails) => (
        <>
          <Details
            orderDetails={orderDetails}
            branches={branches}
            menu={menu}
          />
          <br />
        </>
      ))}
    </>
  );
}

function Details({ orderDetails, branches, menu }) {
  const {
    order,
    branchId,
    customerName,
    totalBill,
    status,
    type,
    customerAddress,
    _id: orderId,
  } = orderDetails;

  const branchAddress = branches?.find(({ _id }) => _id == branchId);
  //   console.log(address);

  return (
    <>
      <p>Customer Name {customerName}</p>
      {branchAddress && <p>Address: {branchAddress?.address}</p>}
      {type == "Delivery" && <p>Deleivery Address {customerAddress}</p>}
      <p>order ID {orderId.slice(-5)}</p>
      <div>
        Items
        {order?.map((orderItem) => {
          const menuItem = menu[orderItem.category]?.find(
            ({ _id }) => orderItem.itemId == _id
          );
          return (
            <>
              <div>
                {orderItem.qty} x {menuItem?.name}
              </div>
              <div>Price {orderItem.price}</div>
            </>
          );
        })}
      </div>
      <div>Total Bill {totalBill}</div>
      <p>Status {status}</p>

      <p>Type {type}</p>
    </>
  );
}

export default Order;

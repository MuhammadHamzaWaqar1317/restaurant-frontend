import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import { getOrdersThunk } from "../../../Redux/Thunks/OrderApi";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";
import { getUserInfoThunk } from "../../../Redux/Thunks/UserApi";
// CSS
import "./Order.scss";

function Order() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.orders);
  const branches = useSelector((state) => state.branchSlice.branches);
  const menu = useSelector((state) => state.menuSlice.menu);
  const userInfo = useSelector((state) => state.userSlice.userInfo);

  useEffect(() => {
    dispatch(getOrdersThunk());
    dispatch(getBranchThunk());
    dispatch(getMenuThunk());
    dispatch(getUserInfoThunk());
  }, []);
  return (
    <>
      <div className="min-h-[80vh] max-w-[100vw]">
        {/* <div> */}
        <h1 className="Branch_H">Your Order</h1>
        <br />
        {orders?.map((orderDetails) => (
          <div>
            <Details
              orderDetails={orderDetails}
              branches={branches}
              menu={menu}
              userInfo={userInfo}
            />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

function Details({ orderDetails, branches, menu, userInfo }) {
  const {
    order,
    branchId,
    customerName,
    totalBill,
    status,
    type,
    createdAt,
    _id: orderId,
  } = orderDetails;

  const { email = null, contactNum = null, address = null } = userInfo || {};

  const branchAddress = branches?.find(({ _id }) => _id == branchId);
  console.log(branchAddress, "branchAddress");

  return (
    // --- New User Admin Part Design ---
    <div className="Parent_UserOrder_Whole">
      {/* Box */}
      <div className="UserOrder_Box">
        {/* --- Box Part 1 --- */}
        <div className="UserOrder_Box_Part_1">
          <h1>Thank you for your Purchase!</h1>
          <p>
            Status : <span>{status}</span>
          </p>
          <div className="UserOrder_Box_Part1_Box">
            {/* H3 */}
            <h3>Billing Address</h3>
            {/* - Line - */}
            <div className="UserOrder_Box_Part1_Box_L_Parent">
              <p className="UserOrder_Box_Part1_Box_L1">Name :</p>
              <p className="UserOrder_Box_Part1_Box_L2">{customerName}</p>
            </div>
            {/* - Line - */}
            {branchAddress && (
              <div className="UserOrder_Box_Part1_Box_L_Parent">
                <p className="UserOrder_Box_Part1_Box_L1">Branch :</p>
                <p className="UserOrder_Box_Part1_Box_L2">
                  {branchAddress?.address}
                </p>
              </div>
            )}
            {/* - Line - */}
            {type == "Delivery" && (
              <div className="UserOrder_Box_Part1_Box_L_Parent">
                <p className="UserOrder_Box_Part1_Box_L1">Address :</p>
                <p className="UserOrder_Box_Part1_Box_L2">{address}</p>
              </div>
            )}
            {/* - Line - */}
            <div className="UserOrder_Box_Part1_Box_L_Parent">
              <p className="UserOrder_Box_Part1_Box_L1">Phone :</p>
              <p className="UserOrder_Box_Part1_Box_L2">
                {contactNum ?? "0321-7875903"}
              </p>
            </div>
            {/* - Line - */}
            <div className="UserOrder_Box_Part1_Box_L_Parent">
              <p className="UserOrder_Box_Part1_Box_L1">Email :</p>
              <p className="UserOrder_Box_Part1_Box_L2">
                {email ?? "User@gmail.com"}
              </p>
            </div>
          </div>
        </div>
        {/* --- Box Part 2 --- */}
        <div className="UserOrder_Box_Part_2">
          {/* - Paragraph Line - */}
          <p className="UserOrder_Box_Part_2_P"></p>
          <div className="UserOrder_Box_Part_2_Box_Parent">
            <div className="UserOrder_Box_Part_2_Box">
              {/* - Sub Box - */}
              <h1>Order Summary</h1>
              {/* - Sub Box - */}
              <div className="UserOrder_Box_Part_2_Box_Part_1">
                {/* Small Box */}
                <div className="UserOrder_Box_Part_2_Box_Part_1_A">
                  <p>Date</p>
                  <h3>{createdAt.split("T")[0]} </h3>
                </div>
                {/* Small Box */}
                <div className="UserOrder_Box_Part_2_Box_Part_1_A">
                  <p>Order ID</p>
                  <h3>{orderId.slice(-5).toUpperCase()}</h3>
                </div>
                {/* Small Box */}
                <div className="UserOrder_Box_Part_2_Box_Part_1_A">
                  <p>Type</p>
                  <h3>{type}</h3>
                </div>
              </div>
              {/* - Sub Box - */}
              <div className="UserOrder_Box_Part_2_Box_Part_2">
                {/* All Items Small Box */}
                {order?.map((orderItem) => {
                  const menuItem = menu[orderItem?.categoryId]?.find(
                    ({ _id }) => orderItem.itemId == _id
                  );
                  return (
                    <div className="UserOrder_Box_Part_2_Box_Part_2_A">
                      <div className="UserOrder_Box_Part_2_Box_Part_2_A_1">
                        {orderItem.qty} x {menuItem?.name ?? "Zinger"}
                      </div>
                      <div className="UserOrder_Box_Part_2_Box_Part_2_A_2">
                        {orderItem.price}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* - Sub Box - */}
              <div className="UserOrder_Box_Part_2_Box_Part_3">
                <p className="UserOrder_Box_Part_2_Box_Part_3_A">Total Bill</p>
                <p className="UserOrder_Box_Part_2_Box_Part_3_B">{totalBill}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;

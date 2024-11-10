import React, { useState, useEffect } from "react";
import { Button, Table, Descriptions, Select, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import {
  getOrdersThunk,
  updateOrderStatusThunk,
} from "../../../Redux/Thunks/OrderApi";
import { getUserInfoThunk } from "../../../Redux/Thunks/UserApi";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";
import { orderStatus } from "../../../constants/constant";
import to24Hour from "../../../Utils/to24Hour";
// CSS
import "./Orders.scss";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.orders);
  const branches = useSelector((state) => state.branchSlice.branches);
  const menu = useSelector((state) => state.menuSlice.menu);
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const [orderDetailsId, setOrderDetailsId] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    dispatch(getOrdersThunk());
    dispatch(getBranchThunk());
    dispatch(getMenuThunk());
    dispatch(getUserInfoThunk());
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Order ID ",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => record?._id?.slice(-6).toUpperCase(),
    },
    {
      title: "Order Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Bill",
      dataIndex: "totalBill",
      key: "totalBill",
      render: (_, record) => record?.totalBill,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) =>
        `${record?.createdAt.split("T")[0]} at ${to24Hour(
          record?.createdAt.split("T")[1]
        )}`,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setOrderDetailsId(record._id);
            setOpenDrawer(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-[80vh] max-w-[100vw]">
        <h1 className="Branch_H">Orders</h1>
        <br />
        <Table dataSource={orders} columns={columns} />
        <Drawer
          title="My Order"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Details
            setOpenDrawer={setOpenDrawer}
            orderDetails={orders?.find(({ _id }) => orderDetailsId == _id)}
            branches={branches}
            menu={menu}
            userInfo={userInfo}
          />
        </Drawer>
      </div>
    </>
  );
}

function Details({ orderDetails, branches, menu, setOpenDrawer, userInfo }) {
  if (!orderDetails) {
    setOpenDrawer(false);
  }
  const {
    order = null,
    branchId = null,
    customerName = null,
    customerId = null,
    totalBill = null,
    status = null,
    type = null,
    customerAddress = null,
    _id: orderId = null,
  } = orderDetails || {};

  const userDetails = userInfo?.find(({ _id }) => _id == customerId);

  const dispatch = useDispatch();

  const branchAddress = branches?.find(({ _id }) => _id == branchId);

  const handleStatusChange = (status) => {
    console.log(status, orderId);
    dispatch(updateOrderStatusThunk({ status, orderId, customerId }));
  };

  return (
    <>
      {/* --- New Design --- */}
      <div className="Parent_UserOrderCart_Parent">
        {/* Order ID */}
        <div className="UserOrderCart_ID_Parent">
          <p className="UserOrderCart_ID">
            Order Id: <span>{orderId?.slice(-5)}</span>
          </p>
        </div>
        {/* Body */}
        <div className="Parent_UserOrderCart_Parent_Sub">
          {/* Part 1 */}
          <div className="UserOrderCart_1">
            <h1>Customer detail : -</h1>
            {/* - Box - */}
            <div className="UserOrderCart_1_Box">
              <h2>Name :</h2>
              <p>{customerName}</p>
            </div>
            {/* - Box - */}
            {branchAddress && (
              <div className="UserOrderCart_1_Box">
                <h2>Branch Address :</h2>
                <p>
                  <span>{branchAddress?.address}</span>
                </p>
              </div>
            )}
            {/* - Box - */}
            {type == "Delivery" && (
              <div className="UserOrderCart_1_Box">
                <h2>Delivery :</h2>
                <p>
                  <span>{customerAddress}</span>
                </p>
              </div>
            )}
            {/* - Box - */}
            <div className="UserOrderCart_1_Box">
              <h2>Phone :</h2>
              <p>{userDetails?.contactNum}</p>
            </div>
            {/* - Box - */}
            <div className="UserOrderCart_1_Box">
              <h2>Email :</h2>
              <p>{userDetails?.email}</p>
            </div>
          </div>
          {/* Part 2 */}
          <div className="UserOrderCart_2">
            {/* Sub Part 1 */}
            <div className="UserOrderCart_2_Box_1">
              <h4>Items : </h4>
              {/* .Map () */}
              {order?.map((orderItem) => {
                const menuItem = menu[orderItem?.categoryId]?.find(
                  ({ _id }) => orderItem.itemId == _id
                );
                return (
                  <>
                    <div className="UserOrderCart_2_Box_1_Main">
                      <h3>
                        {orderItem?.qty} x {menuItem?.name ?? "Zinger"}
                      </h3>
                      <p>Rs {orderItem?.price}</p>
                    </div>
                  </>
                );
              })}
            </div>
            {/* Sub Part 2 */}
            <div className="UserOrderCart_2_Box_2">
              <p>Total Bill = {totalBill}</p>
            </div>
            {/* Sub Part 3 */}
            <div className="UserOrderCart_2_Box_3">
              <p className="UserOrderCart_2_Box_3_P1">
                Status : <span>{status}</span>
              </p>
              <Select
                defaultValue={status}
                style={{ width: 150, margin: "1em 0em", letterSpacing: "1px" }}
                // className="UserOrderCart_2_Box_3"
                onChange={(value) => handleStatusChange(value)}
                options={[
                  { value: orderStatus.pending, label: orderStatus.pending },
                  {
                    value: orderStatus.prepairing,
                    label: orderStatus.prepairing,
                  },
                  { value: orderStatus.ready, label: orderStatus.ready },
                ]}
              />
              <p>
                Type : <span>{type}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* --- Old Design --- */}
    </>
  );
}

export default Orders;

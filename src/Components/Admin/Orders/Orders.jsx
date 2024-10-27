import React, { useState, useEffect } from "react";
import { Button, Table, Descriptions, Select, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import {
  getOrdersThunk,
  updateOrderStatusThunk,
} from "../../../Redux/Thunks/OrderApi";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";
import to24Hour from "../../../Utils/to24Hour";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.orders);
  const branches = useSelector((state) => state.branchSlice.branches);
  const menu = useSelector((state) => state.menuSlice.menu);
  const [orderDetailsId, setOrderDetailsId] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  console.log(orders);

  useEffect(() => {
    dispatch(getOrdersThunk());
    dispatch(getBranchThunk());
    dispatch(getMenuThunk());
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
      render: (_, record) => record?._id?.slice(-6),
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
      {" "}
      <Table dataSource={orders} columns={columns} />
      <Drawer
        title="My Order"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Details
          orderDetails={orders?.find(({ _id }) => orderDetailsId == _id)}
          branches={branches}
          menu={menu}
        />
      </Drawer>
    </>
  );
}

function Details({ orderDetails, branches, menu }) {
  const {
    order,
    branchId,
    customerName,
    customerId,
    totalBill,
    status,
    type,
    customerAddress,
    _id: orderId,
  } = orderDetails;
  console.log(branches);

  const dispatch = useDispatch();

  const branchAddress = branches?.find(({ _id }) => _id == branchId);
  //   console.log(address);

  const handleStatusChange = (status) => {
    console.log(status, orderId);
    dispatch(updateOrderStatusThunk({ status, orderId, customerId }));
  };

  return (
    <>
      <p>Customer Name {customerName}</p>
      {branchAddress && <p>Address: {branchAddress?.address}</p>}
      {type == "Delivery" && <p>Deleivery Address {customerAddress}</p>}
      <p>order ID {orderId.slice(-5)}</p>
      <div>
        Items
        {order?.map((orderItem) => {
          const menuItem = menu[orderItem?.category]?.find(
            ({ _id }) => orderItem.itemId == _id
          );
          return (
            <>
              <div>
                {orderItem?.qty} x {menuItem?.name}
              </div>
              <div>Price {orderItem?.price}</div>
            </>
          );
        })}
      </div>
      <div>Total Bill {totalBill}</div>
      <p>Status {status}</p>
      <Select
        defaultValue={status}
        style={{ width: 120 }}
        onChange={(value) => handleStatusChange(value)}
        options={[
          { value: "pending", label: "Pending" },
          { value: "prepairing", label: "Prepairing" },
          { value: "ready", label: "Ready" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
      <p>Type {type}</p>
    </>
  );
}

export default Orders;

import React from "react";
import {
  CheckCircleOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
function UserSiderMenu() {
  const navigate = useNavigate();

  const style = {
    backgroundColor: "#e7f0e7",
    color: "#0a4621",
    borderRadius: "5px",
    fontSize: "15px",
    letterSpacing: "1px",
    display: "block",
    margin: "10px auto 0px auto",
    width: "92%",
  };

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="bg-green-950"
        // style={{ backgroundColor: "#0a4621", }}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "Dashboard",
            style: { ...style },
            // Add navigation for "Menu" label
            onClick: () => navigate("/user/UserDash"),
          },
          {
            key: "1",
            icon: <ShoppingOutlined />,
            label: "Order",
            style: { ...style },
            // Add navigation for "Menu" label
            onClick: () => navigate("/user/order"),
          },
          {
            key: "2",
            icon: <CheckCircleOutlined />,
            label: "Reservation",
            style: { ...style },
            // Add navigation for "Menu" label
            onClick: () => navigate("/user/reservation"),
          },
          {
            key: "3",
            icon: <CheckCircleOutlined />,
            label: "Menu",
            style: { ...style },
            // Add navigation for "Menu" label
            onClick: () => navigate("/user/menu"),
          },
        ]}
      />
    </>
  );
}

export default UserSiderMenu;

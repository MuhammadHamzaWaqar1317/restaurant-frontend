import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { Button, Layout as AntdLayout, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
const { Header, Sider, Content } = AntdLayout;

// Import the Branch component
// CSS
// import "./Menu/Menu_Admin.scss";
// import "../Admin/Menu/Menu_Admin.scss";
// Image
import logo from "../../assets/logo.png";

const Layout = ({ Menu }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntdLayout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-green-950"
        // style={{ backgroundColor: "#CBD5E1", }}
      >
        <div className="demo-logo-vertical" />
        {/* - Logo Image -  */}
        <div className="menu_logo">
          <img src={logo} alt="logo" />
        </div>
        {/* - Menu Slider - */}
        <Menu />
      </Sider>
      <AntdLayout>
        <Header
          style={{
            padding: 0,
            // background: "#7aa894",
            background: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "10px",
              width: 64,
              height: 64,
              // backgroundColor: "#7aa894",
              backgroundColor: "white",
              color: "#0a4621",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;

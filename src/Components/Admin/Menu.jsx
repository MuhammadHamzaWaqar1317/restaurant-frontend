import React from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addMenuThunk } from "../../Redux/Thunks/MenuApi";
function Menu() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuSlice.menu);

  const handleFinish = (body) => {
    console.log(body);
    dispatch(addMenuThunk(body));
  };
  console.log(menu);

  return (
    <>
      <div className="h-screen">
        <Form onFinish={handleFinish}>
          <Form.Item name={"name"}>
            <Input></Input>
          </Form.Item>
          <Form.Item name={"category"}>
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">submit</Button>
          </Form.Item>
        </Form>
        <div className="text-3xl">abd</div>
      </div>
    </>
  );
}

export default Menu;

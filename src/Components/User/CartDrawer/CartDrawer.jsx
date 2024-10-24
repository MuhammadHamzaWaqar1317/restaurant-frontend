import React, { useEffect, useState } from "react";
import { Drawer, Button, Form, Radio, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrementQty } from "../../../Redux/Slices/UserSlice";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import { getUserInfoThunk } from "../../../Redux/Thunks/UserApi";
import ModalComponent from "../../ModalComponent/ModalComponent";

import { EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
function CartDrawer({ open, setOpen }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userSlice.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const addItem = (body) => {
    dispatch(addToCart(body));
  };

  const decreaseQty = (body) => {
    dispatch(decrementQty(body));
  };

  const Footer = () => {
    return (
      <>
        <Button onClick={() => setIsModalOpen(true)}>Place Order</Button>
        {cart.length != 0 && (
          <span>
            {cart.reduce(
              (accumulator, { total }) => accumulator + parseInt(total),
              0
            )}
          </span>
        )}
      </>
    );
  };

  const setForm = () => {
    return [{}];
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Drawer
        title="My Order"
        width={520}
        onClose={() => setOpen(false)}
        open={open}
        footer={<Footer />}
      >
        {cart?.map((item) => (
          <>
            <div className="Menu_Item_Box">
              <div className="Menu_Item_Box_Sub">
                <div className="Menu_Item_Box_Sub_Part1">
                  <p className="Menu_Item_P1">{item.name}</p>
                  <span>{item.description}</span>
                  <p className="Menu_Item_P2">PKR {item.priceprice}</p>
                </div>
                <div className="Menu_Item_Box_Sub_Part2">
                  {/* <img src={img} alt={name} /> */}
                </div>
                <div>Price {item.price}</div>
                <div>Qty {item.qty}</div>
                <div>Total Price {item.total}</div>
                <Button onClick={() => addItem(item)}>+</Button>

                <Button onClick={() => decreaseQty(item)}>-</Button>
              </div>
            </div>
            <br />
          </>
        ))}
      </Drawer>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        setForm={setForm}
        FormContent={() => ConfirmOrder(form)}
        handleCancel={handleCancel}
      />
    </>
  );
}

const ConfirmOrder = (form) => {
  const branches = useSelector((state) => state.branchSlice?.branches);

  const address = useSelector((state) => state.userSlice.address);
  const dispatch = useDispatch();
  const [render, setRender] = useState(1);
  const [editAddress, setEditAddress] = useState(true);

  useEffect(() => {
    dispatch(getBranchThunk());
    dispatch(getUserInfoThunk());
    form.setFields([{ name: "address", value: address }]);
  }, []);

  const handleFinish = (body) => {
    console.log(body);
  };

  return (
    <>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item>
          <Radio.Group
            onChange={(e) => setRender(e.target.value)}
            value={render}
          >
            <Radio value={1}>Delivery</Radio>
            <Radio value={2}>Takeaway</Radio>
          </Radio.Group>
        </Form.Item>

        {render == 1 && (
          <Form.Item name={"address"}>
            <Input
              value={address}
              readOnly={editAddress}
              suffix={
                <div onClick={() => setEditAddress(false)}>
                  <EditOutlined />
                </div>
              }
            ></Input>
          </Form.Item>
        )}
        {render == 2 && (
          <Form.Item name={"branchId"}>
            <Select
              placeholder="Select Branch"
              allowClear={true}
              options={branches?.map(({ _id, address }) => ({
                value: _id,
                label: address,
              }))}
            />
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default CartDrawer;

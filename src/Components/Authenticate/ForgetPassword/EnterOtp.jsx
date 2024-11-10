import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  verifyOtpThunk,
  forgetPasswordThunk,
} from "../../../Redux/Thunks/UserApi";
import { useNavigate } from "react-router-dom";
// CSS
import "./ForgetPass.scss";
// Images
import OTP from "../../../assets/OTP.png";

function EnterOtp() {
  const [form] = Form.useForm();
  const verified_email = localStorage.getItem("verified_email");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onChange = (text) => {
    console.log("onChange:", text);
    dispatch(verifyOtpThunk({ otp: text, navigate, email }));
  };
  const sharedProps = {
    onChange,
  };

  useEffect(() => {
    setEmail(verified_email);
  }, []);

  return (
    <>
      {/* --- Old Code --- */}

      {/* --- New Code --- */}
      <div className="Parent_ForgetPass_Whole">
        <div className="Parent_ForgetPass_Whole_Sub">
          {/* Box */}
          <div className="ForgetPass_Box">
            {/* Part 1 */}
            <div className="Forget_Img">
              <img src={OTP} alt="NA" />
            </div>
            {/* Part 2 */}
            <div className="Forget_Heading">
              <h1>Enter OTP</h1>
              <p>An OTP has been sent to {email}</p>
            </div>
            {/* Part 3 */}
            <div className="Forget_MyForm">
              <Form style={{ width: "100%" }} form={form}>
                <Form.Item name={"otp"}>
                  <Input.OTP
                    length={4}
                    style={{ width: "100%" }}
                    formatter={(str) => str.toUpperCase()}
                    {...sharedProps}
                  />
                </Form.Item>
              </Form>
              <Button
                type="link"
                onClick={() => {
                  dispatch(
                    forgetPasswordThunk({ email: verified_email, navigate })
                  );
                  form.resetFields();
                }}
                className="My_Back_Btn"
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterOtp;

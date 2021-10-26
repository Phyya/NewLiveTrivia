import React, { useState, useEffect } from "react";
import { Spinner, Portal } from "./Portal";
import "../App.css";

const OTPView = (props) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [counter, setCounter] = useState(59);
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);

  //Using useEffect so it will run at the start
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    //updating the input with the changed value
    setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);

    //focusing on the next input field
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleModal = () => {
    setModal(false);
  };
  const onboarding = () => {
    const otpJoined = otp.join("");
    if (otpJoined === "" || otp.length === 0) {
      setModal(true);
    } else {
      setSpinner(true);
      setTimeout(() => {
        props.history.push("/profile");
      }, 3000);
    }
  };
  return (
    <div className="otp__flex">
      <div className="otp__container">
        <div className="gray__header"></div>
        <p className="otp__paragraph">
          A 4-digit code has been sent to you via SMS. Please enter it below.
          (Any 4-digit code is allowed for now)
        </p>
        <div className="otp__boxesDiv">
          {otp.map((data, index) => {
            return (
              <input
                key={index}
                className="otp__boxes"
                type="text"
                name="otp"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select}
              />
            );
          })}
          {spinner && <Spinner />}
          {modal && (
            <Portal
              nodisplay={handleModal}
              notification="No code entered. Please try again"
            />
          )}
        </div>
        <span className="otp__span">Resend code in 0:{counter}</span>
        <button className="otp__verify" onClick={onboarding}>
          Verify
        </button>
        <p className="otp__p">Resend OTP </p>
      </div>
    </div>
  );
};

export default OTPView;

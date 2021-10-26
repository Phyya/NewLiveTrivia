import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IonSpinner } from "@ionic/react";
import { Store, set } from "../context/Store";
const VerifyCode = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [counter, setCounter] = useState(59);
  const [serverError, setServerError] = useState("");
  const [showResend, setShowResend] = useState(true);
  const [resend, setResend] = useState(false);
  const { state } = useContext(Store);
  const history = useHistory();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState("");

  //Using useEffect so it will run at the start
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setResend(true);
      setShowResend(true);
    }
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

  const setToken = async (token) => {
    await set("token", token);
  };

  useEffect(() => {
    state.user.phoneNumber && setPhoneNo(state.user.phoneNumber);
  }, []);

  const handleFocus = (e) => {
    e.target.select();
    setError(false);
  };
  const resendLogin = () => {
    setShowResend(false);
    setCounter(59);
    setResendLoading(true);
    fetch("https://sharewave.ng/live/public/user/auth.php", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: state?.user?.phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res);
        setResendLoading(false);
        if (res.status === 500) {
          throw new Error("Something went wrong! Please try again later");
        }
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setResendError(data.message.errorMessage);
            console.log("data", data);
            throw new Error(data.message.errorMessage);
          });
        }
      })
      .catch((err) => {
        setResendLoading(false);
        setResendError(err.message.errorMessage);
      });
  };
  const handleVerify = async (e) => {
    setServerError("");
    setError(false);
    setLoading(true);
    e?.preventDefault();
    const code = +otp.join("");
    fetch("https://sharewave.ng/live/public/user/auth.php", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: state?.user?.phoneNumber,
        authCode: code,
        authAction: "verifyCode",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = await res.json();
          setError(true);
          setServerError(data.message.errorMessage);
          throw new Error(data.message.errorMessage);
        }
      })
      .then((data) => {
        console.log(data, "from verify code");
        setToken(data.token);
        setLoading(false);
        history.push("/chooseusername");
      })
      .catch((err) => {
        setError(true);
        setServerError(err.message?.errorMessage);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="verification-page">
        <div className="verification-page__container">
          <div className="verification-header">
            <h1 className="verify-header">Verification Code</h1>
            <p className="verify-text">
              Please type code sent to
              <span className="moblileNumber"> &nbsp;+{phoneNo}. </span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="verification-input">
            <div className="verification-input-container">
              {otp.map((data, i) => (
                <input
                  type="text"
                  key={i}
                  required
                  className={`code ${error && "error-boundary"}`}
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, i)}
                  onFocus={handleFocus}
                />
              ))}
            </div>
            <button style={{ display: "none" }}></button>
          </form>
          {serverError && (
            <p style={{ color: "red", fontSize: "1.6rem" }}>{serverError}</p>
          )}
          {resendError && (
            <p style={{ color: "red", fontSize: "1.6rem" }}>{resendError}</p>
          )}
          <p className="verify-text verify-text-2">Didn't receive a code?</p>

          {counter !== 0 && (
            <p className="resend-text">
              Resend Code in
              <span className="time-count-down"> &nbsp;0:{counter}</span>s
            </p>
          )}

          {(resend && showResend) || resendLoading ? (
            <button
              className="btn splash-screen__btn link-btn"
              onClick={resendLogin}
            >
              <p>
                Resend{" "}
                {resendLoading ? (
                  <IonSpinner name="bubbles" className="white_spinner" />
                ) : (
                  ""
                )}
              </p>
            </button>
          ) : (
            <button
              className="btn splash-screen__btn link-btn"
              onClick={handleVerify}
            >
              <p>
                {loading ? (
                  <p>
                    Verifying
                    <IonSpinner name="bubbles" className="white_spinner" />
                  </p>
                ) : (
                  "Verify"
                )}
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Loader from "react-loader-spinner";
import login_avatar from "./login_avatar.png";

const OtpForm = () => {
  const [otplabelopacity, setotplabelopacity] = useState(0);
  const [otp_error_opacity, setotp_err_opacity] = useState(0);
  const [otp_err_msg, setotp_err_msg] = useState("");
  const [otp_border, setotp_border] = useState("");
  const [allowSubmit, setallowSubmit] = useState(0);

  let [otp, setotp] = useState("");

  // Set the label opacity one every time the input come into focus
  const otpinputlabel = (event) => {
    setotplabelopacity(1);
    // setotp(event.target.value)
  };

  // Set the label opacity zero every time on get out from focus
  const otphandleBlur = (event) => {
    if (otp_border === "") {
      setotplabelopacity(0);
    }
  };

  //Function to handle form input data
  const handleinput = (event) => {
    if (event.target.value === "" || /^[0-9\b]+$/.test(event.target.value)) {
      setotp(event.target.value);
    }
  };

  const submitform = (event) => {

    // validation
    if (otp !== "") {
        setallowSubmit(1);
        setotp_border("");
        setotp_err_opacity("0");
    }
    else {
      setotp_border("3px solid red");
      setotp_err_opacity("1");
      setotplabelopacity(1);
      setotp_err_msg("Please enter otp!");
    }

    setotp(event.target.value);

    //if (allowSubmit === 1) {
    //   axios
    //     .post(
    //       "http://localhost:81/password_manager/src/api/login.php",otp
    //     )
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

  return (
    <>
      <section className="form">
        <form autoComplete="off" className="d-flex flex-column" style={{marginTop : "50px"}}>
          <img src={login_avatar} alt="avatar" className="avatar" style={{}}/>
          <label
            htmlFor="otp"
            className="otp_id_label"
            style={{ opacity: otplabelopacity }}
          >
            OTP
          </label>
          <input
            type="text"
            className="otp_input"
            name="otp"
            style={{ border: otp_border }}
            placeholder="Enter Otp"
            onFocus={otpinputlabel}
            onBlur={otphandleBlur}
            onChange={handleinput}
            value={otp}
          />
          <span className="error_msg" style={{ opacity: otp_error_opacity }}>
            *{otp_err_msg}
          </span>
          
          <Button
            variant="contained"
            style={{ background: "#46ed99", color: "white" }}
            onClick={submitform}
          >
            LogIn
          </Button>
        </form>
      </section>
    </>
  );
}
export default OtpForm;

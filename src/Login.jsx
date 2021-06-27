import React, { useState , useEffect , useRef} from 'react';
import Button from '@material-ui/core/Button';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OtpForm from './OtpForm';
import SuccessPopup from "./SuccessPopup"

const Login = props => {

    return (
      <>
        <div className="form_body user-select-none">
          <section className="navbar">
            <div className="brand">
              <span className="brand_text">Password Manager</span>
            </div>
            <div className="button_box">
              <Button
                variant="contained"
                className="navbar_button"
                style={{ opacity: "1", color: "white" }}
                // onClick={submitform}
              >
                Register Now
              </Button>
              <Button
                variant="contained"
                className="navbar_button"
                style={{ display: "none", color: "white" }}
                // onClick={submitform}
              >
                Forgot Password?
              </Button>
            </div>
          </section>
          <section className="form_box">
            <LoginForm {...props} />
            {/* <RegisterForm /> */}
            {/* <OtpForm /> */}
            {/* <SuccessPopup title="Login Successfull" /> */}
          </section>
        </div>
      </>
    );
}
export default Login;
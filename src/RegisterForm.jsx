import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Loader from "react-loader-spinner";
import login_avatar from "./login_avatar.png";
import SimpleAlerts from "./SimpleAlerts";

const RegisterForm = () => {
  const [nameopacity, setnameopacity] = useState(0);
  const [mailopacity, setmailopacity] = useState(0);
  const [passopacity, setpassopacity] = useState(0);
  const [name_error_opacity, setname_err_opacity] = useState(0);
  const [mail_error_opacity, setmail_err_opacity] = useState(0);
  const [pass_error_opacity, setpass_err_opacity] = useState(0);
  const [name_err_msg, setname_err_msg] = useState("");
  const [mail_err_msg, setmail_err_msg] = useState("");
  const [pass_err_msg, setpass_err_msg] = useState("");
  const [name_border, setname_border] = useState("");
  const [mail_border, setmail_border] = useState("");
  const [pass_border, setpass_border] = useState("");
  const [pass_error_info,setpass_error_info] = useState(0)
  const [allowSubmit, setallowSubmit] = useState(0);

  let [formdata, setformdata] = useState({
    //To store from data
    name: "",
    mail_id: "",
    password: "",
  });

  // Set the label opacity one every time the input come into focus
  const nameinputlabel = (event) => {
    setnameopacity(1);
  };
  const mailinputlabel = (event) => {
    setmailopacity(1);
  };
  const passinputlabel = (event) => {
    setpassopacity(1);
  };

  // Set the label opacity zero every time on get out from focus
  const namehandleBlur = (event) => {
    if (name_border === "") {
      setnameopacity(0);
    }
  };
  const mailhandleBlur = (event) => {
    if (mail_border === "") {
      setmailopacity(0);
    }
  };
  const passhandleBlur = (event) => {
    if (pass_border === "") {
      setpassopacity(0);
    }
  };

  //Function to handle form input data
  const handleinput = (event) => {
    const inputname = event.target.name;
    const inputvalue = event.target.value;

    setformdata({ ...formdata, [inputname]: inputvalue });
  };

  const submitform = (event) => {
    let inputname = event.target.name;
    let inputvalue = event.target.value;

    if (formdata.name === "") {
      setname_border("3px solid red");
      setname_err_msg("Please Enter Full Name");
      setnameopacity(1);
      setname_err_opacity(1);
    }
    else {
      setname_border("");
      setnameopacity(0);
      setname_err_opacity(0);
    }

    // validation
    if (formdata.mail_id !== "") {
      if (formdata.mail_id.indexOf("@") < 1) {
        setmail_border("3px solid red");
        setmail_err_msg("Invalid mail Id");
        setmailopacity(1);
        setmail_err_opacity(1);
      } else {
        if (formdata.mail_id.indexOf(".com") > formdata.mail_id.indexOf("@")) {
          setmail_border("");
          setmail_err_opacity(0);
        setallowSubmit(1);
        } else {
          setmail_border("3px solid red");
          setmail_err_msg("Invalid mail Id");
          setmailopacity(1);
          setmail_err_opacity(1);
        }
      }
    } else {
      setmail_border("3px solid red");
      setmail_err_msg("Please enter mail Id");
      setmailopacity(1);
      setmail_err_opacity(1);
    }

    if (formdata.password !== "") {

      const validpass = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])');

      if (/[0-9]/g.test(formdata.password[0])) {
        setpass_border("3px solid red");
        setpass_err_opacity(1);
        setpassopacity(1);
        setpass_error_info(0);
        setpass_err_msg("Password can't be start with Digits!");
      } else if (!validpass.test(formdata.password)) {
        setpass_border("3px solid red");
        setpass_err_opacity(0);
        setpassopacity(1);
        setpass_error_info(1);
      } else if (!/.{8,}$/g.test(formdata.password)) {
          setpass_border("3px solid red");
          setpass_err_opacity(1);
          setpassopacity(1);
          setpass_error_info(0);
          setpass_err_msg("Password must be minimum 8 characters");
      } else {
        setpass_border("");
        setpass_err_opacity(0);
        setpass_error_info(0);
        setallowSubmit(1);
      }

    } else {
      setpass_border("3px solid red");
      setpass_err_opacity("1");
      setpassopacity(1);
      setpass_error_info(0);
      setpass_err_msg("Please enter password");
    }

    setformdata({ ...formdata, [inputname]: inputvalue });

    if (allowSubmit === 1) {
      axios
        .post(
          "http://localhost:81/password_manager/src/api/register.php",
          formdata
        )
        .then((res) => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }

  };

  return (
    <>
      <section className="form">
        <form autoComplete="off" className="d-flex flex-column">
          <img src={login_avatar} alt="avatar" className="avatar" />
          <label
            htmlFor="name"
            className="name_label"
            style={{ opacity: nameopacity, top: "-1px" }}
          >
            Full Name
          </label>
          <input
            type="text"
            className="registration_input name_id"
            name="name"
            style={{ border: name_border, top: "-10px" }}
            placeholder="Enter Your Full Name"
            onFocus={nameinputlabel}
            onBlur={namehandleBlur}
            onChange={handleinput}
            required
          />
          <span className="error_msg" style={{ opacity: name_error_opacity , marginTop: "-10px" }}>
            *{name_err_msg}
          </span>
          <label
            htmlFor="mail_id"
            className="mail_id_label"
            style={{ opacity: mailopacity }}
          >
            Mail Id
          </label>
          <input
            type="email"
            className="registration_input mail_id"
            name="mail_id"
            style={{ border: mail_border }}
            placeholder="Enter Your Mail Id"
            onFocus={mailinputlabel}
            onBlur={mailhandleBlur}
            onChange={handleinput}
          />
          <span className="error_msg" style={{ opacity: mail_error_opacity }}>
            *{mail_err_msg}
          </span>
          <label
            htmlFor="password"
            classword="password_label"
            style={{ opacity: passopacity, top: "0" }}
          >
            Password
          </label>
          <input
            type="password"
            className="registration_input password"
            opacity="pass"
            onFocus={passinputlabel}
            onBlur={passhandleBlur}
            name="password"
            placeholder="Enter Your Password"
            // pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])"
            onChange={handleinput}
            style={{ border: pass_border }}
          />
          <span className="error_msg" style={{ opacity: pass_error_opacity }}>
            *{pass_err_msg}
          </span>
          <Button
            variant="contained"
            className="login_btn"
            style={{ background: "#46ed99", color: "white" }}
            onClick={submitform}
          >
            Register
          </Button>
        </form>
        {pass_error_info ? (
          <SimpleAlerts severity="error">
            Password must contain ONE Digit, ONE Lowercase, ONE Uppercase and
            ONE Special character
          </SimpleAlerts>
        ) : null}
      </section>
    </>
  );
};
export default RegisterForm;

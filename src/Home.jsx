import React, { useState , useEffect } from 'react';
import ReactDom from 'react-dom';
import Header from './Header';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Edit from '@material-ui/icons/EditOutlined';
import Cancel from '@material-ui/icons/CancelOutlined';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
// import { Redirect , Switch } from 'react-router-dom';
import Clock from 'react-digital-clock';
import { Switch } from "antd";
import UploadIconButtons from './UploadIconButton';


// main component
const Home = props => {

    // let LoginStatus = props.LoginStatus;

    if (JSON.parse(localStorage.getItem('session')) === null) {
      props.history.push("/Login");
    }


    const [state,setState] = useState([]); //to store data after getting from database

    const [form,setForm] = useState({       //To store from data
        sitename: "",
        username: "",
        password: "",
    });

    const [isLoaded,setIsLoaded] = useState(false);
    // const [error,setError] = useState(null);
    

    // To fetch data from database and set data to state variable
    let data = localStorage.getItem("session");

    if (data === null) {
      data = '';
    }
    else {
      data = JSON.parse(data);
      data = data.username;
    }

    useEffect(() => {
        axios.post('http://localhost:81/password_manager/src/api/fetch_data.php',
          JSON.stringify(data))
            .then(res => {
                setState(res.data);
                setIsLoaded(true);
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    },[isLoaded])

    //Function to handle form input data
    const handleinput = event => {
        const inputname = event.target.name;
        const inputvalue = event.target.value;

        setForm({...form,[inputname] : inputvalue,});
    }

    // Function to insert data to database
    const submitform = (event) => {
        
        setIsLoaded(false);

        const inputname = event.target.name;
        const inputvalue = event.target.value;

        setForm({...form,[inputname] : inputvalue,});

        axios.post('http://localhost:81/password_manager/src/api/insert.php',form)
        .then(data =>{
            // console.log(data);
            setIsLoaded(true);
            if (data === 1) {
                
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const logout = () => {
      localStorage.clear("session");
      props.history.push("/login");
    };

    const [Timeleft,setTimeleft] = useState(10);

    let i = 10;

    const time = () => {
      setTimeleft(i);
      i--;
    }

    useEffect(() => {
      let timer1 = setInterval(() => {
        if (i >= 0) {
          time();
        }
        if (i === 0) {
          // logout();
        }
      }, 60000);
      return () => {
        clearTimeout(timer1);
      };
    }, []);

    // FOR CHANGE OF PROFILE PICTURE

    useEffect(() => {
      axios
        .post(
          "http://localhost:81/password_manager/src/api/image.php",
          JSON.stringify({
            username: JSON.parse(localStorage.getItem("session")) ? JSON.parse(localStorage.getItem("session")).username : null,
            url: ""
          })
        )
        .then((res) => {
          if (res.data !== 0) {
            setprofilePic(res.data);
          }
          else {
            console.log('Error to get profile image');
          }
        });
    }, []);

    const [profilePic, setprofilePic] = useState("/static/images/avatar/1.jpg");

    const handlechange = (event) => {
      let fileinput = event.target;
      let files = fileinput.files;

      let firstFile = files[0];

      let fileReader = new FileReader();

      fileReader.onload = function (event) {
        let dataUrl = event.target.result;

        axios
          .post(
            "http://localhost:81/password_manager/src/api/image.php",
            JSON.stringify({
              username: JSON.parse(localStorage.getItem("session"))
                ? JSON.parse(localStorage.getItem("session")).username
                : null,
              url: dataUrl,
            })
          )
          .then((res) => {
            if (res.data !== 1) {
              console.log('Problem to set profile image!');
            }
          });

        setprofilePic(dataUrl);
      };
      fileReader.readAsDataURL(firstFile);
    };

    // NAVBAR FUNCTIONS

    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }

  
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Header {...props} logout={logout} />
        <section className="main_content">
          <section className="content_box">
            <div className="data_form">
              <form autoComplete="off">
                <input
                  type="text"
                  className="data_form_input text-center"
                  name="sitename"
                  placeholder="Enter Site Name"
                  autoComplete="none"
                  onChange={handleinput}
                />
                <input
                  type="text"
                  className="data_form_input text-center"
                  name="username"
                  placeholder="Enter User Name"
                  autoComplete="none"
                  onKeyUp={handleinput}
                />
                <input
                  type="password"
                  className="data_form_input text-center"
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="none"
                  onKeyUp={handleinput}
                  // style={{ ::placeholder}}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  className="data_form_button reset_button"
                  startIcon={<RefreshIcon />}
                  children="reset"
                />
                <Button
                  variant="contained"
                  className="data_form_button save_button"
                  style={{ background: "#46ed99", color: "white" }}
                  startIcon={<SaveIcon />}
                  children="Save"
                  onClick={submitform}
                />
              </form>
            </div>
            <div className="data_show">
              <div className="row_data_head d-flex flex-row">
                <section
                  className="row_data_head_element"
                  style={{ width: "18.5%" }}
                >
                  <p>Site Name</p>
                </section>
                <section className="row_data_head_element_div">
                  <p className="primarycolor">|</p>
                </section>
                <section
                  className="row_data_head_element"
                  style={{ width: "28.8%" }}
                >
                  <p>User Name</p>
                </section>
                <section className="row_data_head_element_div">
                  <p className="primarycolor">|</p>
                </section>
                <section
                  className="row_data_head_element"
                  style={{ width: "32.5%" }}
                >
                  <p>Password</p>
                </section>
                <section className="row_data_head_element_div">
                  <p className="primarycolor">|</p>
                </section>
                <section
                  className="row_data_head_element"
                  style={{ width: "15%", paddingLeft: "49px" }}
                >
                  <p>Action</p>
                </section>
              </div>
              <div className="row_data_container">
                {isLoaded ? (
                  state.map((result, i) => (
                    <Rowdata key={i} row={result} setIsLoaded={setIsLoaded} />
                  ))
                ) : (
                  <Loader
                    type="BallTriangle"
                    color="#00BFFF"
                    height={60}
                    width={60}
                    style={{ textAlign: "center", marginTop: "20px" }}
                  />
                )}
              </div>
            </div>
          </section>

          {/* SIDE NAVBAR */}

          <section className="side_nav">
            <section className="position-relative">
              <Avatar
                alt="Remy Sharp"
                src={profilePic}
                className="sidebar_avatar"
              />
              <span className="addphotoicon">
                <UploadIconButtons handlechange={handlechange} />
              </span>
            </section>
            <p className="mt-3 font-weight-bold">
              {" "}
              Welcome Back{" "}
              <span className="text-uppercase">
                {JSON.parse(localStorage.getItem("session"))
                  ? JSON.parse(localStorage.getItem("session")).name
                  : null}
              </span>
            </p>
            <p>Total Records: {state.length} </p>
            
            <Switch defaultChecked onChange={onChange} />

            <section
              className="sidenav_footer"
              style={{
                height: "150px",
                width: "inherit",
                backgroundColor: "blue",
                position: "absolute",
                bottom: "10px",
              }}
            >
              <span className="d-flex flex-row  ml-5 ">
                <p className="mr-2">Current Time : </p>
                <span id="clock">
                  <Clock />
                </span>
              </span>
              <span className="d-flex flex-row ml-5">
                <p className="mr-2">Session End In : {Timeleft} Minutes </p>
              </span>
            </section>
          </section>
        </section>
      </div>
    );
}

export default Home;

const Editform = props => {

    const setShoweditform = props.setShoweditform;

    let [editform,setEditform] = useState({       //To store from data
        sitename: "",
        username: "",
        password: "",
    });

    const [isLoaded,setIsLoaded] = useState(false);

    //Function to handle form input data
    const handleinput = event => {
        const inputname = event.target.name;
        const inputvalue = event.target.value;

        setEditform({...editform,[inputname] : inputvalue,});
    }

    // Function to insert data to database
    let submitform = (event) => {
        
        setIsLoaded(false);

        let inputname = event.target.name;
        let inputvalue = event.target.value;

        setEditform({...editform,[inputname] : inputvalue,});

        axios.post('http://localhost:81/password_manager/src/api/update.php',editform)
        .then(data =>{
            console.log(data);
            setIsLoaded(true);
            if (data === 1) {
                
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const canceleditform = () => {
        setShoweditform(false);
    }
    return (
        <div className="edit_data_form">
            <form autoComplete="off" className="d-flex flex-row">
                <input type="text" className="edit_data_form_input text-center" style={{width:"18.3%"}} name="sitename" placeholder="Enter Site Name" onChange={handleinput}/>
                <input type="text" className="edit_data_form_input text-center" style={{width:"28.1%"}} name="username" placeholder="Enter User Name" onKeyUp={handleinput}/>
                <input type="password" className="edit_data_form_input text-center" style={{width:"31.1%"}} name="password" placeholder="Enter Password" onKeyUp={handleinput}/>
                <section className="edit_data_form_button text-center d-flex flex-row" style={{width:"15.1%",paddingLeft:"68px"}}>
                    <SaveIcon className="edit_data_form_btn" style={{marginRight: '15px',color: "blue"}} onClick={submitform}/>
                    <Cancel className="edit_data_form_btn" style={{color: "red"}} onClick={canceleditform} />
                </section>
            </form>
        </div>
    )
}

// component for printing data from state variable
const Rowdata = props => {

    // const fadeout = {};
    let rowdataclass = ["row_data", "d-flex flex-row"];

    const [password,setPassword] = useState("********");
    const [showpass,setShowpass] = useState(true);
    const [showeditform,setShoweditform] = useState(false);

    const deletedata = () => {

        const id = props.row.id;
        const setIsLoaded = props.setIsLoaded;

        setIsLoaded(false);

        axios.post('http://localhost:81/password_manager/src/api/delete.php',id)
        .then(data => {
            // console.log(data);
            // rowdataclass.push("fadeout");
            setIsLoaded(true);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const togglepass = () => {
        setShowpass(showpass ? false : true);
        setPassword(showpass ? props.row.password : "********");
    }

    const triggerform = () => {
        setShoweditform(true);
    }

    return (
        <>
            { showeditform ? <Editform setShoweditform = {setShoweditform} /> :
                <div className={rowdataclass.join(" ")}>
                    <section className="row_data_element" style={{width:"18.7%"}}><p>{props.row.sitename}</p></section>
                    <section className="row_data_element_div"><p className='primarycolor'>|</p></section>
                    <section className="row_data_element" style={{width:"28.5%"}}><p>{props.row.username}</p></section>
                    <section className="row_data_element_div"><p className='primarycolor'>|</p></section>
                    <section className="row_data_element data_element_pass" style={{width:"32.2%"}}>
                        <p>
                            {password}
                            {showpass ? <VisibilityIcon style={{color:"#1dce84", cursor:"pointer" , marginLeft:"20px"}} onClick={togglepass}/> : <VisibilityOffIcon style={{color:"#1dce84", cursor:"pointer" , marginLeft:"20px"}} onClick={togglepass}/>}
                        </p>
                    </section>
                    <section className="row_data_element_div"><p className='primarycolor'>|</p></section>
                    <section className="row_data_element" style={{width:"15%",paddingLeft:"49px"}}>
                        <span className="d-flex flex-row justify-content-center">
                            <Edit className="rowdata_btn" style={{marginRight: '15px',color: "blue"}} onClick={triggerform}/>
                            <Cancel className="rowdata_btn" style={{color: "red"}} onClick={deletedata} />
                        </span>
                    </section>
                </div>
            }
        </>
    )
}


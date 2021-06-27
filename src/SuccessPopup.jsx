import React from 'react';
import { useState } from 'react';
import "./SuccessPopup.css";

const SuccessPopup = (props) => {

    // document
    // .getElementById("open-popup-btn")
    // .addEventListener("click", function () {
    //     document.getElementsByClassName("popup")[0].classList.add("active");
    // });

    // document
    // .getElementById("dismiss-popup-btn")
    // .addEventListener("click", function () {
    //     document.getElementsByClassName("popup")[0].classList.remove("active");
    // });

    const [popclass,setpopclass] = useState("");
    // const [triggerpopup,settriggerpopup] = useState(false);

    var popupclasses = ["popup", "center",popclass,"active"];

    const Openpopup = () => {
        setpopclass('active');
    }

    const Closepopup = () => {
      setpopclass("");
    }

    // if (true) {
    //     Openpopup();
    // }

    return (
      <>
        <div class="popup_body">
          <div class={popupclasses.join(" ")}>
            <div class="icon">
              <i class="fa fa-check"></i>
            </div>
            <div class="title">{props.title}</div>
            <div class="description">{props.description}</div>
            <div class="dismiss-btn">
              <button id="dismiss-popup-btn" onClick={Closepopup}>
                OK
              </button>
            </div>
          </div>
          {/* <div class="center">
          <button id="open-popup-btn" onClick={Openpopup}>
            Open Popup
          </button>
        </div> */}
        </div>
      </>
    );
}

export default SuccessPopup;
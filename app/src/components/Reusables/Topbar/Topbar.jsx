import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
// import Login from "../Login/Login";

function Topbar() {
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="head">
        <img
          className="logo"
          // src="https://www.linkpicture.com/q/cars-valley-removebg-preview.png"
          alt=""
        />
        <div class="style-0">
    <div class="style-1">
        <p class="style-2">Chennai</p><svg class="style-3" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreIcon">
            <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" class="style-4"></path>
        </svg>
    </div>
</div>
        <div className="headcar">
          <span className="textb">Buy Car</span>
          <span className="textc" onClick={() => navigate("/sellitem")}>
            Sell Car
          </span>
        </div>
        {/* <button className="heart">{String.fromCharCode(9825)}</button> */}

        <div
          style={{
            marginLeft: "auto",
            marginRight: "60px",
          }}
        >
          <button
            role="button"
            class="Login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* {showModal && <Login />} */}
    </div>
  );
}

export default Topbar;

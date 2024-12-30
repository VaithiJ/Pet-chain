import React, { useState } from "react";
import "./Roles.css";
import seller from "./seller.jpg";
import buyer from "./buyer.jpg";
import verifier from "./verifier.jpg";
import check from "../../Images/check.png";
import petting from "../../Images/petting.jpg";
import ado from "../../Images/gingg.jpg";
import catGif from "../../Images/cat.gif";
import charm from "../../Images/charm.jpg";
import charmm from "../../Images/cot.jpg";



const Roles = () => {
  const [activePopupIndex, setActivePopupIndex] = useState(null);

  const handleCardClick = (index) => {
    setActivePopupIndex(index);
  };

  const handleClosePopup = () => {
    setActivePopupIndex(null);
  };

  return (
    <div className="noneee">
      <div
        style={{
          display: "flex",
          flexDirection: "coloumn",
          position: "relative",
          // top: "-100px",
          top: "50px",
          columnGap: "70px",
        }}
        className="cards"
      >
       
        <div class="card">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
          </svg> */}
          <img className="selimg" src={check} alt="" />
          {/* <p class="card__title">Buyer</p> */}
          <div class="card__content">
            <p class="card__title">Checked</p>
            <p class="card__description">
              Each adorable companion listed here has undergone rigorous
              verification by our trusted team of WPG authorised verifiers. Rest
              assured, you'll find only genuine and reliable pets waiting to
              bring joy into your life.{" "}

            </p>
            <img style={{width:"200px", position:"relative", top:"30px"}} src={catGif}/>

          </div>
        </div>

        <div class="card">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
          </svg> */}
          <img className="selimg1" src={charmm} alt="" />

          <div class="card__content">
            <p class="card__title">10+ Parameters verified</p>
            <p class="card__description">
              Our platform takes pet verification seriously. Our dedicated WPG
              authorised verifiers meticulously verify over 10 parameters,
              including breed, gender, and age, ensuring that each pet listed
              meets our strict standards of authenticity and quality. You can
              trust that the perfect furry friend is waiting for you{" "}
            </p>
            <img style={{width:"200px"}} src={catGif}/>

          </div>
        </div>

        <div class="card">
          <img className="selimg2" src={charm} alt="" />

          <div class="card__content">
            <p class="card__title">Verified in Person</p>
            <p class="card__description">
              Rest assured, every pet on our platform undergoes thorough
              in-person verification. Our team of experts ensures that each pet
              meets the highest standards of health, temperament, and
              authenticity. You can have peace of mind knowing that you'll find
              a genuine and loving companion here.{" "}
            </p>
            <img style={{width:"200px"}} src={catGif}/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;

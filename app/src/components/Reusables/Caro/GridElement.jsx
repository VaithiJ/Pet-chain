import React from "react";
import "./GridElement.css";
import catGif from "../../Images/cat.gif";
import charm from "../../Images/charm.jpg";
import charmm from "../../Images/cot.jpg";
import check from "../../Images/check.png";
import block from "../../Images/blockc.jpg"
import ld from "../../Images/ld.jpg"


function GridElement() {
  return (
    <div className="benefits">
     <h1 style={{fontFamily:"Nunito", color:"red"}}>Why us?</h1> 

      <div className="gridContainer">
        <div className="gridItem">

          <div className="gridImage">
          <img className="selimg" src={block} alt="" />

          </div>
          <div className="gridContent">
            <div>
              <h3>Blockchain</h3>
              <p>
                Blockchain enables decentralized car registration, ensuring
                transparency and eliminating the need for intermediaries.
              </p>
            </div>
          </div>
        </div>

        <div className="gridItem">
          <div className="gridImage">
          <img className="selimg1" src={charmm} alt="" />

          </div>
          <div className="gridContent">
            <div>
              <h3>Trust</h3>
              <p>
              Our platform takes pet verification seriously. Our dedicated WPG verifiers verifies the pet in person and approves the pet

              </p>
            </div>
          </div>
        </div>

        <div className="gridItem">
          <div className="gridImage">
          <img className="selimg2" src={charm} alt="" />

          </div>
          <div className="gridContent">
            <div>
              <h3>Checked</h3>
              <p>Our team of experts ensures that each pet
              meets the highest standards of health, temperament, and
              authenticity. {" "}.</p>
            </div>
          </div>
        </div>

        <div className="gridItem">
          <div className="gridImage">
            <img
src={ld}              alt="100+ Quality Checks"
            />
          </div>
          <div className="gridContent">
            <div>
              <h3>Authenticity</h3>
              <p>
              We are
        committed to providing you with pets that are genuine, healthy,
        and bred under the highest standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridElement;

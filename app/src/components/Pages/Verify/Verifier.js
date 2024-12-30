import React from "react";
import { useNavigate } from "react-router-dom";
import VerifyBar from "../../Reusables/VerifyBar/VerifyBar";
import goldy from "../../Images/goldy.jpg";
import "./Verifier.css";
import { AiOutlineHeart, AiOutlineEnvironment } from "react-icons/ai";

const Verifier = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ marginTop: "200px" }}>
      <VerifyBar />
      <div className="carrr-carrrd" onClick={() => navigate("/verification")}>
        <img className="carrr-image" src={goldy} alt="carrr" />
        <div className="carrr-details">
          <h3 className="carrr-title">Golden Retriever </h3>
          <p className="carrr-price">₹20,000</p>
          <div className="carrr-amount-line"></div>
          <div className="carrr-location">
            <button
              className="verifybuttton"
              onClick={() => navigate("/verification")}
            >
              Verify
            </button>
          </div>
        </div>
        
      </div>
      
        
    </div>
  );
};

export default Verifier;

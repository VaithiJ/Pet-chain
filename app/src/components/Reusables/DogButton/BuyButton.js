import React from 'react'
import "./AdoptButton.css"
import { useNavigate } from 'react-router-dom';

const BuyButton = () => {
    const navigate = useNavigate()
    const buyPets = () => {
        navigate("/marketplace");
      };
    
  return (
    <div><div className="containerrrr" style={{marginLeft:"250px", marginTop:"70px"}}>
    <div className="button-container">
      <div className="dog">
        <div className="taill" />
        <div className="bodyy" />
        <div className="headd">
          <div className="eyes">
            <div className="left" />
            <div className="right" />
          </div>
          <div className="nuzzlee">
            <div className="mouth">
              <div className="tongue" />
            </div>
            <div className="nose">
              <div className="nostrils" />
              <div className="highlight" />
            </div>
          </div>
        </div>
        <div className="earss">
          <div className="left" />
          <div className="right" />
        </div>
      </div>
      <button onClick={buyPets} style={{width:"200px"}}>Buy</button>
      <div className="paw" />
      <div className="paw top" />
    </div>
  </div>
  </div>
  )
}

export default BuyButton
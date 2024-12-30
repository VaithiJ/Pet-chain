import React from 'react'
import "./AdoptButton.css"
import { useNavigate } from 'react-router-dom';

const AdoptButton = () => {
    const navigate = useNavigate()
    const adoptPets = () => {
        navigate("/adoption");
      };
    
  return (
    <div><div className="containerrrr" style={{marginLeft:"740px", marginTop:"70px"}}>
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
      <button onClick={adoptPets}>Adopt</button>
      <div className="paw" />
      <div className="paw top" />
    </div>
  </div>
  </div>
  )
}

export default AdoptButton
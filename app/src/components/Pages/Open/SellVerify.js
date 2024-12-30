import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Reusables/NavBar/NavBar';
import "./Open.css"
import NVmenu from '../../Reusables/NV/NBmenu';

function App() {
  const [showSellCard, setShowSellCard] = useState(false);
  const [showVerifyCard, setShowVerifyCard] = useState(false);
  const navigate = useNavigate();

  const handleSellClick = () => {
    setShowSellCard(true);
    setShowVerifyCard(false);
  };

  const sendToVerify =()=>{
    navigate("/verify")
  }
  const sendTosell =()=>{
    navigate("/seller")
  }
  const handleVerifyClick = () => {
    setShowSellCard(false);
    setShowVerifyCard(true);
  };

  return (
    <div >
      <NVmenu/>
      <div style={{marginTop:"100px"}}>
        <div style={{marginLeft:"900px"}}>
      <button className='sellButton' onClick={handleSellClick}>Sell</button>
      <button className='verifyButton' style={{marginLeft:"100px"}} onClick={handleVerifyClick}>Verify</button>
      </div>
      {showSellCard && (
        <div className="verifycard">
          <h2>Sell your Love</h2>
          <p>Sell your pets for price or for adoption</p>
          <button className='sellButton1' onClick={sendTosell}>Sell</button>
        </div>
      )}

      {showVerifyCard && (
        <div className="verifycard">
          <h2>Verify Pets</h2>
          <p>Verify the pets posted by sellers</p>
          <button className='verifyButton1' onClick={sendToVerify}>Verify</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;

import React from 'react'
import "./DogButton.css"
import { useNavigate } from 'react-router-dom';

const DogButton = () => {
    const navigate = useNavigate()
    const buyPets = () => {
        navigate("/marketplace");
      };
    
  return (
    <div><div className="containerrrrr">
    <div className="button-container">
      <div className="dog">
        <div className="tail" />
        <div className="body" />
        <div className="head">
          <div className="eyes">
            <div className="left" />
            <div className="right" />
          </div>
          <div className="nuzzle">
            <div className="mouth">
              <div className="tongue" />
            </div>
            <div className="nose">
              <div className="nostrils" />
              <div className="highlight" />
            </div>
          </div>
        </div>
        <div className="ears">
          <div className="left" />
          <div className="right" />
        </div>
      </div>
      <button className='kiki' onClick={buyPets}>View More</button>
      <div className="paw" />
      <div className="paw top" />
    </div>
  </div>
  </div>
  )
}

export default DogButton
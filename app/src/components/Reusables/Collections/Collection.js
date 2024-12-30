import React, { useState, useEffect } from "react";
import "./Collection.css";
import paw from "../../Images/beaggg.jpg";
import dog3 from "../../Images/gr4.jpg";
import dog5 from "../../Images/adoptP.jpg";
import dog1 from "../../Images/goldy.jpg";
import dog2 from "../../Images/gs.jpg";
import dog4 from "../../Images/hus.jpg";
import dog6 from "../../Images/buyP.jpg";
import { Carousel } from "../Carousel";
import axios from "../../../url.js"
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import 'aos/dist/aos.css';
function Collection() {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const navigate = useNavigate()
  const handleImageClick = (breed) => {
    navigate(`/petBreed/${breed}`);
  };
const images = [

  paw, dog1, dog2, dog3, dog4, dog5
]
  const handleHover = (index) => {
    setFocusedIndex(index);
  };

  const petBreed = "Golden Retriever"
   
  const golden = () =>{
    navigate("")
  }


  return (
    <div className="topp-picks-section" data-aos="slide-up" style={{marginTop:"100px"}}>
      <h2>Collections</h2>
      <div className="Collectionpicks" style={{marginLeft:"100px"}}>
        <div className="grid-container">
          <div
            className={`card-1 large-card ${
              focusedIndex === 0 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={() => handleHover(null)}
          >
            <a
              href={`/petBreed/German Sheperd`}
              onClick={() => handleImageClick("German Sheperd")}
            >
            <img className="imglargecard" src={dog2} alt="SareeCol1" />
            <h3 className="Sarecol" style={{left:"140px",fontFamily:"Nunito", top:"20px",borderRadius:"10px", backgroundColor:"red", width:"220px", padding:"10px"}}>German Shepherd</h3>
          </a></div>
          <div
            className={`card-1 small-card ${
              focusedIndex === 1 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(null)}
          >
             <a
              href={`/petBreed/Beagle`}
              onClick={() => handleImageClick("Beagle")}
            >
            <img className="imgsmallcard" src={paw} alt="SareeCol1" />
            <h3 className="Sarecol" style={{left:"60px", top:"20px",borderRadius:"10px", backgroundColor:"red",fontFamily:"Nunito", padding:"10px"}}>Beagle</h3>
            </a></div>
        </div>
        <br />
        <div className="grid-container1">
          <div
            className={`card-1 small-card1 ${
              focusedIndex === 2 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleHover(null)}
          >
             <a
              href={`/petBreed/Persian`}
              onClick={() => handleImageClick("Persian")}
            >
            <img className="imgsmallcard" src={dog5} alt="SareeCol1" />
            <h3 className="Sarecol" style={{left:"50px", top:"10px",backgroundColor:"red",fontFamily:"Nunito", padding:"10px", borderRadius:"10px"}}>Persian</h3>
            </a></div>
          <div
            className={`card-1 small-card2 ${
              focusedIndex === 3 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(null)}
          >
             <a
              href={`/petBreed/Golden Retriever`}
              onClick={() => handleImageClick("Golden Retriever")}
            >
            <img className="imgsmallcard" src={dog3} alt="SareeCol1" />
            <h3 className="Sarecol" style={{left:"120px", top:"20px",backgroundColor:"red",fontFamily:"Nunito", padding:"10px", borderRadius:"10px"}}> Golden Retriever</h3>
          </a></div>
          <div
            className={`card-1 medium-card1 ${
              focusedIndex === 4 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(4)}
            onMouseLeave={() => handleHover(null)}
          >
             <a
              href={`/petBreed/Husky`}
              onClick={() => handleImageClick("Husky")}
            >
            <img className="imgsmallcard" src={dog4} alt="SareeCol1" />
            <h3 className="Sarecol" style={{left:"40px", top:"10px",backgroundColor:"red",fontFamily:"Nunito", padding:"8px", borderRadius:"10px"}}>Husky</h3>
          </a></div>
        </div>
      </div>
      <br />
      <br />

      <button className="viewallbut">
        <Link to="/marketplace">
        <p>View All</p>
        </Link>
        <svg
          stroke-width="4"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
  </div>
  );
}

export default Collection;

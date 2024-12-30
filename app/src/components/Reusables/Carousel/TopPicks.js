import React, { useRef, useState, useEffect } from "react";
import "./TopPicks.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../../url";
import AOS from "aos";
import 'aos/dist/aos.css';

const TopPicks = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [iswishListed, setwishList] = useState(false);
  const [data, setData] = useState([]);
  const [pets, setPets] = useState([]);
  const [details, setDetails] = useState([]);
  const [wishlistedPets, setWishlistedPets] = useState([]);

  const navigate = useNavigate();
  

  const navig = () => {
    navigate("/marketplace");
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const walk = (event.clientX - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleFavoriteClick = (petId) => {
    const isWishlisted = wishlistedPets.includes(petId);
  
    if (isWishlisted) {
      // Remove pet from wishlistedPets array
      setWishlistedPets(wishlistedPets.filter((id) => id !== petId));
    } else {
      // Add pet to wishlistedPets array
      setWishlistedPets([...wishlistedPets, petId]);
    }
  };
  

  const handleFavoriteRemove = () => {
    setwishList(!iswishListed);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const scrollRight = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft + containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  

  const scrollLeftButton = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft - containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await axios.get("/allpets");
        const allPets = responsee.data.pets;

        const filteredPets = allPets.filter((pet) => pet.imageUrl !== "");

        setDetails(filteredPets);
        console.log(filteredPets, "sdjfjdsfkjddanbsdafbdsj,fkjdsfkndas ");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="top-picks-section" data-aos="slide-up">
        <br />
        <br />
        <div
          className="top-picks-wrapper"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="top-picks-container">
            {details.map((image, index) => (
              <div className="carddd" key={index}>
                <img
                  className="imgggpet"
                  src={image.imageUrl[0]}
                  alt={`Pet ${index + 1}`}
                  onClick={() => {
                    navigate(`/description/${details[index]?._id}`);
                  }}
                />
                <div className="petwish">
                  <h3
                    style={{
                      position: "relative",
                      left: "120px",
                      fontSize: "20px",
                    }}
                  >
                    {details[index]?.name || "No Name"}
                  </h3>
                  {wishlistedPets.includes(details[index]?._id) ? (
  <AiFillHeart
    className="wishbut1"
    onClick={() => handleFavoriteRemove(details[index]?._id)}
  />
) : (
  <AiOutlineHeart
    className="wishbut"
    onClick={() => handleFavoriteClick(details[index]?._id)}
  />
)}


                </div>
                <p
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "20px",
                    color: "white",
                    position: "relative",
                    left: "150px",
                    width: "100px",
                    height: "40px",
                    borderRadius: "20px",
                    backgroundColor: "red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ₹{details[index]?.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="carousel-arrows">
          <span className="arrow-left" onClick={scrollLeftButton}>
            &#8249;
          </span>
          <span className="arrow-right" onClick={scrollRight}>
            &#8250;
          </span>
        </div> */}
      </div>
    </section>
  );
};

export default TopPicks;

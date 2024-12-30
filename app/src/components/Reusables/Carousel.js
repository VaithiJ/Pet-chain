import React, { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import axios from "../../url"
export const Carousel = () => {
  const [daata, setDaata] = useState([]);
  const [imagesss, setImagesss] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allPets");
        const petsData = response.data.pets;
        setDaata(petsData);
        console.log(daata);
        const petImages = petsData.map((pet) => pet.imageUrl);
        setImagesss(petImages);
        console.log(imagesss);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="carousel-wrapper" style={{ width: "100%", maxWidth: "300px" }}>
      {/* Adjust the width and max-width as needed */}
      <AwesomeSlider
        play={true}
        cancelOnInteraction={false}
        interval={1000}
        bullets={false}
      >
        {imagesss.map((slide, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", height: "100%", borderRadius: "20px" }}
              src={slide} // Use src attribute directly on the img element
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </AwesomeSlider>
    </div>
  );
};

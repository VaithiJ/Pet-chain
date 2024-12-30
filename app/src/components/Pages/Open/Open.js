import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Reusables/NavBar/NavBar.js";
import dog3 from "../../Images/ffr.jpg";
import "./Open.css";
import { Carousel } from "../../Reusables/Carousel.js";
import paw from "../../Images/paw.png";
import { FaPaw } from "react-icons/fa";
import paww from "../../Images/paww.svg";
import ScrollToTopButton from "../../Reusables/Arrow/Arrow.js";
import buyP from "../../Images/buyP.jpg";
import adoptP from "../../Images/catty.jpg";
import catGif from "../../Images/cat.gif";
import Slider from "../../Reusables/Slider/Slider.js";
import TopPicks from "../../Reusables/Carousel/TopPicks.js";
import Collection from "../../Reusables/Collections/Collection.js";
import lines from "../../Images/lines.jpg";
import Add from "../Seller/Add.js";
import sss from "../../Images/cir.svg";
import DogButton from "../../Reusables/DogButton/DogButton.js";
import AdoptButton from "../../Reusables/DogButton/AdoptButton.js";
import BuyButton from "../../Reusables/DogButton/BuyButton.js";
import axios from "../../../url.js";
import gold from "../../Images/goldver.jpg";
import check from "../../Images/check.png";
import petting from "../../Images/petting.jpg";
import ado from "../../Images/gingg.jpg";
import Roles from "../../Reusables/Roles/Roles.jsx"
import AOS from "aos";
import GridElement from "../../Reusables/Caro/GridElement.jsx";
import 'aos/dist/aos.css';
import Footer from "../Footer/Footer.js";
import TopBar from "../../Reusables/Topbar/CitySearch.jsx"
import CitySearch from "../../Reusables/Topbar/CitySearch.jsx";
import ssad from "../../Images/ssad.jpg"
import NVmenu from "../../Reusables/NV/NBmenu.jsx";
const Open = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  // Event listener to handle scroll position
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;

    setVisible(visible);
    setPrevScrollPos(currentScrollPos);
  };
  const navigate = useNavigate();

  const buyPets = () => {
    navigate("/marketplace");
  };

  const adoptPets = () => {
    navigate("/adoption");
  };

  const sellPets = () => {
    navigate("/seller");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the animation duration
      easing: "ease-in-out", // Set the animation easing (optional)
      once: true, // Only animate elements once (optional)
      mirror: false // Whether elements should animate out while scrolling past them (optional)
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allPets");
        const petsData = response.data.pets;
  
        const responsee = await axios.get("/images");
        const imagesData = responsee.data;
  
        // Group image URLs by their IDs
        const imageUrlsByPetId = {};
        imagesData.forEach((image) => {
          if (!imageUrlsByPetId[image._id]) {
            imageUrlsByPetId[image._id] = [image.imageUrl];
          } else {
            imageUrlsByPetId[image._id].push(image.imageUrl);
          }
        });
  
        // Match IDs and make the POST request
        petsData.forEach(async (pet) => {
          const id = pet._id;
          const imageUrls = imageUrlsByPetId[id];
  
          if (imageUrls) {
            try {
              await axios.post("/imageUrl", {
                imageUrl: imageUrls,
                ids: [id],
              });
              console.log("Image URLs posted for ID:", id);
            } catch (error) {
              console.log("Error posting image URLs for ID:", id, error);
            }
          } else {
            console.log("No image URLs found for ID:", id);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="openpagediv">
      {loading ? (
        <div className="loader">
          <img style={{ marginTop: "200px" }} src={catGif} alt="Loader" />
        </div>
      ) : (
        <>
          <NVmenu visible={visible} />
          <div>
            <img className="dogImage" src={dog3} alt="Dog"  />
            <div className="dogText" >
              <div className="best">
                Best friend <img className="pawwww" src={paww} alt="Paw" />
                <br /> <div className="with">with</div> happy time
              </div>
            </div>
          </div>
          <div className="catch">
            Unleash the love: Where wagging tails and <br /> purrs speak louder
            than words.
          </div>
          <DogButton />
          {/* <button className="viewButton" onClick={buyPets}>
            View More <FaPaw />
          </button> */}
          <div className="puppies">Pets waiting for you</div>
          <TopPicks /> <Collection className="colll" />
        
          <br />
          <br />
          


<GridElement/>

          <div className="buy"  >
            <ul className="descc">
              Buy your fellow beings for <br /> your better life
            </ul>
            <BuyButton  className="buuuy"/>
            {/* <button className="viewButton2" onClick={buyPets}>
              Buy Pets <FaPaw />
            </button> */}
              <img className="buyP" src={buyP} alt="Buy Pets" />{" "}
          </div>
       
          <ScrollToTopButton />
          <Footer/>

        </>
      )}
    </div>
  );
};

export default Open;

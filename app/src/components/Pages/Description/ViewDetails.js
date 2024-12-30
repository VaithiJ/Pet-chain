import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import "./ViewDet.css";
import { AiOutlineEnvironment, AiOutlineHeart } from "react-icons/ai";
import qr from "../../Images/paw.png";
import NavBar from "../../Reusables/NavBar/NavBar";
import goldy from "../../Images/goldy.jpg";
import axios from "../../../url.js";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import QRCode from "qrcode.react";
import sadcat from "../../Images/sadcat.png";
import paww from "../../Images/paww.svg";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { FaHeart } from "react-icons/fa";
import NVmenu from "../../Reusables/NV/NBmenu";

const Viewdetails = (props) => {
  const navigate = useNavigate();
  const [daata, setDaata] = useState([]);
  const [isAddedtocart, setAddtoCart] = useState({});
  const [status, setStatus] = useState("");
  const [showQRCodeDetails, setShowQRCodeDetails] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [isWishListed, setWishList] = useState(false); // Changed the initial state to false
  const [verifyStatus, setVerifyStatus] = useState("");
  const isSingleImage = daata.imageUrl && daata.imageUrl.length === 1;
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const [showMarker, setShowMarker] = useState(false);
  const [showPopup, setShowpopup] = useState(false);
  const [showdetailsPopup, setdetailsShowpopup] = useState(false);



  const addd = () => {
    console.log(daata);
  };
  const { _id } = useParams();
  const stringId = String(_id);

  console.log(_id, "asadaasdasd");
  const addtowish = async () => {
    try {
      console.log(stringId);
      const response = await axios.get(`/wishlist/${stringId}`);
      console.log(response.data.wishlist);
      setWishList(true);
      setDaata(prevData => ({
        ...prevData,
        isWishlisted: "wishlisted"
      }));
    } catch (error) {
      console.error(error);
    }
  };
  
  const removewish = async () => {
    try {
      console.log(stringId);
      const response = await axios.get(`/removewishlist/${stringId}`);
      console.log(response.data.wishlist);
      setWishList(false);
      setDaata(prevData => ({
        ...prevData,
        isWishlisted: "not wishlisted"
      }));
    } catch (error) {
      console.error(error);
    }
  };
  

  const center = { lat: latitude, lng: longitude };

  const handleAdoptNow = async () => {
    if (!cookies.user_token) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to buy",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const tokenn = jwt_decode(cookies.user_token);

    if (tokenn.role === "buyer") {
      try {
        console.log(_id);
        navigate("/adoptionapplication");
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        title: "Invalid User",
        text: "You need to be a buyer to proceed",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/seller");
      });
    }
  };

  const handleFavoriteRemove = async (petId) => {
    try {
      const response = await axios.get(`/removewishlist/${petId}`);
      const updatedWishList = {
        ...isWishListed,
        [petId]: false,
      };
      setWishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const tokenn = jwt_decode(cookies.user_token);

      if (tokenn.role === "buyer") {
        console.log(_id);
        const response = await axios.get(`/addtocart/${_id}`);
        console.log(response.data.cart);

        setAddtoCart(response.data.cart);
        navigate("/cart");
      } else {
        Swal.fire({
          title: "Please Login",
          text: "You need to login to buy ",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to buy ",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
        console.log(response.data.user.longitude, response.data.user.latitude);
        setLatitude(parseFloat(response.data.user.latitude));
        setLongitude(parseFloat(response.data.user.longitude));
        setVerifyStatus(response.data.user.verifyStatus);
        setTimeout(() => {
          setLatitude(parseFloat(response.data.user.latitude));
          setLongitude(parseFloat(response.data.user.longitude));
          setShowMarker(true);
        }, 10); // Set the verifyStatus state based on the fetched data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleQRCodeClick = () => {
    const qrValue = `http://43.205.3.109:8082/trace/${_id}`; // Replace with your trace page URL
    window.open(qrValue, "_blank");
  };

  useEffect(() => {
    // Simulate fetching latitude and longitude after 3 seconds
  }, []);

  return (
    <div className="eno">
      <NVmenu />
      <div className="attai">
        <h1
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "90px",
            left: "60px",
            backgroundColor: "red",
            height: "60px",
            borderRadius: "10px",
            width: "400px",
            fontFamily: "Nunito",
            color: "white",
          }}
        >
          Details <img className="pawwww" src={paww} alt="Paw" />
        </h1>{" "}
        <section style={{ width: "400px", marginLeft: "-300px" }}>
          <div
            className="containerrrer"
            style={{ position: "relative", top: "200px", left: "-60px" }}
          >
            <div className="carousel">
            {daata.isWishlisted === "wishlisted" ? (
          <FaHeart
            style={{ marginLeft:"10px",color: "red", cursor:"pointer",zIndex:"1000", position:"relative", fontSize:"30px" }}
            className="heart-iconn"
            onClick={removewish}
          />
        ) : (
          <AiOutlineHeart
            style={{color:"red",  marginLeft:"10px",fontSize:"30px", position:"relative",zIndex:"1000", left:"-0px", cursor:"pointer" }}
            onClick={addtowish}
          />
        )}
              {daata.imageUrl && daata.imageUrl.length > 0 && (
                <>
                  {daata.imageUrl.map((imageUrl, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="slides"
                      defaultChecked={index === 0}
                      id={`slide-${index + 1}`}
                    />
                  ))}
                  <ul className="carousel__slides" style={{marginTop:"-40px"}}>
                    {daata.imageUrl.map((imageUrl, index) => (
                      <li
                        key={index}
                        style={{ width: "400px", height: "400px" }}
                        className="carousel__slide"
                      >
                        <figure>
                          <div>
                            <img
                              style={{ width: "300px", height: "400px" }}
                              src={imageUrl}
                              alt=""
                            />
                          </div>
                          <figcaption>
                            <span className="credit"></span>
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                  <ul className="carousel__thumbnails">
                    {daata.imageUrl.map((imageUrl, index) => (
                      <li key={index}>
                        <label htmlFor={`slide-${index + 1}`}>
                          <img src={imageUrl} alt="" />
                        </label>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
        {/* {daata.imageUrl && daata.imageUrl.length > 0 && (
          <img className="monster" src={daata.imageUrl[0]} alt="" />
        )}{" "} */}
        <div
          className="detailsbox"
          style={{ position: "relative", left: "-55px" }}
        >
          <h4 className="tncs">{daata.name}</h4>
          <div className="factory">
            {daata && daata.gender && (
              <p className="pbreed">
                {daata.breed},{" "}
                {daata.gender.charAt(0).toUpperCase() + daata.gender.slice(1)}
              </p>
            )}
          </div>
          <div className="idamm" style={{position:"relative", left:"-25px"}}>
            <div className="land">
              <AiOutlineEnvironment className="signified" />
              {daata && daata.location && (
                <p className="pdaata">
                  {daata.location.charAt(0).toUpperCase() +
                    daata.location.slice(1)}
                </p>
              )}
            </div>
            <p className="kaasu">₹{daata.price}</p>
            <p className="toomuch">
              {" "}
              <p>QR code</p>
              {verifyStatus === "verified" ? (
                <div className="qrcode-container">
                  <QRCode
                    className="qrrr"
                    onClick={handleQRCodeClick}
                    value={`http://43.204.148.111:8082/trace/${_id}`}
                    size={120}
                  />
                  <p>Scan QR Code for more details</p>
                </div>
              ) : (
                <>
                  <img
                    style={{ width: "200px", position: "relative" }}
                    src={sadcat}
                  />
                  <p style={{ position: "relative", top: "-30px" }}>
                    Sorry!, It's not yet verified
                  </p>
                </>
              )}
            </p>
          </div>
          <div className="pathukaapu"></div>
          <div className="diffBB">
            {daata.price == 0 ? (
              <button
                className="valthukal"
                style={{ position: "relative", left: "-100px" }}
                onClick={handleAdoptNow}
              >
                Adopt
              </button>
            ) : (
              <>
               
                <button
                  className="vaangu"
                  style={{ marginLeft: "-20px" }}
                  onClick={handleBuyNow}
                >
                  Add to Cart
                </button>
                <div className={`filteer-popup ${showPopup ? "" : "hidden"}`}>
                  <div className="contpop">
                    <h3
                      className="whole"
                      style={{
                        position: "relative",
                        left: "20px",
                        top: "20px",
                      }}
                    >
                      Contact Details{" "}
                      <span
                        className="closee-icon"
                        onClick={() => setShowpopup(false)}
                      >
                        &#x2715;
                      </span>
                    </h3>
                    <table className="info-table">
                      <tbody className="table-body">
                        <tr>
                          <td className="label-cell">Owner</td>
                          <td className="value-cell">{daata.owner}</td>
                        </tr>
                        <tr>
                          <td className="label-cell">Mobile</td>
                          <td className="value-cell">{daata.mobile}</td>
                        </tr>
                        <tr>
                          <td className="label-cell">Location</td>
                          <td className="value-cell">{daata.location}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ position: "fixed", marginTop: "40px" }}>
                      <LoadScript
                        googleMapsApiKey="AIzaSyDfKTA6DR3bkmi2nVaIlQ3AqonHKQI-NzE"
                        libraries={["places"]}
                      >
                        {latitude !== 0 && longitude !== 0 && (
                          <GoogleMap
                            zoom={10}
                            center={center}
                            mapContainerStyle={{
                              position: "relative",
                              left: "00px",
                              width: "360px",
                              height: "300px",
                            }}
                          >
                            {showMarker && <Marker position={center} />}
                          </GoogleMap>
                        )}
                      </LoadScript>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            className="vaanguur"
            style={{ marginLeft: "-20px" }}
            onClick={() => setShowpopup(!showPopup)}
          >
            Contact Owner{" "}
          </button>
          <button
            className="vaanguuur"
            style={{ marginLeft: "-20px" }}
            onClick={() => setdetailsShowpopup(!showdetailsPopup)}
          >
            Full Details{" "}
          </button>

          <br />
          <br />
        </div>
      </div>
      <div className={`filteer-popup ${showdetailsPopup ? "" : "hidden"}`}>

      <div style={{ display: "flex", flexDirection: "column" }}>
  <div 
  >
    <p className="whole" >
      Pet Overview  <span
                        className="closee-icon"
                        onClick={() => setdetailsShowpopup(false)}
                      >
                        &#x2715;
                      </span>
    </p>
    <br />
    <table className="overview-table">
      <tbody>
        <tr>
          <td className="labell-cell">Name:</td>
          <td className="valuee-cell">{daata.name}</td>
        </tr>
        <tr>
          <td className="labell-cell">Breed:</td>
          <td className="valuee-cell">{daata.breed}</td>
        </tr>
        <tr>
          <td className="labell-cell">Gender:</td>
          <td className="valuee-cell">{daata.gender}</td>
        </tr>
        <tr>
          <td className="labell-cell">Life Stage:</td>
          <td className="valuee-cell">{daata.age}</td>
        </tr>
        <tr>
          <td className="labell-cell">Owner:</td>
          <td className="valuee-cell">{daata.owner}</td>
        </tr>
        <tr>
          <td className="labell-cell">Price:</td>
          <td className="valuee-cell">₹{daata.price}</td>
        </tr>
        <tr>
          <td className="labell-cell">City:</td>
          <td className="valuee-cell">{daata.city}</td>
        </tr>
        <tr>
          <td className="labell-cell">Mobile:</td>
          <td className="valuee-cell">{daata.mobile}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  );
};

export default Viewdetails;

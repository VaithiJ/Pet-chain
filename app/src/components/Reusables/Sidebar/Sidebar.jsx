import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router";
import axios from "../../../url.js";
import goldy from "../../Images/goldy.jpg";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import catGif from "../../Images/cat.gif";
import bengal from "../../Images/bengall.png"
import paww from "../../Images/paww.svg";
import NVmenu from "../NV/NBmenu";


function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState("Collection");
  const [daata, setDaata] = useState([]);
  const [token, setToken] = useState([]);
  const [daaata, setDaaata] = useState([]);
  const [adoptData, setAdoptData] = useState([]);
  const [hoveredPet, setHoveredPet] = useState(null);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();
  const descript = (id) => {
    navigate(`/sellerdescription/${id}`);
  };
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);

  const handleLogout = () => {
    removeCookie("user_token");
    navigate("/");
  };
  const handleMouseEnter = (petId) => {
    setHoveredPet(petId);
  };

  const handleMouseLeave = () => {
    setHoveredPet(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allPets");
        const petsData = response.data.pets;
        setDaata(petsData);
        petsData.forEach((pet) => {
          console.log(pet.name);
        });

        const responseee = await axios.get("/adoptedPet");
        const petsDataa = responseee.data.pets;
        console.log(petsDataa);
        setAdoptData(petsDataa);
        petsDataa.forEach((pet) => {
          console.log(pet.name);
        });

        const responsee = await axios.get("/images");
        const imagesData = responsee.data;
        setDaaata(imagesData);
        imagesData.forEach((i) => {
          console.log(i.imageUrl);
        });
        

        // Match IDs and make the POST request
        const matchingIDs = petsData
          .map((pet) => pet._id)
          .filter((id) => imagesData.find((image) => image._id === id));

        matchingIDs.forEach(async (id) => {
          const matchingImage = imagesData.find((image) => image._id === id);
          try {
            await axios.post("/imageUrl", {
              imageUrl: matchingImage.imageUrl,
              ids: [id],
            });
            console.log("Image URL posted for ID:", id);
          } catch (error) {
            console.log("Error posting image URL for ID:", id, error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedMenu === "Collection") {
      fetchData();
    }
  }, [selectedMenu]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    try {
      const tokenn = jwt_decode(cookies.user_token);
      setToken(tokenn);
      // Do something with the decoded token
    } catch (error) {
      // Display SweetAlert message when JWT decode fails
      Swal.fire({
        icon: "error",
        title: "Invalid Token",
        text: "Please log in",
      }).then(() => {
        navigate("/");
      });
    }
  }, [cookies.user_token, navigate]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <img style={{ marginTop: "200px" }} src={catGif} alt="Loader" />
        </div>
      ) : (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          className="sidebar-container"
          style={{
            width: "21%",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div className="app">
            <aside className="sidebar">
              <header></header>
              <nav className="sidebar-nav">
                <br />
                <br />
                <ul>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    Dashboard
                  </p>
                  <li>
                    <a href="#" onClick={() => handleMenuClick("Collection")}>
                      <i className="ion-ios-analytics-outline"></i>{" "}
                      <span style={{ fontFamily: "Nunito, sans-serif" }}>
                        Your Additions
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleMenuClick("Product")}>
                      <i className="ion-ios-settings"></i>{" "}
                      <span style={{ fontFamily: "Nunito, sans-serif" }}>
                        Sell
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href="#" onClick={() => handleMenuClick("Orders")}>
                      <i className="ion-bag"></i>{" "}
                      <span style={{ fontFamily: "Nunito, sans-serif" }}>
                        Orders
                      </span>
                    </a>
                  </li>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <li>
                    <a
                      style={{ position: "relative", top: "100px" }}
                      onClick={handleLogout}
                    >
                      <i className="ion-ios-analytics-outline"></i>{" "}
                      <span
                        style={{
                          color: "red",
                          fontFamily: "Nunito, sans-serif",
                          position: "relative",
                          cursor:"pointer"
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div className="dashorder">
            {selectedMenu === "Orders" && (
              <div className="pettt-card">
                {Array.isArray(adoptData) && adoptData.length > 0 ? (
                  adoptData
                    .filter((pet) => token.name === pet.owner) // Filter the data based on owner name
                    .map((pet) => (
                      <div
                        key={pet._id}
                        className="carr-card"
                        // onClick={() => descript(pet._id)}
                      >
                        <div>
                          <p className="car-title">{pet.name}</p>
                          <p className="car-info">{pet.email}</p>
                          <p className="car-location">{pet.mobile}</p>
                          <p className="car-price"> {pet.address}</p>
                          <p className="car-price"> {pet.addInfo}</p>

                          <br />
                        </div>
                      </div>
                    ))
                ) : (
                  <h1
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "-610px",
                    left: "360px",
                    backgroundColor: "red",
                    height: "60px",
                    borderRadius: "10px",
                    width: "400px",
                    fontFamily: "Nunito",
                    color: "white",
                  }}
                >
                  No orders Available <img className="pawwww" src={paww} alt="Paw" />
                </h1>                )}
              </div>
            )}
            {selectedMenu === "Product" && (
              <div>
                <h1
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "70px",
                    left: "60px",
                    backgroundColor: "red",
                    height: "60px",
                    borderRadius: "10px",
                    width: "300px",
                    fontFamily: "Nunito",
                    color: "white",
                  }}
                >
                  Sell <img className="pawwww" src={paww} alt="Paw" />
                </h1>{" "}
                <img src={bengal} style={{width:"600px", zIndex:"1", marginTop:"90px"}}/>

                <div className="inn"  style={{position:"relative",zIndex:"1", top:"-130px", height:"150px", borderRadius:"10px"}}>
                  <h2 className="innerorder">
                    Time for others
                    </h2>
     
                    <h2 className="innerorder1"> to experience your love</h2>
                  <p style={{position:"relative",top:"-30px"}}>Sell your fellow buddies!</p>
                  <button
                    className="addpro"
                    onClick={() => navigate("/sellitem")}
                    style={{position:"relative", top:"-210px"}}
                  >
                    Sell 
                  </button>
                </div>
              </div>
            )}

            {selectedMenu === "Categories" && (
              <div>
                <p className="innerhead">Categories</p>
                <p className="innerorder">
                  Create Categories to group your product.
                </p>
                <button className="addpro">Add Categories</button>
              </div>
            )}
            {selectedMenu === "Collection" && (
              <div className="sdasds">
                {" "}
                <h1
                className="h1h1"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "70px",
                    left: "60px",
                    backgroundColor: "red",
                    height: "60px",
                    borderRadius: "10px",
                    width: "300px",
                    fontFamily: "Nunito",
                    color: "white",
                  }}
                >
                  Your additions  <img className="pawwww" src={paww} alt="Paw" />
                </h1>
                <div className="petttt-card" style={{position:"relative", top:"-20px"}}>
                  {Array.isArray(daata) && daata.length > 0 ? (
                    daata
                      .filter((pet) => token.name === pet.owner) 
                      .map((pet) => (
                        <div
                          key={pet._id}
                          className="carr-card"
                          onClick={() => descript(pet._id)}
                          style={{ marginTop: "-10px" }}
                          onMouseEnter={() => handleMouseEnter(pet._id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div>
                            <img
                              className="car-image"
                              src={pet.imageUrl}
                              alt="Pet"
                              style={{ width: "200px", height: "300px" }}
                            />
                            {hoveredPet === pet._id && (
                              <div
                                className="popuup"
                                onClick={() => descript(pet._id)}
                              >
                                <div className="asdff">
                                  <p
                                    className="pet-name"
                                    style={{
                                      color: "white",
                                      fontFamily: "Nunito",
                                      position: "relative",
                                      top: "30px",
                                    }}
                                  >
                                    {pet.name}
                                  </p>
                                  <p
                                    className="pet-details"
                                    style={{
                                      color: "white",
                                      fontFamily: "Nunito",
                                      position: "relative",
                                    }}
                                  >
                                    {pet.breed}
                                  </p>
                                  <p
                                    className="pet-details"
                                    style={{
                                      color: "white",
                                      fontFamily: "Nunito",
                                      position: "relative",
                                    }}
                                  ></p>
                                </div>
                              </div>
                            )}
                            <br />
                          </div>
                        </div>
                      ))
                  ) : (
                    <p>No pets available.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    )}
  </>
);
};
  

export default Sidebar;

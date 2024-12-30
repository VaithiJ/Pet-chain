import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
} from "react-icons/fi";
import "./NVmenu.css";
import petChain from "../../Images/pc.png";
import paw from "../../Images/paw.png";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Wishlist from "../Wishlist/Wishlist";
import axios from "../../../url";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

const NVmenu = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopup, setisPopup] = useState(false);
  const [isVerSellPopup, setisVerSellPopup] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Added state for dropdown visibility
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility state
  };

  const handleLogOut = () => {
    removeCookie("user_token");
    window.location.reload();
  };

  // const tokenn = jwt_decode(cookies.user_token);
  const popupRef = useRef(null);
  const popupTimeout = useRef(null);

  const verifypagee = () => {
    window.open("http://43.205.3.109:8082/verification", "_blank");
  };

  const handleSellVerify = () => {
    Swal({
      title: "Login Required",
      text: "Please log in to sell or verify.",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willLogin) => {
      if (willLogin) {
        // Redirect to the login page
        window.location.href = "/login";
      }
    });
  };

  const openLogPopup = () => {
    setisPopup(true);
  };

  const closeLogPopup = () => {
    setisPopup(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openVerPopup = () => {
    setisVerSellPopup(true);
  };

  const closeVerPopup = () => {
    setisVerSellPopup(false);
  };

  const handlePopupMouseEnter = () => {
    clearTimeout(popupTimeout.current);
  };

  const handlePopupMouseLeave = () => {
    closePopup();
  };
  const handlePopuppMouseLeave = () => {
    closeLogPopup();
  };
  const handlePopupppMouseLeave = () => {
    closeVerPopup();
  };

  const handleBuyNow = async () => {
    try {
      const tokenn = jwt_decode(cookies.user_token);

      if (tokenn.role === "buyer") {
        console.log("asdasdsad");
        window.location.href = "/cart";
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
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/allpets", { withCredentials: true });
        const allPets = response.data?.pets ?? [];
        const filteredWishlist = allPets.filter(
          (pet) => pet.isWishlisted === "wishlisted"
        );
        setWishlist(filteredWishlist);
        console.log("wishlist", filteredWishlist);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, [isPopupOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        (prevScrollPos > currentScrollPos && currentScrollPos > 0) ||
          currentScrollPos < 30
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (isPopupOpen) {
      popupTimeout.current = setTimeout(() => {
        closePopup();
      }, 3000);

      return () => {
        clearTimeout(popupTimeout.current);
      };
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (isPopup) {
      popupTimeout.current = setTimeout(() => {
        closeLogPopup();
      }, 3000);

      return () => {
        clearTimeout(popupTimeout.current);
      };
    }
  }, [isPopup]);

  useEffect(() => {
    if (isVerSellPopup) {
      popupTimeout.current = setTimeout(() => {
        closeVerPopup();
      }, 3000);

      return () => {
        clearTimeout(popupTimeout.current);
      };
    }
  }, [isVerSellPopup]);

  //   const [isMenuOpen, setIsMenuOpen] = useState(false);

  //   const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  //   };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const homepage =()=>{
    navigate("/")
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    // <nav className={`nav-container ${visible ? "visible" : "hidden"}`}>
    <nav class="navbar">
      <div class="burger-nvmenu" onClick={toggleMenu}>
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
      <img onClick={homepage} src={petChain} alt="Your Logo" class="logo-image-nvmenu" />
      <div className={`menu-items-nvmenu ${isMenuOpen ? "show" : ""}`}>
        <div class="menu-nvmenu menu-left-nvmenu">
          <a className="likn"  href="/">Home</a>
          <a className="likn" href="/marketplace">Pet List</a>
          <a className="likn" href="http://43.205.3.109:8082/verification" target="_blank">
            Verify
          </a>
          {/* <a href="/marketplace">Contact Us</a> */}
        </div>
      </div>
      <div class="menu-nvmenu menu-right-menu">
        <p onMouseEnter={openLogPopup}>
          <FiUser className="fius"  />
        </p>
        <p onMouseEnter={openPopup}>
          <FiHeart className="fius" />
        </p>
        <p onClick={handleBuyNow}>
          <FiShoppingCart className="fius" />
        </p>
      </div>
      {isVerSellPopup && (
        <div
          className="logpopup"
          style={{ marginLeft: "-200px" }}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupppMouseLeave}
          ref={popupRef}>
          <Link to="/login">
            <button className="logButton">Sell</button>
          </Link>
          <button onClick={verifypagee} className="logButton">
            Verify
          </button>
        </div>
      )}

      {isPopup && (
        <div
          className="logpopup" style={{marginTop:"-175px"}}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopuppMouseLeave}
          ref={popupRef}>
          <h2 className="buyss">Buyer/Seller</h2>
          {cookies.user_token ? (
            <>
              <button
                className="logButton"
                style={{ position: "relative" }}
                onClick={handleLogOut}>
                Logout
              </button>
              <Link to="/register">
                <button
                  className="logButton"
                  style={{
                    position: "relative",
                    left: "-10px",
                    top: "25px",
                  }}>
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="logButton" style={{ position: "relative" }}>
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="logButton"
                  style={{
                    position: "relative",
                    left: "-10px",
                    top: "25px",
                  }}>
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      )}

      {isPopupOpen && (
        <div
          className="wishpopup" style={{marginTop:"-00px"}}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
          ref={popupRef}>
          <Wishlist />
          {/* <h1 style={{ marginLeft: "-150px" }}>Wishlist</h1>
          {wishlist.map((item) => (
            <div className="wishList" key={item.petId}>
              <Link to="/">
                <img className="wishPic" src={item.image} alt={item.name} />
                <div className="wishText">{item.name}</div>
              </Link>
              <p className="wishPrice">1 x {item.price}</p>
              <FaTrash className="wishTrash" />
            </div>
          ))} */}
        </div>
      )}
    </nav>
    // </nav>
  );
};

export default NVmenu;

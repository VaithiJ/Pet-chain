import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./Nav.css";
// import logoImage from "./../vas.png";

const Nav = () => {
  return (
    <nav className="nav-dcontainer">
      <div className="logo">
        <Link to="/">
          <img src={""} alt="Your Logo" className="logo-image" />
        </Link>
      </div>
      <div className="sub-nav">
        <Link to="/sarees">Sarees</Link>
        <Link to="/duppatta">Duppatta</Link>
        <Link to="/dhotis">Dhotis</Link>
        <Link to="/fabric">Fabric</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>
          <FiSearch />
        </button>
      </div>
      <div className="right-icons">
        <Link to="/profile">
          <FiUser />
        </Link>
        <Link to="/wishlist">
          <FiHeart />
        </Link>
        <Link to="/cart">
          <FiShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

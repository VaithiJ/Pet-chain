import React, { useState, useEffect } from "react";
import "./Wishlist.css";
import axios from "../../../url";
import { Link, useNavigate } from "react-router-dom";
import goldy from "../../Images/goldy.jpg";


function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
const navigate = useNavigate();
const removeFromWishlist = async (petId) => {
  try {
    const response = await axios.get(`/removewishlist/${petId}`);
    console.log(response.data.wishlist);
    
    // Remove item from wishlist state
    setWishlist((prevList) => prevList.filter((pet) => pet._id !== petId));
    
    // Remove item from localStorage
    const localStorageWishlist = JSON.parse(localStorage.getItem("wishlist"));
    const updatedLocalStorageWishlist = localStorageWishlist.filter((pet) => pet._id !== petId);
    localStorage.setItem("wishlist", JSON.stringify(updatedLocalStorageWishlist));
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/allpets", { withCredentials: true });
        const allPets = response.data?.pets ?? [];
        const filteredWishlist = allPets.filter((pet) => pet.isWishlisted === "wishlisted");
        setWishlist(filteredWishlist);
        console.log("wishlist", filteredWishlist);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="Wishlist">
      <div className="Wishlist1">
        <h3 style={{ marginLeft: "10px", color: "#00154D" }}>Wishlist</h3>
        <hr className="line" />

        <div className="Wishlist2">
          {wishlist.length > 0 ? (
            wishlist.map((pet) => (
              <div className="Wishcard" key={pet._id}>
                <div className="Wishcard1">
                  <img className="wishimg" src={pet.imageUrl[0]} alt={pet.name} />
                  <div className="Wishttext">
                    <h3 className="wishtext1">{pet.name}</h3>
                    <h4 className="wishtext2">{pet.breed}</h4>
                  </div>
                  <div className="WishTEXT">
                    <h4 className="wishtext3">Rs: {pet.price}</h4>
                    <Link  to={`/description/${pet._id}`}>
  <button className="viewbutwish" >View</button>
</Link>          
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;



// const { test } = require('@playwright/test');

// test('login test', async ({ page }) => {
//   await page.goto('https://www.blockedge.io/schedule-a-demo'); 

//   await page.fill('input[name="name"]', 'your_name');
//   await page.fill('input[name="email"]', 'name@blockedge.io');
//   await page.fill('input[name="designation"]', 'Developer'); 
//   await page.fill('input[name="company"]', 'SecureKloud'); 
//   await page.selectOption('select[name="country"]', 'India'); 
//   await page.selectOption('select[name="sect"]', 'Email'); 
//   await page.check('input[name="terms"]');
//   await page.click('button[name="act"]');
//   await page.screenshot({path: `/downloads/block_screenshot.png`})
// });

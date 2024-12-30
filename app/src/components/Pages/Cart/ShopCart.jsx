import React, { useState, useEffect } from "react";
import "./Shopcart.css";
import NavBar from "../../Reusables/NavBar/NavBar";
import axios from "../../../url";
import goldy from "../../Images/goldy.jpg";
import { FaTrashAlt } from "react-icons/fa";
import empty from "../../Images/empty.png"
import NVmenu from "../../Reusables/NV/NBmenu";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: "0.00",
    tax: "0.00",
    shipping: "0.00",
    total: "0.00",
  });

  const removeItem = async (petId) => {
    try {
      console.log(petId);
      const response = await axios.get(`/removetocart/${petId}`);
      console.log(response.data);

      const updatedCartItems = cartItems.filter((item) => item._id !== petId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );
  };

  useEffect(() => {
    const fetchCartlist = async () => {
      try {
        const response = await axios.get("/allpets", { withCredentials: true });
        const allPets = response.data?.pets ?? [];
        const filteredCartlist = allPets.filter(
          (pet) => pet.isAddedtocart === "added"
        );
        console.log("filteredCartlist", filteredCartlist);

        const updatedCartItems = filteredCartlist.map((item) => ({
          ...item,
          price: parseFloat(item.price), // Convert price to a number
          quantity: 1, // Set initial quantity to 1
        }));
        console.log("updatedCartItems", updatedCartItems);

        setCartItems(updatedCartItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartlist();
  }, []);

  useEffect(() => {
    const recalculateCart = () => {
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        // Cart is empty, return default values
        return {
          subtotal: "0.00",
          tax: "0.00",
          shipping: "0.00",
          total: "0.00",
        };
      }

      // Calculate totals
      let subtotal = 0;
      cartItems.forEach((item) => {
        subtotal += item.price * item.quantity;
      });
      const taxRate = 0.005;
      const shippingRate = 15.0;
      const tax = subtotal * taxRate;
      const shipping = subtotal > 0 ? shippingRate : 0;
      const total = subtotal + tax + shipping;

      return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2),
      };
    };

    setCartTotals(recalculateCart());
  }, [cartItems]);

  return (
    <div>
      <NVmenu />
      <br />
      <br />
      <br />
      <br />

      <div className="shopping-cart" style={{ marginTop: "40px" }}>
        <div className="column-labels">
          <label className="product-image" style={{color:"black"}}>Image</label>
          <label className="product-details">Product</label>
          <label className="product-price" style={{ position: "relative", left: "-100px", fontFamily:"Nunito", color:"red" }}>Price</label>
          <label className="product-removal" style={{ position: "relative", left: "-100px",fontFamily:"Nunito",color:"red" }}>Remove</label>
          <label className="product-line-price" style={{ position: "relative", left: "-120px",fontFamily:"Nunito",color:"red" }}>Total</label>
        </div>

        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="product" key={item.id}>
              <div className="product-image">
                <img src={item.imageUrl} alt="Product" />
              </div>
              <div className="product-details">
                <div className="product-title" style={{ position: "relative", top: "20px", fontSize: "20px", fontFamily: "Nunito", left: "-100px" }}>{item.breed}</div>
                <p className="product-description" style={{ position: "relative", top: "20px", fontSize: "20px", fontFamily: "Nunito", color: "red", left: "-100px" }}>{item.name}</p>
              </div>
              <div className="product-price" style={{ position: "relative", top: "30px", fontSize: "20px", fontFamily: "Nunito", left: "-100px" }}>{item.price.toFixed(2)}</div>


              <div className="product-removal" style={{ position: "relative", top: "30px", fontSize: "20px", fontFamily: "Nunito", left: "-100px" }}>
                
              <FaTrashAlt className="faalt" style={{ width:"30px",height:"30px"}}  onClick={() => removeItem(item._id)}/>
              </div>
              <div className="product-line-price" style={{ position: "relative", top: "30px", fontSize: "20px", fontFamily: "Nunito", left: "-100px" }}>
                {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
            <div className="empty-cart-message">
              <img src={empty} style={{width:"300px", height:"300px"}}/>
              <p style={{fontFamily:"Nunito", fontSize:"20px", color:"red"}}>Your cart is empty.</p>
              </div>
          )}

        <div className="totals" style={{ marginRight: "230px",marginTop:"20px", fontSize: "20px" }}>
          <div className="totals-item">
            <label style={{fontFamily:"Nunito"}}>Subtotal</label>
            <div className="totals-value" id="cart-subtotal">
              {cartTotals.subtotal}
            </div>
          </div>
          <div className="totals-item">
            <label style={{fontFamily:"Nunito"}}>Tax (0.5%)</label>
            <div className="totals-value" id="cart-tax">
              {cartTotals.tax}
            </div>
          </div>
          <div className="totals-item">
            <label style={{fontFamily:"Nunito"}}>Shipping</label>
            <div className="totals-value" id="cart-shipping">
              {cartTotals.shipping}
            </div>
          </div>
          <div className="totals-item totals-item-total">
            <label style={{fontFamily:"Nunito"}}>Grand Total</label>
            <div className="totals-value" id="cart-total">
              {cartTotals.total}
            </div>
          </div>
        </div>

        <button className="checkout" style={{ position: "relative", left: "-200px" }}>Checkout</button>
        <br/>
        <br/>
      </div>
    </div>
  );
};

export default Cart;

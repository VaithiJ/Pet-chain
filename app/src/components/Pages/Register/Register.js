import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"
import NavBar from "../../Reusables/NavBar/NavBar";
import kitty from "../../Images/speak.jpg"
import axios from "../../../url.js"
import { useNavigate } from "react-router-dom";
import preview from "../../Images/previeww.jpg"
import Swal from "sweetalert2";
import NVmenu from "../../Reusables/NV/NBmenu";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLocationClick = () => {
    window.open("https://maps.google.com", "_blank");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const Toast = Swal.mixin({

        toast: true,

        position: "top-end",

        showConfirmButton: false,

        timer: 3000,

        timerProgressBar: true,

        didOpen: (toast) => {

          toast.addEventListener("mouseenter", Swal.stopTimer);

          toast.addEventListener("mouseleave", Swal.resumeTimer);

        },

      });




      Toast.fire({

        icon: "error",

        title: "Passwords doesn't match",

        showCloseButton: true,

      });      return;
    }
    try {
      const response = await axios.post(`/register`, {
        name,
        mobile,
        password,
        location,
        email,
        role,
      });
      console.log("hiighji");
      console.log(response.data);
      const Toast = Swal.mixin({

        toast: true,

        position: "top-end",

        showConfirmButton: false,

        timer: 3000,

        timerProgressBar: true,

        didOpen: (toast) => {

          toast.addEventListener("mouseenter", Swal.stopTimer);

          toast.addEventListener("mouseleave", Swal.resumeTimer);

        },

      });




      Toast.fire({

        icon: "success",

        title: "Registered successfully",

        showCloseButton: true,

      });
      navigate("/login");
    } catch (error) {
      console.log("wrongyyyy");
      const Toast = Swal.mixin({

        toast: true,

        position: "top-end",

        showConfirmButton: false,

        timer: 3000,

        timerProgressBar: true,

        didOpen: (toast) => {

          toast.addEventListener("mouseenter", Swal.stopTimer);

          toast.addEventListener("mouseleave", Swal.resumeTimer);

        },

      });




      Toast.fire({

        icon: "error",

        title: "Error while registering",

        showCloseButton: true,

      });
      console.error(error);
    }

    // Validation and submit logic goes here

    // Reset the form
    setName("");
    setmobile("");
    setEmail("");
    setLocation("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
  };

  return (
    <div>
            <NVmenu/>

    <div style={{display:"flex", flexDirection:"row"}}>
            <img className="previewwpet"  src={preview}/>
    <div className="sign-in-page">
      <h2>Sign In</h2>
      <form className="signform" onSubmit={handleSubmit}>
        <div>
          <label className="signlab">Name:</label>
          <input className="signinp"
            type="text"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Role:</label>
          <select className="signsel"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div>
          <label className="signlab">Phone Number:</label>
          <input className="signinp"
            type="number"
            name="Mobile"

            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Email:</label>
          <input className="signinp"
            type="email"
            name="Email"

            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Location:</label>
          <input className="signinp"
            type="text"
            value={location}
            name="Location"

            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Password:</label>
          <input className="signinp"
            type="password"
            value={password}
            name="Pass"

            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Confirm Password:</label>
          <input className="signinp"
            type="password"
            name="Passs"

            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      
        <button className="signbut" type="submit">Sign In</button>
      </form>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
    </div>
    </div>
  );
};

export default RegisterPage;

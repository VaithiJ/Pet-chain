import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import NavBar from "../../Reusables/NavBar/NavBar";
import kitty from "../../Images/cdh.jpg";
import axios from "../../../url.js";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import catGif from "../../Images/cat.gif";
import preview from "../../Images/previeww.jpg"
import Swal from "sweetalert2";
import NVmenu from "../../Reusables/NV/NBmenu";


const LoginPage = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const [showLoader, setShowLoader] = useState(true);
  const [ttoken, setTToken] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/login`,
        { name, password },
        { withCredentials: true }
      );

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

        title: "Signed in successfully",

        showCloseButton: true,

      });
      const role = response.data.role;

      // Based on the role, navigate to the respective page
      switch (role) {
        case "buyer":
          navigate("/marketplace");
          break;
        case "seller":
          navigate("/seller");
          break;

        default:
          console.log("Invalid role");
          break;
      }
    } catch (error) {
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
      console.error(error);
      Toast.fire({

        icon: "error",

        title: "Check your credentials",

        showCloseButton: true,

      });
      if (error.response && error.response.status === 401) {
        Toast.fire({

          icon: "error",
  
          title: "Check your credentials",
  
          showCloseButton: true,
  
        });
        setErrorMessage("User not found");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Incorrect password");
      } else {
        setErrorMessage("Invalid name or password");
      }
    }

    // Reset the form
    setName("");
    setPassword("");
  };

  useEffect(() => {
    const sellOrBuy = async () => {
      try {
        const token = cookies.user_token;
        console.log(token);
        if (token) {
          setTimeout(async () => {
            setShowLoader(false);
    
            try {
              const decodedToken = jwt_decode(token);
              console.log(decodedToken);
              await setTToken(decodedToken);
    
              const role = decodedToken.role;
    
              // Based on the role, navigate to the respective page
              switch (role) {
                case "buyer":
                  navigate("/marketplace");
                  break;
                case "seller":
                  navigate("/seller");
                  break;
                default:
                  console.log("Invalid role");
                  break;
              }
            } catch (error) {
              console.error(error);
              // Handle invalid token error here
            }
          }, 2000);
        } else {
          setShowLoader(false);
        }
      } catch (error) {
        console.error(error);
        setShowLoader(false);
      }
    };
    
    

    sellOrBuy();
  }, [cookies, navigate]);

  return (
    <div >
     <NVmenu/>
     {showLoader ? (
  <div className="loader">
    <img style={{ marginTop: "200px" }} src={catGif} alt="Loading..." />
    {cookies.user_token ? (
      <h2 className="loggg" style={{ marginLeft: "30px" }}>
        Logging in {jwt_decode(cookies.user_token)?.name} (
        {jwt_decode(cookies.user_token)?.role})......
      </h2>
    ) : (
      <h2 className="loggg" style={{ marginLeft: "30px" }}>
        Logging in......
      </h2>
    )}
  </div>
) : (
  <div style={{display:"flex", flexDirection:"row"}}>
    
            <img className="previewwpet"  src={preview}/>

        <div className="login-in-page">
          
        <h2>Log In</h2>
        <form className="loginform" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div>
            <label className="loginlab">Name:</label>
            <input
              className="logininp"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="loginlab">Password:</label>
            <input
              className="logininp"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="loginbut" type="submit">
            Log In
          </button>
        </form>
        <div>
        New here? <Link to="/register">Sign In</Link>
      </div>
        </div>
        </div>
      )}
     
    </div>
  );
};

export default LoginPage;

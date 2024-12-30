import React, { useState } from "react";
import axios from "../../../url";
import "./AdoptApp.css";
import NavBar from "../../Reusables/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import NVmenu from "../../Reusables/NV/NBmenu";

function AdoptionPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [addInfo, setAdditionalInfo] = useState("");
  const [owner, setOwner] = useState(""); // This can be the unique identifier of the pet being adopted

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "mobile") {
      setMobile(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "additionalInfo") {
      setAdditionalInfo(value);
    } else if (name === "owner") {
      setOwner(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/adopted`, {
        name,
        email,
        mobile,
        address,
        addInfo,
        owner,
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }

  
  };

  return (
    <div>
      <NVmenu />
      <div className="assddsa">
        <h2 style={{ marginTop: "170px", position: "relative", top: "40px" }}>
          Adoption Form
        </h2>

        <div
          className="description show"
          style={{ width: "300px", marginLeft: "250px", marginTop: "80px" }}
        >
          <div className="det">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" style={{ color: "black" }}>
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ color: "black" }}>
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile" style={{ color: "black" }}>
                  Mobile:
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" style={{ color: "black" }}>
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="additionalInfo" style={{ color: "black" }}>
                  Additional Information:
                </label>
                <input
                  type="text"
                  id="additionalInfo"
                  name="additionalInfo"
                  value={addInfo}
                  onChange={handleInputChange}
                />
              </div>

              <br />
              <div style={{ marginLeft: "80px" }}>
                <button
                  className="option2-button"
                  style={{ marginLeft: "-70px" }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptionPage;

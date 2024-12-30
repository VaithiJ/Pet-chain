import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import { AiOutlineEnvironment, AiOutlineHeart } from "react-icons/ai";
import qr from "../../Images/paw.png";
import NavBar from "../../Reusables/NavBar/NavBar";
import SellerBar from "../../Reusables/SellerBar/SellerBar";
import goldy from "../../Images/goldy.jpg";
import axios from "../../../url.js";
import { useParams } from "react-router-dom";
import paww from "../../Images/paww.svg";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import NVmenu from "../../Reusables/NV/NBmenu";



const SellerDescription = (props) => {
  const [daata, setDaata] = useState([]);

  const navigate = useNavigate();
  const descript = (id) => {
    navigate(`/updatePet/${id}`);
  };

  const submitted = async(id) =>{
    try {
      console.log(id)
      const responsee = await  axios.get(`/verification/${id}`);
      console.log(responsee.data.verify);
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

        title: "Submitted for verification",

        showCloseButton: true,

      });

      window.location.reload()
      
    } catch (error) {
      console.log(error);
    }
  }
  const addd = () => {
    console.log(daata);
  };

  const { _id } = useParams();
  console.log(_id, "asadaasdasd");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <SellerBar/>
      <div className="attai">
      <h1 className="h1h1"
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
                    width: "300px",
                    fontFamily: "Nunito",
                    color: "white",
                  }}
                >
                  Description <img className="pawwww" src={paww} alt="Paw" />
                </h1>{" "}
                

        <img className="monster" style={{marginLeft:"-240px", height:"325px"}} src={daata.imageUrl} alt="" />
        

        <div className="detailsbox" style={{marginTop:"170px"}}>
          
          <div className="details show" >
          {/* <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
    */}
 <table style={{ borderRadius:"20px", width: '800px', height: '300px', margin: '20px auto',fontFamily:"Nunito", border: '2px solid #000', position:"relative", top:"-10px" }}>
              <tbody >
                <tr>
                  <td style={{borderRadius:"10px", textAlign: 'center', padding: '10px', backgroundColor:"#F9FF9E" }}>Name:</td>
                  <td colSpan={2} style={{borderRadius:"10px", backgroundColor:"#BEC7FF", textAlign: 'center', padding: '10px' }}>{daata.name}</td>
                </tr>
                <tr>
                  <td style={{textAlign: 'center', padding: '10px' , backgroundColor:"#F9FF9E"}}>Breed:</td>
                  <td colSpan={2} style={{backgroundColor:"#BEC7FF",  textAlign: 'center', padding: '10px' }}>{daata.breed}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center', padding: '10px', backgroundColor:"#F9FF9E" }}>Gender:</td>
                  <td colSpan={2} style={{ backgroundColor:"#BEC7FF", textAlign: 'center', padding: '10px' }}>{daata.gender}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center', padding: '10px', backgroundColor:"#F9FF9E" }}>Category:</td>
                  <td colSpan={2} style={{ backgroundColor:"#BEC7FF", textAlign: 'center', padding: '10px' }}>{daata.category}</td>
                </tr>
                <tr>
                  <td style={{  textAlign: 'center', padding: '10px', backgroundColor:"#F9FF9E" }}>Price:</td>
                  <td colSpan={2} style={{backgroundColor:"#BEC7FF", textAlign: 'center', padding: '10px' }}>{daata.price}</td>
                </tr>
                <tr>
                  <td style={{  textAlign: 'center', padding: '10px', backgroundColor:"#F9FF9E" }}>Life Stage:</td>
                  <td style={{backgroundColor:"#BEC7FF", textAlign: 'center', padding: '10px' }}>{daata.age}</td>

                       </tr>
             
                <tr>
                  <td style={{borderRadius:"10px",  textAlign: 'center', padding: '10px', backgroundColor:"#F9FF9E" }}>Verify Status:</td>
                  <td colSpan={3} style={{borderRadius:"10px", backgroundColor:"#BEC7FF", textAlign: 'center', padding: '10px', color: daata.verifyStatus === "verified" ? "green" : "red" }}>
                    {daata.verifyStatus}
                  </td>                </tr>
              
              </tbody>
            </table>



            {daata.submittedForVerification === "not submitted" ? (
  <button
    onClick={() => descript(daata._id)}
    style={{ height: "50px", width: "200px", borderRadius: "10px", position: "relative",top:"-20px", left: "150px" }}
    className="option2-button"
  >
    Update Pet Details
  </button>
) : null}      
{
  daata.verifyStatus === "verified" ? (
    // If verifyStatus is "verified", do not show any buttons
    null
  ) : daata.submittedForVerification === "not submitted" ? (
    // Show the "Submit for verification" button
    <button
      onClick={() => submitted(daata._id)}
      style={{ height: "50px", width: "200px", borderRadius: "10px",top:"-70px", position: "relative", left: "400px" }}
      className="option2-button"
    >
      Submit for verification
    </button>
  ) : (
    null
    // Show the "Submitted for verification" button
    // <button
    //   onClick={() => submitted(daata._id)}
    //   style={{ height: "50px", fontFamily: "Nunito", color: "black", width: "200px", borderRadius: "10px", position: "relative", left: "40px" }}
    //   disabled
    // >
    //   Submitted for verification
    // </button>
  )
}



            </div>
          </div>
        </div>
        {/* <img className="pathukaapu" src={qr} /> */}
      </div>
  );
};

export default SellerDescription;

import React, { useState } from 'react';
import NavBar from '../../Reusables/SellerBar/SellerBar';
import axios from '../../../url';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import catGif from '../../Images/cat.gif';
import "./AddImage.css";
import NVmenu from '../../Reusables/NV/NBmenu';

const AddImage = () => {
  const [certificates, setCertificates] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { _id } = useParams();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('_id', _id);
      images.forEach((image) => {
        formData.append('images', image);
      });      
      const certificateFormData = new FormData();
      certificateFormData.append('_id', _id);
      certificates.forEach((certificate) => {
        certificateFormData.append('certificates', certificate);
      });

      const response = await axios.post(`/uploadData/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          req: 'Access-Control-Allow-Origin',
        },
        withCredentials: true,
      });
      const responsee = await axios.get(`/imageStatus/${_id}`);

      const responseee = await axios.post(`/uploadData/${_id}`, certificateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          req: 'Access-Control-Allow-Origin',
        },
        withCredentials: true,
      });

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

        title: 'Image & Certificates uploaded successfully',


        showCloseButton: true,

      }).then(() => {
        window.location.href = "/seller";
      });

      // await Swal.fire({
      //   icon: 'success',
      //   title: 'Success!',
      //   text: 'Image & Certificates uploaded successfully',
      //   confirmButtonColor: '#9A1B56',
      //   timer: 15500,
      //   showConfirmButton: true,
      // })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Uploading Failed!',
        confirmButtonColor: '#9A1B56',
      });
    }
  };

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    
    // Check if the number of selected images exceeds 4
    if (selectedImages.length > 4) {
      alert('You can only upload a maximum of 4 images.');
      // Clear the input field to prevent further selection
      e.target.value = '';
      return;
    }
  
    setImages(selectedImages);
  };
  
  const handleCertificatesChange = (e) => {
    const selectedCertificates = Array.from(e.target.files);
    setCertificates([...certificates, ...selectedCertificates]);
  };

  const removeCertificate = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
  };

  return (
    <div>
      <NVmenu />
      <div style={{boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.1)",height:"400px", width:"1000px", position:"relative", left:"150px", borderRadius:"20px"
}}>
      <p className='padd' style={{ marginTop: '150px' }}>Add image and certificates of your pet</p>
      <div className='imgcert'>
        <div className='addimageforpet'>
          <div className='form-step'>
            <h4 >Image</h4>
            <input
              className='selliteminput'
              type='file'
              id='images'
              multiple
              onChange={handleImagesChange}
              style={{marginTop:"20px"}}
            />
          </div>
        </div>
        <div className='addcertiforpet'>
          <div className='form-step'>
            <h4 style={{ marginLeft: '-10px' }}>
              Certificates - Choose all certificates
            </h4>
            <input
              className='selliteminput'
              type='file'
              id='pdf'
              multiple
              onChange={handleCertificatesChange}
              style={{ marginLeft: '-0px', marginTop:"20px" }}
            />
            <div>
              {certificates.map((certificate, index) => (
                <div key={index} style={{marginTop:"30px"}}>
                  <p>{certificate.name}</p>
                  <button onClick={() => removeCertificate(index)}>Remove</button>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
      <button
        category='submit'
        className='sellsubmit'
        onClick={handleSubmit}
        style={{ marginLeft: '-20px' }}
      >
        Submit
      </button>
    </div>
    </div>
  );
};

export default AddImage;

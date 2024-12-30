import AdoptionForm from "../modals/AdoptionForm.js";


export const adoptionForm = async (req, res, next) => {
  try {
   
    const {name,email,mobile,address,addInfo, owner} = req.body;
   
  if (!name || !email  || !mobile || !address ) {
    return res
      .status(400)
      .json({ message: "All the fields must be filled" });
  }

  const newAdoption = new AdoptionForm({ name ,email, mobile, address, addInfo, owner});

 

 
    const savedUser = await newAdoption.save();
    console.log("User added");
    res.status(200).json(savedUser);
   
    
  } catch (err) {
    next(err);
  }
};

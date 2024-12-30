import Users from "../modals/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const {name,email,password,mobile,role,location} = req.body;
   
  if (!name || !email  || !mobile || !location || !password || !role) {
    return res
      .status(400)
      .json({ message: "All the fields must be filled" });
  }

  const newUser = new Users({ name, password:hash, email, mobile, location, role});

 

 
    const savedUser = await newUser.save();
    console.log("User added");
    res.status(200).json(savedUser);
   
    
  } catch (err) {
    next(err);
  }
};

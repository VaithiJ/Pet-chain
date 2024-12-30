import SellPets from "../modals/SellPets.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Controller function for updating the pet details
export const updatePet = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the pet ID from the request params
    const updateFields = req.body; // Get the updated fields from the request body

    // Find the pet by ID and update its details
    const updatedPet = await SellPets.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true } // Set { new: true } to return the updated pet instead of the old one
    );

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    console.log("Pet details updated");
    res.status(200).json(updatedPet);
  } catch (err) {
    next(err);
  }
};

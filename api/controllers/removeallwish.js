import SellPets from "../modals/SellPets.js";

export const removeallwishlist = async (req, res) => {
  try {
    await SellPets.updateMany({}, { $set: { isWishlisted: "not wishlisted" } });

    res.status(200).json({ message: "Wishlist updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


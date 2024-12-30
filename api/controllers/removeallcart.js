import SellPets from "../modals/SellPets.js";

export const removeallcart = async (req, res) => {
  try {
    await SellPets.updateMany({}, { $set: { isAddedtocart: "removed" } });

    res.status(200).json({ message: "Wishlist updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

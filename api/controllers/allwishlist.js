import SellPets from "../modals/SellPets.js";

export const allwishlist = async (req, res, next) => {
  try {
    const pets = await SellPets.find({ isWishlisted: "wishlisted" });
    res.status(200).json({ pets });
  } catch (err) {
    next(err);
  }
};

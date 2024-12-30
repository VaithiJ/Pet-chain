import SellPets from "../modals/SellPets.js";

export const petBrand = async (req, res, next) => {
  try {
    const { breed } = req.params;

    // If the breed URL parameter is provided and not "all", filter pets by breed
    let filter = {};
    if (breed && breed !== "all") {
      filter = { breed: breed };
    }

    const pets = await SellPets.find(filter);

    res.status(200).json({ pets });
  } catch (err) {
    next(err);
  }
};

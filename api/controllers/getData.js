import SellPets from "../modals/SellPets.js";

export const getData = async (req, res, next) => {
  try {
    let { petIds } = req.query; // Extract petIds from query parameters

    // Check if petIds is a single ID or multiple IDs
    if (!Array.isArray(petIds)) {
      // Convert single ID to an array
      petIds = [petIds];
    }

    const petDetails = await SellPets.find({ _id: { $in: petIds } }); // Find pets by matching IDs in the petIds array

    res.status(200).json(petDetails);
  } catch (err) {
    next(err);
  }
};

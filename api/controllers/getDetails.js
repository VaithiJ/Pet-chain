import SellPets from "../modals/SellPets.js";
export const pet = async (req, res, next) => {
  try {
    
    const user = await SellPets.findById(req.params._id);
    console.log(user)
    res.status(200).json({user:user});
  } catch (err) {
    next(err);
  }
};

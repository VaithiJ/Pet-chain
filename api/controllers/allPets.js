import SellPets from "../modals/SellPets.js";
export const allPets = async (req,res,next)=>{
    try {
        const pets = await SellPets.find();
        res.status(200).json({pets});
    } catch (err){
        next(err);
    }
}
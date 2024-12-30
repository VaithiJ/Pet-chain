import AdoptionForm from "../modals/AdoptionForm.js";
export const adoptPet = async (req,res,next)=>{
    try {
        const pets = await AdoptionForm.find();
        res.status(200).json({pets});
    } catch (err){
        next(err);
    }
}

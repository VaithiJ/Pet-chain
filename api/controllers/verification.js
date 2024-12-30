import SellPets from "../modals/SellPets.js";

export const verification = async (req, res) => {
    try {
      
      const verify = await SellPets.findOne({ _id: req.params.id });

  
     
  console.log(verify)
      verify.submittedForVerification = "submitted";
      await verify.save();
      console.log(verify)
  
      res.status(200).json({ verify:verify });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

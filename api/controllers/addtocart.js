import SellPets from "../modals/SellPets.js";

export const addtocart = async (req, res) => {
    try {
      
      const cart = await SellPets.findOne({ _id: req.params._id });

  
     
  
      cart.isAddedtocart = "added";
      await cart.save();
      console.log(cart)
  
      res.status(200).json({ cart:cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

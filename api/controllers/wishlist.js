import SellPets from "../modals/SellPets.js";

export const wishlist = async (req, res) => {
    try {
      
      const wishlist = await SellPets.findOne({ _id: req.params._id });

  
     
  
      wishlist.isWishlisted = "wishlisted";
      await wishlist.save();
      console.log(wishlist)
  
      res.status(200).json({ wishlist:wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

import SellPets from "../modals/SellPets.js";

export const imageStatus = async (req, res) => {
    try {
      
      const image = await SellPets.findOne({ _id: req.params._id });

      image.imageUploaded = "uploaded";
      await image.save();
      console.log(image)
  
      res.status(200).json({ image:image });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

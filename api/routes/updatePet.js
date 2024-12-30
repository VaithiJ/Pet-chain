import express from "express";
import {updatePet} from "../controllers/updatePet.js"
const router = express.Router();

router.put("/updatePet/:id", updatePet);


export default router;
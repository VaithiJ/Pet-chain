import express from "express";
import { sellPets } from "../controllers/sellPets.js";
const router = express.Router();

router.post("/sellPets", sellPets);


export default router;
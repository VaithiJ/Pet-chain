import express from "express";
import { allPets } from "../controllers/allPets.js";
const router = express.Router();

router.get("/allPets", allPets);


export default router;
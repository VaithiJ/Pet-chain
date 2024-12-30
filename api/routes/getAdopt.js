import express from "express";
import { adoptPet } from "../controllers/getAdopt.js";
const router = express.Router();

router.get("/adoptedPet", adoptPet);


export default router;
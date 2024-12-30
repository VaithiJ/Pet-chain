import express from "express";
import { petBrand } from "../controllers/petBrand.js";
const router = express.Router();

router.get("/petBreed/:breed", petBrand);


export default router;
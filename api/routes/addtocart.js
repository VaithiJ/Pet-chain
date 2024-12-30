import express from "express";
import { addtocart } from "../controllers/addtocart.js";
const router= express.Router();


router.get("/addtocart/:_id", addtocart);

export default router;
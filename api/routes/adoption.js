import express from "express";
import { adoptionForm } from "../controllers/adoption.js";
const router = express.Router();

router.post("/adopted", adoptionForm);


export default router;
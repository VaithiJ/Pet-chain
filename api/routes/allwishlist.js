import express from "express";
import { allwishlist } from "../controllers/allwishlist.js";
const router = express.Router();

router.get("/allwishlist", allwishlist);


export default router;
import express from "express";

import { pet } from "../controllers/getDetails.js";
const router= express.Router();


router.get("/description/:_id", pet);

export default router;
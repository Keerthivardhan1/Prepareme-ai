import express from "express";
import { registerUser, getUser } from "../controllers/userController.js";

const router = express.Router()

router.get('/:email' , getUser)
router.post('/register' , registerUser)

export default router;
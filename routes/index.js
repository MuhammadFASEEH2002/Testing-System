import express from "express";
const router = express.Router();

import * as authController from '../controllers/authController.js'

router.get("/msg",async (req, res) => {
console.log("hello")
})
router.post('/register', authController.register)
router.post('/login', authController.login)


export default router;
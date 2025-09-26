import express from "express";
import { Regesteruser, LoginUser, Logout } from "../controler/Usercontroler.js";


const router=express.Router()

router.post("/register",Regesteruser)
router.post("/login",LoginUser)
router.post("/logout",Logout)


export default router
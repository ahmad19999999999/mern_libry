import express from "express";
import {borrowBook,returnBook} from '../controler/Borrowingcontroler.js'
import { verifyUserAuth } from "../midelware/UserAuth.js";

const router=express.Router()

router.put("/borrow/book/:id",verifyUserAuth,borrowBook)
router.put("/return/book/:id",verifyUserAuth,returnBook)


export default router
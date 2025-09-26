import express from "express";
import {createBook,getAllBooks,getBookById} from '../controler/Bookcontroler.js'
import { verifyUserAuth } from "../midelware/UserAuth.js";

const router=express.Router()

router.route('/create').post(createBook)
router.route('/books').get(getAllBooks)
router.route('/book/:id').get(verifyUserAuth,getBookById)


export default router
import express from 'express'
import {getAllUser, getMyProfile, login, logout, register } from '../controller/user.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router()


// this is the create api
router.post("/new", register);

// this is the api which u can get all user details
router.get("/all", getAllUser);

// api to login user
router.post('/login', login)

// this is the api to get the user profile
router.get('/me', isAuthenticated, getMyProfile)

// this is logout api
router.get('/logout', logout)



export default router;
const express = require('express')
const {addRemoveFriends , getUser , getUserFriends} = require('../controllers/user.js')


const {verifyToken}  = require('../middleware/auth.js')

const userRoute = express.Router();


// read rote

userRoute.get('/:id' ,verifyToken ,  getUser);
userRoute.get('/:id/friends', verifyToken , getUserFriends);
userRoute.patch("/:id/:friendId" , verifyToken , addRemoveFriends)



module.exports = {userRoute}
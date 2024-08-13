const express = require('express');
const route =  express.Router();
const {login,signup, getUsersDetails, updateUsersDetails, deleteUser, searchUser} = require('../controllers/auth.controller')
const {auth} = require('../middleware/auth')

route.post('/login',login)
route.post('/signup',signup)
route.delete('/deleteUser',auth,deleteUser)
route.get('/getUsersDetails',auth,getUsersDetails)
route.put('/updateUsersDetails',auth,updateUsersDetails)
route.post('/searchUser',searchUser)

module.exports = route
const {getuser,updateUser,deleteUser,getusers}=require('../controllers/userController')
const {registerUser,loginUser}=require('../controllers/othController')
const express=require('express')
const route=express.Router()

route.post('/register',registerUser)
route.get('/:id',getuser)
route.get('/',getusers)
route.put('/:id',updateUser)
route.delete('/:id',deleteUser)
route.post('/login',loginUser)
module.exports=route
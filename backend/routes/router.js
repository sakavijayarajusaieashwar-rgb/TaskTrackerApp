
const {addTask,getTasks,getTask,updateTask,deleteTask}=require('../controllers/controller')
const express=require('express')
const authentication=require('../middleware/authentication')
const route=express.Router()
route.post('/',authentication,addTask)
route.get('/',authentication,getTasks)
route.get('/:taskId',authentication,getTask)
route.put('/:taskId',authentication,updateTask)
route.delete('/:taskId',authentication,deleteTask)
module.exports=route
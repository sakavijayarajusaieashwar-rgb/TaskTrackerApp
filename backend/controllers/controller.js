const Task=require('../models/task')
// adduser
const addTask=async(req,res)=>{
    try{
    const {taskHeading,taskDescription,isCompleted}=req.body
    const task= new Task({
        taskHeading,
        taskDescription,
        isCompleted
    })
    const newtask=await task.save()
    res.status(201).json(newtask)

}
catch(e){
    res.status(400).json({message:e.message})
}
}
// get task
const getTasks=async (req,res)=>{
    try{
         const tasks=await Task.find()
         res.status(200).json({count:tasks.length,
            tasks
         })
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}
//get single task
const getTask=async (req,res)=>{
    try{
        const task=await Task.findById(req.params.taskId)
        if(!task){
            return res.status(404).json({message:'task not found'})        
        }
        res.status(200).json(task)
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}
// updatetask
const updateTask=async(req,res)=>{
    try{
        const task=await Task.findByIdAndUpdate(req.params.taskId,req.body,{new:true})
        if(!task){
            return res.status(404).json({message:'task not found'}) 
        }
        res.status(200).json(task)
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}
// delete task
const deleteTask=async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.taskId)
        if(!task){
            return res.status(404).json({message:'task not found'}) 
        }
        res.status(200).json({ message: 'Task deleted successfully' })
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}
module.exports={addTask,getTasks,getTask,updateTask,deleteTask}


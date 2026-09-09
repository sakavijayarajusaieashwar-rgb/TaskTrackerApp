const User=require('../models/user.js')

const getuser=async(req,res)=>{
    try{
    const response=await User.findOne({ userName: req.params.userName })
    res.status(200).json(response)
    }
    catch(e){
        res.status(400).json({message:e.message})
    }

}
const getusers=async(req,res)=>{

    try{
        const response=await User.find()
        res.status(200).json(response)
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}
const updateUser=async(req,res)=>{
    try{
        const id=req.params.id
    const response=await User.findByIdAndUpdate(id,req.body,{new:true})
     if(!response){
            return res.status(404).json({message:'User not found'}) 
        }
    res.status(200).json(response)
    }
    catch(e){
        res.status(400).json({message:e.message})
    }

}
const deleteUser=async(req,res)=>{
    try{
        const id=req.params.id
    const response=await User.findByIdAndDelete(id)
     if(!response){
            return res.status(404).json({message:'User not found'}) 
        }
    res.status(200).json(response)
    }
    catch{
        res.status(400).json()
    }
}
module.exports={getuser,getusers,updateUser,deleteUser,}
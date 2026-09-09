const mongoose=require('mongoose')
const query=new mongoose.Schema({
    taskHeading:{
        type:String,
        required:true
    },
    taskDescription:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Task',query)
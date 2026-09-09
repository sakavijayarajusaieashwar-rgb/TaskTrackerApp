const jwt=require('jsonwebtoken')
const authentication=(req,res,next)=>{
    const authHeader=req.header('Authorization')
    if(!authHeader){
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
    const token=authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({message:err.message})
        }
        next();
    })

}
module.exports=authentication
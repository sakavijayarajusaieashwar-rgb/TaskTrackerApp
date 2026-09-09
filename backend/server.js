const express=require('express')
const mongoose=require('mongoose')
const dotEnv=require('dotenv')
const route=require('./routes/router')
const userRoute=require('./routes/userrouts')
const cors = require('cors')

dotEnv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use('/tasks',route)
app.use('/users',userRoute)

mongoose.connect(process.env.Mongoose_URL).then(()=>{console.log('connected to DB')})
.catch((e)=>{console.log(e.message)})

app.listen(process.env.PORT || 3000, () => console.log('server is running'))
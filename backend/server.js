import express from 'express'
import 'dotenv'
import connectDB from './database/db.js'
const app = express()
import cors from 'cors'


// app.use(cors, ({
//     origin : 'http://localhost:5173',
//     credentials : true
// }))
//middleware
app.use(express.json());

import router from './routes/userRoute.js'
// CORS middleware
app.use(
  cors({
     origin: "*",// tumhara frontend ka URL
    credentials: true,               // agar cookies ya authorization bhejna ho
  })
);
app.use("/users", router);
//http://localhost:3000/users/register
// import 'dotenv/config'
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
connectDB();
    console.log(`server is running successfully on port no ${PORT}`);
})

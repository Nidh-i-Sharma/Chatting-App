import express from 'express'; 
import * as dotenv from 'dotenv'
import connectDB from './config/db.js';
import path from 'path';
import user from './route/loginRoute.js'
import post from './route/postRoute.js'
import { authenticateToken }  from './middleware/auth.js'
const app = express();
dotenv.config()


const port = process.env.PORT;
const mongoDBURL = process.env.MONGOURI;
connectDB(mongoDBURL).then((res) =>{
    console.log(res);
})
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(authenticateToken)
app.use('/api/user',user)
app.use('/api/post',post)


app.listen(port , () => {
    console.log(`server started on ${port}`)
})
import express from 'express'; 
import * as dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db';
import path from 'path';
const app = express();
dotenv.config()

    // We will store our client files in ./client directory.
app.use(express.static(path.join(__dirname, "client")))

const port = process.env.PORT;
const mongoDBURL = process.env.MONGOURI;
connectDB(mongoDBURL).then((res) =>{
    console.log(res);
})
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/user',userRoute)
app.use('/api/noti',notification)


app.listen(port , () => {
    console.log(`server started on ${port}`)
})
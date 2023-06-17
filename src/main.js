import express from 'express'; 
import path from 'path';
import * as dotenv from 'dotenv'

import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import authRoutes from './route/auth.js'
import tweetRoutes from './route/tweet.js'
import userRoutes from './route/user.js'
import { authenticateToken }  from './middleware/auth.js'
import enableSecurityHeaders,{  protectAgainstXSS } from './middleware/security.js';

const app = express();
dotenv.config()


const port = process.env.PORT;

const mongoDBURL = process.env.MONGOURI;
connectDB(mongoDBURL).then((res) =>{
    console.log(res);
})
// Enable security headers
app.use(enableSecurityHeaders);

// Protect against cross-site scripting (XSS) attacks
app.use(protectAgainstXSS);
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use(errorHandler);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port , () => {
    console.log(`server started on ${port}`)
})
import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const jwtToken = process.env.JWTSECRET_KEY;
const userSchema = new Schema({
    fullname:{
        type :String,
        required : true
    },
    email:{
        type :String,
        required : true 
    },
    password:{
        type :String,
    },
    profilePicture:{
        type :String,
        required : true 
    },
    coverPhoto:{
        type :String,
        required : true 
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],

},
{ timestamps: true }
)


var userModal = mongoose.model('user', userSchema)
export default userModal;
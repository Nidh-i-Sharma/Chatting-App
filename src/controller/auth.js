import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator'
import User from '../modal/user.js'

// User registration
export default async function register(req, res){
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user information from request body
    const { username, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// User login
export async function login(req, res){
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user information from request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Password reset
export async function resetPassword(req, res){
  try {
    // Implement password reset functionality
    const {email }  = req.body;
    const user = await User.findOneBy({
        email: email
    })
    if (!user) {
        return res.json({ message: "User not found" })
    } else {
        //user exist , generate otp 
        const secret = process.env.JWTSECRET_KEY + user.password;
        const payload = {
            email: user.email,
            userId: user._id
        }
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:3000/resetpassword/${user._id}/${token}`;
        const data = {
            from: "noreply@algo.com",
            to: email,
            subject: "Passord Reset Link",
            html: `
            <h2>Please click on the link to reset your password</h2>
            <p>${link}</p>
            `
        }
        console.log(link);
        res.send({ message: "Password reset link send successfully", data: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function sendforgetpasswordLink(req, res) {
    //make sure user exist in db
    try {
        const { userId, token } = req.params;
        const { password, confirmPassword } = req.body;

        //check if this id exist in db
        const user = await User.findById({
            userId
        })
        if (!user || !confirmPassword) {
            return res.json({ message: " Password must be " })
        } else {
            //user exist  
            const secret = process.env.JWTSECRET_KEY + user.password;
            try {
                const payload = jwt.verify(token, secret)
                //update the pass

                var hashPass = bcrypt.hash(confirmPassword, 10, (err, encrypted) => {
                    User.findOneAndUpdate({userId}, {
                        password: encrypted
                    })
                })
                res.send({ message: 'Password updates successfully', email: user.email });
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

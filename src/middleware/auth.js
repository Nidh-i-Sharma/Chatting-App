import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import multer from 'multer'
// import path from 'path'

dotenv.config();
const secret = (process.env.JWTSECRET_KEY) ? process.env.JWTSECRET_KEY : "";


export async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ message: "You are not authorized"})
        jwt.verify(token, secret, (err, user) => {
            if (err) return res.status(403).send("A token is required for authentication");
            req.user = user
            next()
        })
    } catch(error) {
        res.status(500).send({messae:"Internal Server Error"});
    }
}
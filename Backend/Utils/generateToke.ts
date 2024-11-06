import jwt from "jsonwebtoken"
import {Response} from "express"

const generateToken = (userId:string,res:Response) =>{
    const token = jwt.sign({userId}, process.env.passKey!,{
        expiresIn:"15d",      
    })
    res.cookie("jwt" , token , {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",// limits the cookie to be sent only with same-site requests, preventing CSRF attacks.
        secure: process.env.NODE_ENV ! == "developement" //ensures the cookie is only sent over HTTPS in production mode.
    });
    return token
}
export default generateToken;
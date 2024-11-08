import bcryptjs from "bcryptjs"
import prisma from "../db/prisma"
import { Request, Response } from "express";
import generatetoken from "../Utils/generateToke"
import { promises } from "dns";

export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
        const {username ,password} = req.body;
        const users= await prisma.user.findUnique({where: {username}})
        if(!users){
             return res.status(400).json({error:"Invalid Credentials"})
        }
    
        const isPasswordCorrect = await bcryptjs.compare(password,users.password);
    
        if(!isPasswordCorrect){
            return res.status(400).json({error:"password are incorrect"});
        }
    
        generatetoken(users.id,res);
    
        res.status(200).json({
            id:users.id,
            fullname:users.fullname,
            username:username.username,
            profilePic:users.profilePic
        })
       } catch (error:any) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
       }
};

export const Signup = async (req: Request, res: Response): Promise<any> => {

   try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
       return res.status(400).json({ message: "Please fill the form properly" });
        
    }
    
    if (password !== confirmPassword) {
          return res.status(400).json({ message: "Passwords don't match" });
        
    }
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
         return res.status(400).json({ message: "Username already exists" });
         
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


    const newUser = await prisma.user.create({
        data: {
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        }
    });

    if (newUser) {
         generatetoken(newUser.id,res)
          return res.json({
            id: newUser.id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
    } else {
        return res.status(400).json({ message: "Invalid user data" });
        
    }

   } catch (error:any) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
   }
};



export const Logout = async (req: Request, res: Response): Promise<any>  => {
     try {
            res.cookie("jwt","");
            res.status(200).json({message:"Logged out succcessfully"});
        
     } catch (error:any) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal server error' });
     }

};
export const Give = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await prisma.user.findMany(); // Replace 'user' with your table name/model
      console.log(users);
      return res.status(200).json(users);
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
     
};

export const Getme = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await prisma.user.findUnique({where:{id:req.user.id}})
      console.log(user)
      console.log("adfsadfads")
       return res.status(200).json(user)
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
};
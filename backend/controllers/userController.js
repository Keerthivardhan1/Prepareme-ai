import { createUser , getUserByEmail , getUserById } from "../models/userModel.js";
import { sendEmail } from "../services/emailService.js";


export const getUser = async (req , res)=>{
    const email = req.params.email
    // console.log("e " , email)
    try {
        const user = await getUserByEmail({email})
        res.json(user)
    } catch (error) {
        
        res.status(404).json({error : 'User not found'})
    }
}

export const registerUser = async (req , res) => {
    
    try {
        const {name , email , password , role } = req.body
        console.log(req.body)
        const user = await getUserByEmail({email})

        if(user){
           return  res.status(400).json({error : "User already exists"})
        }

        const newuser = await createUser({name , email , password , role})
        await sendEmail(email , "Thanks for joining us" , 1 , {username :  name})
        res.status(201).json(newuser)
    } catch (err) {
        res.status(404).json({error : err.message})
    }
}
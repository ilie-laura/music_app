import User from "../models/userModel.js";
export const getAllUsers=async(req,res,next)=>{
    try {//dont show current user
        const currentUserId=req.auth.userId;
        const users = await User.find({clerkId:{$ne:currentUserId}});//not equal
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
import { clerkClient } from "@clerk/express";
export const protectRoute=async(req,res,next)=>{

if(!req.auth.userID){
    return res.status(401).json({message:"Unauthorized - youy must be logged in to access this "});
    
}
next();



}


export const requireAdmin=async(req,res,next)=>{
    try{
        const currentUser=await clerkClient.users.getUser(req.auth.userID);
        const isAdmin=process.env.ADMIN_EMAIL===currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(403).json({message:"Forbidden - you do not have access to this resource"});
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }

}

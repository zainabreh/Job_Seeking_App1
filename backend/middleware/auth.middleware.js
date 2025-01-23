import jwt from "jsonwebtoken"
import 'dotenv/config'


export const isAuthenticated = (req,res,next)=>{
    const {auth} = req.cookies
    console.log("Cookies: ", req.cookies);
    console.log("isAuthenticated...",auth);

     
    
    if(!auth) return next(new Error("login to access this resource"))

    try {
         let authuser = jwt.verify(auth,process.env.TOKEN)
         req.user = authuser         
        
         console.log("isAuthenticated1",req.user.role);
         next()
         console.log("isAuthenticated2",req.user.role);
     } catch (error) {
         next(new Error("Invalid or expired token"))
     }
}

export const isAuthorized = (...roles)=>{
    
    return (req,res,next)=>{
        console.log("isAuthorized: Checking roles", roles, "against", req.user.role);
        if(!roles.includes(req.user.role)) 
            return next(new Error("Not Allowed to access this resource"))

            next()
    }
}
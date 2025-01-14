import jwt from "jsonwebtoken"
import 'dotenv/config'


export const isAuthenticated = (req,res,next)=>{
    const {auth} = req.cookies
    console.log("Headers:", req.headers);
    console.log("bodies:", req.body);
    console.log("cookies,,,,,,,,",req.cookies);
    console.log("auth",auth);
    
    
    
    if(!auth) return next(new Error("login to access this resource"))

    try {
        let authuser = jwt.verify(auth,process.env.TOKEN)
        req.user = authuser 
        
        console.log("auth User.......",authuser);
        
        
        next()
    } catch (error) {
        next(error)
    }
}

export const isAuthorized = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)) return next(new Error("Not Allowed to access this resource"))

            next()
    }
}
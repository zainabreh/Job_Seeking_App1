import userModel from "../model/user.model.js"


export const getAllUsers = async (req,res,next)=>{
    try {
        const users = await userModel.find({})

        res.json({
            message:"All user ",
            users,
            success: true
        })
    } catch (error) {
        next(new Error("Something went Wrong"))
    }    
}
export const getSingleUser = async (req,res,next)=>{
    try {
        const {id} = req.params
        const user = await userModel.findById(id)        
        
        res.json({
            user,
            message:"single user",
            success: true
        })
    } catch (error) {
        next(new Error("Something went Wrong"))
    }
}
export const getProfile = async (req,res,next)=>{
    let id = req.user.id    
    
    try {
       let user = await userModel.findById(id)
       
        res.json({
            success:true,
            user,
        })
    } catch (error) {
        next(new Error("Something went Wrong"))
    }
}
export const createNewUser = async (req,res,next)=>{
    try {
        const user = req.body
        await userModel.create(user)
        res.json({
            message:"user created",
            success: true
        })
    } catch (error) {
        next(new Error("Something went Wrong"))
    }
}
export const updateUser = async (req,res,next)=>{
    try {
        const {id} = req.params
        const data = req.body        

        const user = await userModel.findByIdAndUpdate(id,data)        
        
        res.json({
            user,
            message:"user updated",
            success: true
        })
    } catch (error) {
        next(new Error("Something went Wrong"))
    }
}
export const updateUserRole = async (req,res,next)=>{
    try {
        const {id,role} = req.params        

        const user = await userModel.findByIdAndUpdate(
            id,
            {roles:role},
            {new:true}
        )        
        
        res.json({
            user,
            message:"user updated",
            success: true
        })
    } catch (error) {
        next(new Error("Something went Wrong"))
    }
}
export const deleteUser = async (req,res,next)=>{
    try {
        res.json({
            message:"user deleted",
            success: true
        })
    } catch (error) {
        next(new Error("Something went Wrong"))
    }
}
import userModel from "../model/user.model.js"


export const getAllUsers = async (req,res,next)=>{
    try {
        const users = await userModel.find()
        res.json({
            message:"All user ",
            users
        })
    } catch (error) {
        next(error)
    }    
}
export const getSingleUser = async (req,res,next)=>{
    try {
        res.json({
            message:"single user"
        })
    } catch (error) {
        next(error)
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
        next(error)
    }
}
export const createNewUser = async (req,res,next)=>{
    try {
        const user = req.body
        await userModel.create(user)
        res.json({
            message:"user created"
        })
    } catch (error) {
        next(error)
    }
}
export const updateUser = async (req,res,next)=>{
    try {
        res.json({
            message:"user updated"
        })
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req,res,next)=>{
    try {
        res.json({
            message:"user deleted"
        })
    } catch (error) {
        next(error)
    }
}
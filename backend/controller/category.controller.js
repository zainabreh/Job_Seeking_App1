import categoryModel from '../model/category.model.js'

export const gettAllCategory = async (req,res,next)=>{
    try {
        const categories = await categoryModel.find({}).populate('jobs')

        res.json({
            categories
        })

    } catch (error) {
        next(new Error(error))
    }
}

export const getCategoryById = async (req,res,next)=>{

    const {id} = req.params

    const singleJob = await categoryModel.findById(id)

    if(!singleJob){
        res.json({
            success: false,
            message: "Job Not Found"})
    }else{
        res.json({
            data: singleJob
        })
    }
}

export const createCategory = async (req,res,next)=>{
    try {
        const newCategory = await categoryModel.create({...req.body})

        res.json({
            newCategory
        })

    } catch (error) {
        next(new Error(error))
    }
}

export const deleteCategory = async (req,res,next)=>{
    try {
        const {id} = req.params

        await categoryModel.findByIdAndDelete(id)

        res.json({
            message:"Deleted successfully"
        })

    } catch (error) {
        next(new Error(error))
    }
} 
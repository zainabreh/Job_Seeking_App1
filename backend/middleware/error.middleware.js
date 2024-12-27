export const errorHandler = (err,req,res,next)=>{
    let error = {...err}
    error.message = err.message

    if(err.name == "ValidationError"){
        const msg = Object.values(err.errors).map((e)=>e.message)
        error = new Error(msg)
    }

    if(err.name == "CastError"){
        const msg = `Resource Not Found ${err.path}`
        error = new Error(msg)
    }

    if(err.code == 11000){
        const msg = `Duplicate ${Object.keys(err.keyValue)} Not Allowed`
        error = new Error(msg)
    }

    res.json({
        success:false,
        message: error.message
    })
}
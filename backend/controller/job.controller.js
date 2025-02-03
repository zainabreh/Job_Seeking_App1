import mongoose from "mongoose";
import categoryModel from "../model/category.model.js";
import jobModel from "../model/job.model.js";


export const getAllJobs = async (req, res, next) => {
  
  try {

    const {search,location,status,page = 1,limit = 10,category=''} = req.query      
    
    
    let query = {};
    if (search) {
      query.position = { $regex: search.trim(), $options: 'i'};
    }

    if(category) {
      query.category = new mongoose.Types.ObjectId(category)
    }

    if (location) {
      query.location = { $regex: location.trim(), $options: 'i' };
    }
    if (status) {
      query.status = { $regex: status.trim(), $options: 'i' }; 
    }    

    
    const skip = (page - 1) * limit;


    const jobs = await jobModel.find(query).skip(skip).limit(parseInt(limit));    
    
   
    const total = await jobModel.countDocuments(query)
        
    res.status(200).json({
      job:jobs,
      success:true,
      page:parseInt(page),
      total,
      pages:Math.ceil(total/limit)
    });
  } catch (error) {
    next(error);
    // next(new Error("Error Getting Jobs...",error));
  }
};
export const getjobByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobModel.findById(id);

    if (!job) {
      res.json({
        success: false,
        message: "Job not found",
      });
    } else {
      res.json({
        job,
        success: true,
        message: "job found",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const createJob = async (req, res, next) => {
  try {
    const data = req.body;
    const job = await jobModel.create({
      ...req.body,
      postedBy: req.user.id,
    });

    const categoryId = job.category;
    const jobId = job._id;

    const category = await categoryModel.findById(categoryId)

    const newfield = [...category.jobs,jobId]
    category.jobs = newfield

    const updatedcategory = await categoryModel.findByIdAndUpdate(categoryId,category)    

    // await categoryModel.findByIdAndUpdate(
    //   categoryId,
    //   { $push: { jobs: job._id} },
    //   { new: true } 
    // );  

    res.json({
      message: "Job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

export const getMyJobs = async (req, res, next) => {
  
  try {    
    const myjobs = await jobModel.find({ postedBy: req.user.id });    
    
    res.json({
      success: true,
      myjobs,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const user = req.user.id;
    const { id } = req.params;

    const job = await jobModel.findById(id);

    if (!job) {
      return next(new Error("Job not Found"));
    }

    if (job.postedBy.toString() !== user) {
      return next(new Error("YOur are not allowed to update this job"));
    }

    let updateoldJob = await jobModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.json({
      success: true,
      updateoldJob,
      message: "Job Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteJob = async (req, res, next) => {
  let deleteJob;
  try {
    const user = req.user.id;
    const { id } = req.params;

    const job = await jobModel.findById(id);

    if (!job) {
      return next(new Error("Job not Found"));
    }

    if (job.postedBy.toString() !== user) {
      return next(new Error("You'r not allowed to delete this job"));
    }
    deleteJob = await jobModel.findByIdAndDelete(id);
  } catch (error) {
    next(error);
  }
  res.json({
    message: "Deleted successfully",
    success: true,
  });
};

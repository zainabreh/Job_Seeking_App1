import applicationModel from "../model/application.model.js";
import { v2 as cloudinary } from "cloudinary";
import jobModel from "../model/job.model.js"
import mongoose from "mongoose";


export const getRecuiterApplication = async (req, res, next) => {  
  try {
    const { id } = req.user;

    if(!id){
      next(new Error("Not Allowed"))
    }
    
    const applications = await applicationModel.find({ "recuiter_id.user": id });
    
    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployerApplication = async (req, res, next) => {
  try {
    const { id } = req.user;    

    const applications = await applicationModel.find({ "applicant_id.user": id });    

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleApplication = async (req, res, next) => {
  try {
    const { id } = req.params;    

    const applications = await applicationModel.findById(id); 
    
    console.log("Application single.....",applications);
    

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (req, res, next) => {
  try {
    const { id } = req.user;
    const appBody = req.body; 
    

    const uploadResult = await cloudinary.uploader.upload(appBody.resume, {
      folder: "job-finding-app",
    });

    if (uploadResult) {
      appBody.resume = uploadResult.secure_url
    }

    const applicant = {
        user:id
    }

    const jobDetails = await jobModel.findById(appBody.id)        

    if(!jobDetails){
        return next(new Error("Job not Found"))
    }

    const recuiter = {
        user : jobDetails.postedBy
    }

      const application = await applicationModel.create({
        ...appBody,
        applicant_id: applicant,
        recuiter_id:recuiter
      });         
  
      res.json({
        success: true,
        message: "Application created successfully",
        application,
      });
   
  
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteApplication = await applicationModel.findByIdAndDelete(id);

    if (!deleteApplication) {
      return next(new Error("Application Not Found"));
    }

    res.json({
      success: true,
      message: "Deleted successfully",
      deleteApplication,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateApplication = await applicationModel.findByIdAndUpdate({_id:id},req.body,{new:true});

    if (!updateApplication) {
      return next(new Error("Application Not Found"));
    }

    res.json({
      success: true,
      message: "Updated successfully",
      updateApplication,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id, status } = req.params; 

    console.log(id,status);
    

    if (!["pending", "accept", "reject"].includes(status)) {
      return next(new Error("Invalid status"));
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("Invalid application ID"));
    }

    const updateApplication = await applicationModel.findByIdAndUpdate(
      id,                 
      { status: status },  
      { new: true }        
    );
    if (!updateApplication) {
      return next(new Error("Application not found"));
    }

    res.json({
      success: true,
      message: "Application status updated successfully",
      updateApplication,
    });
  } catch (error) {
    next(new Error(error));
  }
};



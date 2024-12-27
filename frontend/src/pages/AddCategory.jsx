import { useFormik } from 'formik';
import React from 'react'
import * as yup from "yup";
import { useCreateCategoryMutation } from '../../Redux/auth/category.api';
import { useDispatch, useSelector } from 'react-redux';
import { clearCategory, setCategory } from '../../Redux/Feature/category.slice';

const AddCategory = () => {

    const [createCategory] = useCreateCategoryMutation()
    const dispatch = useDispatch()   

    const { handleChange, handleSubmit,handleReset, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        categoryName: "",
      },
      validationSchema: yup.object({
        categoryName: yup.string().required("Reqiured"),
      }),
      onSubmit: async (v) => {
        const newCategory = await createCategory(v).unwrap()
        dispatch(setCategory(newCategory))
        
        
        // try {
        //   const user = await loginUser(v);
        //   console.log(user);
          
        //   if (user.data.success) {
        //     setApimsg(user.data.message);
            
        //     navigate('/')
        //   } else {
        //     setApimsg({ success: false, message: user.data.message });
        //   }
        // } catch (error) {
        //   console.log(error);
          
        // }
        // handleReset()
      },
    });
  return (
    <>
      <div className="container" style={{width:"90%",margin:"40px",color:"white"}}>
        <h3 style={{marginBlock:"15px"}}><span style={{ textDecoration:"underline", textDecorationColor:"white",textDecorationThickness:"3px"}}>Add</span> Category</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div>
            <label for="inputEmail4" className="form-label">
              Category Name:
            </label>
            <input type="text" name='categoryName' onChange={handleChange} onBlur={handleBlur} value={values.categoryName} className="form-control" id="inputEmail4" placeholder="category name......" style={{width:"70%"}}/>
            {
                touched.categoryName && errors.categoryName ? (
                    <div style={{color: "red" ,textAlign:"left"}}>{errors.categoryName}</div>
                  ) : (" ")
            }
           <button type="submit" className="btn" style={{fontSize:"16.5px",marginBlock:"20px",backgroundColor:"white"}}>
             Add Category
            </button>
            
            </div>
        </form>
      </div>
    </>
  )
}

export default AddCategory

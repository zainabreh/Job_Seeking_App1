import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserDashBoard from "./pages/UserDashBoard";
import Layout from "./component/Layout";
import UsepProfileCard from "./pages/UsepProfileCard";
import Userupdateprofile from "././pages/Userupdateprofile";
import Userapplication from "./pages/Userapplication";
import Sidebarlayout from "./component/Sidebarlayout";
import Addjob from "./component/Addjob";
import Managejob from "./component/Managejob";
import Recuiterupdaterofile from "./pages/Recuiterupdaterofile";
import RecuiterProfileCard from "./pages/RecuiterProfileCard";
import Recuiterapplication from "./pages/Recuiterapplication";
import JobDetail from "./component/JobDetail";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import AdminProfileCard from "./pages/AdminProfileCard";
import AdminUpdateProfile from "./pages/AdminUpdateProfile";
import ManageUsers from "./pages/ManageUsers";
import Admin from "./pages/Admin";
import RecuiterLayout from "./layout/RecuiterLayout";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import RecuiterDashBoard from "./pages/RecuiterDashboard";
import AdminDashBoard from "./pages/AdminDashboard";
import { useSelector } from "react-redux";
import JobApplicationForm from "./pages/JobApplicationForm";
import Updatejob from "./component/Updatejob";
import UpdateUserApplication from "./pages/UpdateUserApplication";
import ApplicationView from "./component/ApplicationView";
import AddCategory from "./pages/AddCategory";
import React from "react";

function App() {

const {user,isAuthenticated} = useSelector(v=>v.auth)
const [search, setSearch] = React.useState("");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home search={search} setSearch={setSearch}/>}></Route>
        <Route path="/login" element={isAuthenticated ? null : <LogIn />}></Route>
        <Route path="/signup" element={isAuthenticated ? null : <Signup />}></Route>
        <Route path="/jobdetail/:id" element={<JobDetail />}></Route>

        <Route path="/" element={<UserLayout/>}>
        
          <Route element={<Sidebarlayout />}>
            {/* user */}
            
              <Route path="userdashboard" element={<UserDashBoard />}></Route>
              <Route
                path="usepProfileCard"
                element={<UsepProfileCard />}
              ></Route>
              <Route path="apply/:id" element={<JobApplicationForm/>}></Route>
              <Route
                path="userupdateprofile"
                element={<Userupdateprofile />}
              ></Route>
              <Route
                path="userapplication"
                element={<Userapplication />}
              ></Route>
              <Route
                path="UpdateUserApplication/:id"
                element={<UpdateUserApplication />}
              ></Route>
              <Route
                path="applicationview/:id"
                element={<ApplicationView />}
              ></Route>
            
            {/* Recuiter */}

            <Route
              path="/recuiter"
              // element={ isAuthenticated && user?.roles === "recuiter" ? (<RecuiterLayout role={"recuiter"}/> ) : (<Navigate to={"/login"}/>)}

              element={<RecuiterLayout role={"recuiter"}/>}
              
            >
              <Route path="addjob" element={<Addjob />}></Route>
              <Route path="updatejob/:id" element={<Updatejob />}></Route>
              <Route
                path="recuiterdashboard"
                element={<RecuiterDashBoard />}
              ></Route>

              <Route path="manageJobs" element={<Managejob />}></Route>
              <Route
                path="recuiterProfileCard"
                element={<RecuiterProfileCard />}
              ></Route>
              <Route
                path="recuiterupdateprofile"
                element={<Recuiterupdaterofile />}
              ></Route>
              <Route
                path="recuiterapplication"
                element={<Recuiterapplication />}
              ></Route>
            </Route>

            {/* Admin */}

            <Route path="/admin" element={<AdminLayout role={"admin"}/>} >
              <Route path="admindashboard" element={<AdminDashBoard />}></Route>
              <Route
                path="adminprofilecard"
                element={<AdminProfileCard />}
              ></Route>
              <Route
                path="adminupdateprofile"
                element={<AdminUpdateProfile />}
              ></Route>
              <Route path="manageUsers" element={<ManageUsers />}></Route>
              <Route path="addcategory/" element={<AddCategory />}></Route>
              <Route path="adminStatus" element={<Admin />}></Route>
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

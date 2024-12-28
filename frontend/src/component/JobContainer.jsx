import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import JobCard from "./JobCard";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllJobsQuery } from "../../Redux/auth/job.api";
import { setjob } from "../../Redux/Feature/job.slice";

export default function JobContainer({search}) {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState("");
  const [types, setTypes] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);

  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [typesOpen, setTypesOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);

  const { category } = useSelector((v) => v.category);
  const {data,error,isLoading} = useGetAllJobsQuery(); 
  console.log("usegetallljobs222222222222222222................",data ,"error.......",error,"isloading.....",isLoading);

  if(isLoading){
    return <h1>Loading</h1>
  }

  if(error){
    return <h1>Something went wrong</h1>
  }  
   
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    if (data && data.jobs) {
      console.log("usegetallljobs11111111111111111................",data);
      
      setProducts(data.jobs)  
      // setTotalPages(data.pages)  
      dispatch(setjob(data.jobs));  
    }
  }, [data, dispatch]); 

  const handleCategoryChange = (event) => {
    setCategories(event.target.value);
    console.log("category",event.target.value);
    
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    console.log("location",event.target.value);
    
  };
  const handleTypesChange = (event) => {
    setTypes(event.target.value);
    console.log("types",event.target.value);

  };



  const handleLocationClose = () => {
    setLocationOpen(false);
  };
  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  };
  const handleTypesOpen = () => {
    setTypesOpen(true);
  };
  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };
  const handleTypesClose = () => {
    setTypesOpen(false);
  };
  const handleLocationOpen = () => {
    setLocationOpen(true);
  };
  

  return (
    <>
      <div className="main-container">
        <div className="filter-container">
          {/* Category */}
          <Box sx={{ width: 250 }}>
            <Button
              sx={{ display: "block", mt: 2 }}
              onClick={handleCategoryOpen}
            >
              Filter Job By Category
            </Button>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={categoryOpen}
                onClose={handleCategoryClose}
                onOpen={handleCategoryOpen}
                value={categories}
                label="category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {category.map((cat) => (
                  <MenuItem value={cat.newCategory._id}>
                    {cat.newCategory.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Types */}
          <Box sx={{ width: 250 }}>
            <Button sx={{ display: "block", mt: 2 }} onClick={handleTypesOpen}>
              Filter Job By Types
            </Button>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={typesOpen}
                onClose={handleTypesClose}
                onOpen={handleTypesOpen}
                value={types}
                label="types"
                onChange={handleTypesChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"fullTime"}>Full-Time</MenuItem>
                <MenuItem value={"partTime"}>Part-Time</MenuItem>
                <MenuItem value={"internship"}>Internship</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Location */}
          <Box sx={{ width: 250 }}>
            <Button
              sx={{ display: "block", mt: 2 }}
              onClick={handleLocationOpen}
            >
              Filter Job By Location
            </Button>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Location
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={locationOpen}
                onClose={handleLocationClose}
                onOpen={handleLocationOpen}
                value={location}
                label="location"
                onChange={handleLocationChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Karachi"}>Karachi</MenuItem>
                <MenuItem value={"Lahore"}>Lahore</MenuItem>
                <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                <MenuItem value={"Faisalabad"}>Faisalabad</MenuItem>
                <MenuItem value={"Rawalpindi"}>Rawalpindi</MenuItem>
                <MenuItem value={"Peshawar"}>Peshawar</MenuItem>
                <MenuItem value={"Quetta"}>Quetta</MenuItem>
                <MenuItem value={"Multan"}>Multan</MenuItem>
                <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                <MenuItem value={"Gujranwala"}>Gujranwala</MenuItem>
                <MenuItem value={"Sialkot"}>Sialkot</MenuItem>
                <MenuItem value={"Bahawalpur"}>Bahawalpur</MenuItem>
                <MenuItem value={"Sukkur"}>Sukkur</MenuItem>
                <MenuItem value={"Jhelum"}>Jhelum</MenuItem>
                <MenuItem value={"Abottabad"}>Abottabad</MenuItem>
                <MenuItem value={"Sargodha"}>Sargodha</MenuItem>
                <MenuItem value={"Rahim Yar Khan"}>Rahim Yar Khan</MenuItem>
                <MenuItem value={"Mardan"}>Mardan</MenuItem>
                <MenuItem value={"Dera Ghazi Khan"}>Dera Ghazi Khan</MenuItem>
                <MenuItem value={"Mirpur"}>Mirpur</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className="card-container">
          <JobCard products={products}/>
        </div>
      </div>
      {/* pagination */}
      <div
        style={{
          marginBlock: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination count={2} size="large" />
      </div>
    </>
  );
}

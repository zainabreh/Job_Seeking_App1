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
import { useGetAllJobsQuery } from "../../Redux/auth/job.api.js";
import { useGetAllCategoryQuery } from "../../Redux/auth/category.api.js";
import { setjob } from "../../Redux/Feature/job.slice.js";

export default function JobContainer({ search }) {
  const [products, setProducts] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);

  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);

  const { category:cat } = useSelector((v) => v.category);
  const {data:categ} = useGetAllCategoryQuery()
  

  const { data, error, isLoading } = useGetAllJobsQuery({
    search,
    limit,
    status,
    location,
    page,
    category
  });    

  const dispatch = useDispatch();  

  React.useEffect(() => {

    if (data && data?.job) {
      setProducts(data?.job);
      setTotalPages(data?.pages);
      dispatch(setjob(data?.job));
    }
  }, [data,products,search,category,page,location,status]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1)
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setPage(1)
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1)
  };

  const handlePageChange = (e)=>{
    setPage(e.selected + 1)
  }

  const handleLocationClose = () => {
    setLocationOpen(false);
  };
  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  };
  const handleStatusOpen = () => {
    setStatusOpen(true);
  };
  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };
  const handleStatusClose = () => {
    setStatusOpen(false);
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
                value={category}
                label="category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categ && categ.categories.map((cat) => (
                  <MenuItem value={cat._id}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* status */}
          <Box sx={{ width: 250 }}>
            <Button sx={{ display: "block", mt: 2 }} onClick={handleStatusOpen}>
              Filter Job By status
            </Button>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={statusOpen}
                onClose={handleStatusClose}
                onOpen={handleStatusOpen}
                value={status}
                label="status"
                onChange={handleStatusChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"full-time"}>Full-Time</MenuItem>
                <MenuItem value={"part-time"}>Part-Time</MenuItem>
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
          <JobCard products={products} />
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
        <Pagination
          count={totalPages}
          page={page}
          onChange={()=>handlePageChange(e)}
          size="large"
        />{" "}
      </div>
    </>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createSvgIcon } from "@mui/material/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

export default function JobCard({products}) {  

  return (
    <>
    {products && Array.isArray(products) ? (
        products.map((info) => (

      <Box sx={{ maxWidth: 280 }} key={info._id}>
        <Card variant="elevation">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <i className="fa-solid fa-location-dot"></i> {info.location}
            </Typography>
            <Typography variant="h5" component="div"  sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                // whiteSpace: 'nowrap',
                display: "-webkit-box",
                WebkitLineClamp: 1 ,
                WebkitBoxOrient: "vertical",
              }}>
              {info.position}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {info.status}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2 ,
                WebkitBoxOrient: "vertical",
              }}
            >
              {info.description}
            </Typography>
          </CardContent>
         <CardActions>
            <Link to={`/jobdetail/${info._id}`}>
              <Button startIcon={<PlusIcon />} sx={{ marginBlock: "5px" }}>
                Details
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    ))) : (<div><h1 style={{textAlign:"center",marginInline:"50px"}}>Data Not Found</h1></div>)
}
    </>
  );
}
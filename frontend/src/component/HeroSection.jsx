import React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function HeroSection({ search, setSearch }) {
  const [color, setColor] = React.useState("primary");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    const updatedValue = search.trim()
    setSearch(updatedValue)
  };

  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        // zIndex: -1,
        flexGrow: 1,
        display: "flex",
        bgcolor: color === "primary" ? "#042449" : undefined,
        p: { xs: "36px", md: "150px" },
        pt: { xs: "24px", md: "70px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ zIndex: 1, position: "relative" }}>
        <Typography level="h1" sx={{ mb: 5 }}>
          Get Your{" "}
          <Typography sx={{ color: "#3881BC" }}>Dream Job</Typography> Today!
        </Typography>
      </Box>

      <Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, zIndex: 10 }}
            placeholder="Search Jobs"
            inputProps={{ "aria-label": "Search Jobs" }}
            value={search}
            onChange={handleSearchChange}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", color: "black", zIndex: 10 }}
            aria-label="search"
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Sheet>
  );
}

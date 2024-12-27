import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import React from "react";
import Sheet from "@mui/joy/Sheet";

const Footer = () => {
  const [color, setColor] = React.useState("primary");
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column'
     }}>
    <Sheet
        variant="solid"
        color={color}
        invertedColors
        sx={{
          ...(color !== "neutral" && {
            bgcolor: `${color}.800`,
          }),
          flexGrow: 1,
          p: 2,
          width: "100%",
          flexGrow: 1,
      }}
      >
        {/* <Divider sx={{ my: 2 }} /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "flex-start" },
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            @All Rights are Reserved By Zainab
          </Typography>
        </Box>
      </Sheet>
    </div>
     
    </>
  );
};

export default Footer;

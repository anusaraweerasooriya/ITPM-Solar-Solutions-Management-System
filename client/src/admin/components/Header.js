import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h3"
        color={theme.palette.primary[600]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color={theme.palette.primary[400]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

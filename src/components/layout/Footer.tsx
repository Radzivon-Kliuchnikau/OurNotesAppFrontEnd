import { Box, Typography } from "@mui/material";
import * as React from "react";

const Footer = (): React.ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        borderTop: "1px solid black",
      }}
    >
      <Typography>{new Date().getFullYear()} RareCase, Inc.</Typography>
    </Box>
  );
};

export default Footer;

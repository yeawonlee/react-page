import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © YeawonLee"}
            {" "}
            {new Date().getFullYear()}
            {". / "}
            {"Email: yeawon.lee@cloudmt.co.kr"}
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};
export default Footer;

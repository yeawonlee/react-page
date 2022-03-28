import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <Box>
          <Container maxWidth="lg">
            <Box>
              <Typography variant="body2" align="center">
                {"Copyright © YeawonLee"} {new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
            <Box sx={{ my: 1 }}>
              <Typography variant="body2" align="center">
                {"Email: "}
                <Link href="/" color="rgb(255, 255, 255)">yeawon.lee@cloudmt.co.kr</Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </div>
    </footer>
  );

  /*
  return (
    <footer>
      <Container maxWidth="lg">
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
  */
};
export default Footer;

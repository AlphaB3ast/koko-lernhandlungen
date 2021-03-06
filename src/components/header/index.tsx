import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import * as React from "react";

export const Header: any = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          <a href='/' style={{ textDecoration: "none", color: "white" }}>
            Lernhandlungen
          </a>
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

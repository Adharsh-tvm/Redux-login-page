import React from "react";
import { useForm } from "react-hook-form";
import { AppBar, Toolbar, Typography, Button, TextField, Container, Box } from "@mui/material";

const Header = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" onClick={onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};


export default Header;
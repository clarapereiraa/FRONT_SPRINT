import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const Header = () => {
  const isAuthenticated = localStorage.getItem("authenticated")
  return (
    <header style={headerStyle}>
      {isAuthenticated?<Button component={Link} to="/Login" sx={iconButtonStyle}>
        <ArrowBackIcon sx={iconStyle} /> {/* Seta para voltar */}
      </Button>:<div></div>}
  
      <div style={iconContainerStyle}>
        <Button component={Link} to="/" sx={iconButtonStyle}>
          <HomeIcon sx={iconStyle} />
        </Button>
        <PersonIcon sx={iconStyle} /> {/* Person sem navegação */}
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#FF0000",
  width: "100%",
  height: "8vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  borderBottom: "5px solid white",
};

const iconContainerStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center", // Alinha verticalmente os ícones
  justifyContent: "center", // Centraliza horizontalmente os ícones
};

const iconButtonStyle = {
  color: "black",
};

const iconStyle = {
  fontSize: "30px",
};


export default Header;

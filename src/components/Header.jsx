import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = localStorage.getItem("authenticated");
  const navigate = useNavigate();
  const handleGoBack = () => {
    // Volta para a página anterior, se possível
    navigate(-1);
  };
  return (
    <header style={headerStyle}>
      {isAuthenticated?<Button onClick={handleGoBack} sx={iconButtonStyle}>
        <ArrowBackIcon sx={iconStyle} /> 
      </Button>:<div></div>}
  
      <div style={iconContainerStyle}>
      <Button component={Link} to="/perfil" sx={iconButtonStyle}>
        <PersonIcon sx={iconStyle} />
      </Button>
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

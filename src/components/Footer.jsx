import { PostAdd } from "@mui/icons-material";
import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      &copy; Desenvolvido por: Clara Pereira, Maria Clara Mendes e Yasmin Souza.
    </footer>
  );
};

const footerStyle = {
  position: "relative", // Garante que não sobreponha o conteúdo
  bottom: 0,
  backgroundColor: "#FF0000",
  width: "100%",
  height: "8vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
};

export default Footer;

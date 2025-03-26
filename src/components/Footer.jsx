import { PostAdd } from '@mui/icons-material';
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      &copy; Desenvolvido por: Clara Pereira, Maria Clara Mendes e Yasmin Souza.
    </footer>
  );
};

const footerStyle = {
  bottom: 0,           
  backgroundColor: "#FF0000",
  width: "100%",
  height: "8vh",        
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",  
  // margin:"10px",
   
 
};

export default Footer;

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Home() {
  const styles = getStyles();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <img src={logo} alt="SENAI" style={styles.logo} />
      </Box>
      <Container sx={styles.body}>
        <Typography sx={styles.title}>
          Bem vindo ao Agendamento Senai
        </Typography>
        <Button component={Link} to="/cadastro" sx={styles.button}>
          Faça o cadastro
        </Button>
        <Button component={Link} to="/login" sx={styles.button}>
          Faça login
        </Button>
      </Container>
    </Box>
  );
}

function getStyles() {
  return {
    container: {
      backgroundColor: "#ff0000",
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      width: "100%",
      height: "15vh",
      backgroundColor: "#ff0000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: "200px",
      height: "auto",
      border: "3px solid blue",
    },
    body: {
      backgroundColor: "#D4D4D4",
      width: "80%",
      maxWidth: "500px",
      padding: "30px",
      borderRadius: "10px",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#ff0000",
      color: "white",
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "5px",
      fontSize: "16px",
      fontWeight: "bold",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#cc0000",
      },
    },
  };
}

export default Home;

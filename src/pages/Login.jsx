import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import api from "../services/axios";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";


function Login() {
  const styles = getStyles();
  const [usuario, setUsuario] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    await api.postLogin(usuario).then(
      (response) => {
        alert("Login realizado com sucesso!");
        navigate("/principal");
      },
      (error) => {
        console.log(error);
        alert("Erro ao realizar login. Verifique suas credenciais.");
      }
    );
  }

  return (
    <Container component="main" sx={styles.container}>
      <Box >
        <Button component={Link} to="/" sx={styles.buttonHeader}></Button>
        <Button component={Link} to="/cadastro" sx={styles.buttonHeader}>
          <HomeIcon sx={{ fontSize: 50, color: "black"}} />
        </Button>
      </Box>
      <Box component="form" sx={styles.form} onSubmit={handleSubmit} noValidate>
        <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
        <TextField
          required
          fullWidth
          id="email"
          placeholder="E-mail"
          name="email"
          margin="normal"
          value={usuario.email}
          onChange={onChange}
          sx={styles.textField}
        />
        <TextField
          required
          fullWidth
          id="senha"
          placeholder="Senha"
          name="senha"
          type="password"
          margin="normal"
          value={usuario.senha}
          onChange={onChange}
          sx={styles.textField}
        />
        <Button sx={styles.buttonLogin} type="submit" variant="contained">
          Entrar
        </Button>
      </Box>
    </Container>
  );
}

function getStyles() {
  return {
    container: {
      backgroundColor: "white",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: 0, // Elimina margens que podem estar criando bordas brancas
      padding: 0, // Elimina o preenchimento, caso haja    
      overflow: "hidden" // Garante que nenhum conteúdo ultrapasse a tela 
    },
    header: {
      width: "100%",
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      // padding: "0 20px",
      position: "absolute",
      top: 0,
    },
    buttonHeader: {
      backgroundColor: "transparent",
      border: "none",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#D4D4D4",
      padding: "30px",
      borderRadius: "10px",
    },
    logo: {
      width: "250px",
      height: "auto",
      marginBottom: "20px",
    },
    textField: {
      width: "300px",
      backgroundColor: "white",
      borderRadius: "5px",
    },
    buttonLogin: {
      marginTop: "20px",
      color: "white",
      backgroundColor: "#ff0000",
      width: "100px",
      height: "40px",
      borderRadius: "10px",
    },
  };
}

export default Login;

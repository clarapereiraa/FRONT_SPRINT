import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Login() {
  const styles = getStyles();
  const [usuario, setUsuario] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postLogin(usuario);
      alert(response.data.message);
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id_usuario",response.data.user.id_usuario)
      navigate("/principal");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Erro ao fazer login");
    }
  };

  return (
    <div style={{ backgroundColor: "#E8E8E8" }}>
      <Header />

      <Container component="main" sx={styles.container}>
        <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
        <Box
          component="form"
          sx={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <Typography sx={styles.title}>Faça o Login</Typography>
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
          <Button type="submit" variant="contained" sx={styles.buttonLogin}>
            Entrar
          </Button>

          {/* Container para mensagem e botão lado a lado */}
          <Box sx={styles.viewToCadastro}>
            <Typography sx={styles.textToCadastro}>
              Não tem uma conta?
            </Typography>
            <Button
              component={Link}
              to="/cadastro"
              variant="text"
              sx={styles.buttonCadastro}
            >
              Cadastre-se
            </Button>
          </Box>
        </Box>
      </Container>

      <Footer />
    </div>
  );
}

function getStyles() {
  return {
    container: {
      backgroundColor: "#E8E8E8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // Garante a distribuição uniforme verticalmente
      width: "100%", // Ocupa toda a largura da tela
      height: "100vh", // Ocupa toda a altura da tela
      boxSizing: "border-box", // Garante que padding e borda sejam incluídos no tamanho total
      padding: 0,
    },
    form: {
      mt: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#D4D4D4",
      borderRadius: "5px",
      width: "34%",
      padding: "30px",
    },

    logo: {
      width: "300px",
      margin: 0,
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
      marginBottom: "10px",
    },
    textField: {
      width: "45vh",
      backgroundColor: "white",
      borderRadius: 1,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { border: "none" },
        "&:hover fieldset": { border: "none" },
        "&.Mui-focused fieldset": { border: "none" },
      },
      "& input::placeholder": { fontSize: "17px", color: "black" },
    },
    buttonLogin: {
      mt: 3,
      color: "white",
      backgroundColor: "#FF0000",
      width: 300,
      height: 45,
      fontWeight: 600,
      fontSize: 15,
      borderRadius: 2,
      textTransform: "none",
      "&:hover": { backgroundColor: "#FF0000" },
    },
    viewToCadastro: {
      mt: 2,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    textToCadastro: {
      fontSize: 15,
      fontWeight: "bold",
    },
    buttonCadastro: {
      color: "black",
      backgroundColor: "transparent",
      fontWeight: "bold",
      fontSize: 15.5,
      textDecoration: "underline",
      textTransform: "none",
      "&:hover": { color: "#FF0000" },
    },
  };
}

export default Login;

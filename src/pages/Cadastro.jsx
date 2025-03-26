import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import api from "../axios/axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Padding } from "@mui/icons-material";

function Cadastro() {
  const styles = getStyles();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nomecompleto: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postCadastro(usuario);
      alert(response.data.message);
      navigate("/principal");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
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
          <Typography sx={styles.title}>Faça o seu Cadastro</Typography>
          <TextField
            required
            fullWidth
            id="nome"
            placeholder="Nome"
            name="nomecompleto"
            margin="normal"
            value={usuario.nomecompleto}
            onChange={onChange}
            sx={styles.textField}
          />
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
            id="cpf"
            placeholder="CPF"
            name="cpf"
            margin="normal"
            value={usuario.cpf}
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
          <Button type="submit" variant="contained" sx={styles.buttonCadastro}>
            Cadastrar-se
          </Button>

          {/* Container para mensagem e botão lado a lado */}
          <Box sx={styles.viewToLogin}>
            <Typography sx={styles.textToLogin}>Já tem uma conta?</Typography>
            <Button
              component={Link}
              to="/login"
              variant="text"
              sx={styles.buttonToLogin}
            >
              Faça Login
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
      padding:0
    },

    logo: {
      width: "300px",
    },

    form: {
      mt: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#D4D4D4",
      borderRadius: "5px",
      width: "39%",
      padding: "20px"
      
    },

    title: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
      marginBottom: "10px",
    },

    textField: {
      mt: 2,
      width: "40vh",
      height: 50,
      backgroundColor: "white",
      borderRadius: 1,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { border: "none" },
        "&:hover fieldset": { border: "none" },
        "&.Mui-focused fieldset": { border: "none" },
      },
      "& input::placeholder": { fontSize: "17px", color: "black" },
    },

    buttonCadastro: {
      mt: 3,
      color: "white",
      backgroundColor: "#FF0000",
      width: 135,
      height: 40,
      fontWeight: 600,
      fontSize: 15,
      borderRadius: 2,
      textTransform: "none",
      "&:hover": { backgroundColor: "#FF0000" },
    },

    viewToLogin: {
      mt: 2,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    textToLogin: {
      fontSize: 16,
      color: "black",
      fontWeight: "bold",
      mr: 1,
    },

    buttonToLogin: {
      color: "black",
      backgroundColor: "transparent",
      fontWeight: "bold",
      fontSize: 16.5,
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      textTransform: "none",
      "&:hover": { color: "#FF0000" },
    },
  };
}

export default Cadastro;

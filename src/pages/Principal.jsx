import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Principal() {
  const styles = getStyles();
  const [sala, setSala] = useState([]);
  const navigate = useNavigate();

  async function getSalas() {
    await api.getSalas().then(
      (response) => {
        console.log(response.data.salas);
        setSala(response.data.salas);
      },
      (error) => {
        console.log("Erro", error.response.data);
      }
    );
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");

    if (!isAuthenticated) {
      // Se não estiver autenticado, redireciona para a página de login
      navigate("/");
    } else {
      // Se autenticado, faz a busca pelas salas
      getSalas();
    }
  }, [navigate]);

  const listSalas = sala.map((sala) => (
    <TableRow key={sala.id_sala}>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.classificacao}
      </TableCell>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.horarios_disponiveis}
      </TableCell>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.bloco}
      </TableCell>
    </TableRow>
  ));

  return (
    <Container sx={styles.container}>
       <Header />
      <Box sx={styles.boxFundoTabela}>
        <Container sx={styles.container}>{/* Conteúdo da página */}</Container>

        <TableContainer sx={styles.tableContainer}>
          <Table size="small" sx={styles.table}>
            <TableHead sx={styles.tableHead}>
              <TableRow sx={styles.tableRow}>
                <TableCell align="center" sx={styles.tableCell}>
                  Clasificação
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  Horários Disponíveis
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  Bloco
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={styles.tableBody}>{listSalas}</TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Container>
  );
}

function getStyles() {
  return {
    container: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "auto",
      minWidth: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
    },

    logo: {
      width: "230px",
      height: "auto",
      marginRight: "1540px",
      border: "4px solid white",
      borderRadius: 15,
    },
    buttonHome: {
      mr: 8,
    },
    tableContainer: {
      backgroundColor: "transparent",
    },
    table: {
      backgroundColor: "#D9D9D9",
      marginTop: 2.5,
      marginBottom: 2.5,
      marginLeft: "auto",
      marginRight: "auto",
      width: "calc(100% - 40px)",
      borderRadius: "15px",
    },
    tableHead: {
      backgroundColor: "#FFFFFF",
      borderRadius: "50px",
    },
    boxFundoTabela: {
      border: "5px solid white",
      borderRadius: "15px",
      backgroundColor: "#D9D9D9",
      width: "90%",
    },
    tableCell: {
      backgroundColor: "#FF0000",
      border: "2px solid white",
      fontWeight: "bold",
      fontSize: 22,
      paddingTop: 2,
    },
    tableBody: {
      border: "3px solid white",
      borderRadius: 10,
    },
    tableBodyCell: {
      backgroundColor: "#D9D9D9",
      border: "1px solid white",
      borderRadius: 10,
      color: "black",
      fontSize: 20,
      paddingTop: 1.2,
      paddingBottom: 1.2,
    },
  };
}

export default Principal;

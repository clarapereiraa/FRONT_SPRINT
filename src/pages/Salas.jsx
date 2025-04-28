import { useParams } from "react-router-dom";
import { Grid, Typography, Paper } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Dados das salas
const salasPorBloco = {
  A: [
    { id: 1, nome: "Alta Mogiana Almoxarife" },
    { id: 2, nome: "Alta Mogiana Automotiva" },
    { id: 3, nome: "Alta Mogiana Desenvolvimento de Sistema" },
    { id: 4, nome: "Alta Mogiana Eletroeletrônica" },
    { id: 5, nome: "Alta Mogiana Manutenção" },
    { id: 6, nome: "A1 - CONVERSORES" },
    { id: 7, nome: "A2 - ELETRÔNICA" },
    { id: 8, nome: "A3 - CLP" },
    { id: 9, nome: "A4 - AUTOMAÇÃO" },
    { id: 10, nome: "A5 - METROLOGIA" },
    { id: 11, nome: "A6 - PNEUMÁTICA/HIDRÁULICA" },
  ],
  B: [
    { id: 1, nome: "B2 - SALA DE AULA" },
    { id: 2, nome: "B3 - SALA DE AULA" },
    { id: 3, nome: "B5 - SALA DE AULA" },
    { id: 4, nome: "B6 - SALA DE AULA" },
    { id: 5, nome: "B7 - SALA DE AULA" },
    { id: 6, nome: "B8 - LAB. INFORMÁTICA" },
    { id: 7, nome: "B9 - LAB. INFORMÁTICA" },
    { id: 8, nome: "B10 - LAB. INFORMÁTICA" },
    { id: 9, nome: "B11 - LAB. INFORMÁTICA" },
    { id: 10, nome: "B12 - LAB. INFORMÁTICA" },
  ],
  C: [
    { id: 1, nome: "Colorado A1" },
    { id: 2, nome: "Colorado Oficina" },
    { id: 3, nome: "C1 - SALA DE AULA (ALP)" },
    { id: 4, nome: "C2 - LAB. DE INFORMÁTICA" },
    { id: 5, nome: "C3 - SALA DE MODELAGEM VESTUÁRIO" },
    { id: 6, nome: "C4 - SALA DE MODELAGEM VESTUÁRIO" },
    { id: 7, nome: "C5 - SALA DE AULA" },
  ],
  D: [
    { id: 1, nome: "D1 - SALA MODELAGEM" },
    { id: 2, nome: "D2 - SALA DE MODELAGEM" },
    { id: 3, nome: "D3 - SALA DE AULA" },
    { id: 4, nome: "D4 - SALA DE CRIAÇÃO" },
  ],
};

// Componente que renderiza uma sala individual
function SalaCard({ nome }) {
  return (
    <Paper
      elevation={3}
      sx={{
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        textAlign: "center",
        padding: 2,
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
          transform: "scale(1.05)",
          transition: "all 0.3s",
        },
      }}
    >
      {nome}
    </Paper>
  );
}

// Componente principal
function Salas() {
  const { bloco } = useParams();
  const salas = salasPorBloco[bloco] || [];

  return (
    <>
      <Header />

      <Typography
        variant="h4"
        align="center"
        sx={{ marginTop: 4, marginBottom: 4, fontWeight: "bold" }}
      >
        Bloco {bloco}
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ paddingX: 2 }}>
        {salas.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center">Carregando Salas...</Typography>
          </Grid>
        ) : (
          salas.map((sala) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sala.id}>
              <SalaCard nome={sala.nome} />
            </Grid>
          ))
        )}
      </Grid>

      <Footer />
    </>
  );
}

export default Salas;

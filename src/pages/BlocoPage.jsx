import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios/axios";
import {
  Grid,
  Paper,
  Typography,
  Chip,
  Box,
  Button,
  Divider,
} from "@mui/material";


function BlocoPage() {
  const { bloco } = useParams();
  const [salas, setSalas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSalas() {
      try {
        const blocoFns = {
          A: api.getBlocoA,
          B: api.getBlocoB,
          C: api.getBlocoC,
          D: api.getBlocoD,
        };

        const fetchFunction = blocoFns[bloco];

        if (!fetchFunction) {
          console.error("Bloco inválido:", bloco);
          return;
        }

        const response = await fetchFunction();
        console.log("Salas recebidas:", response.data);
        setSalas(response.data.salas);
      } catch (error) {
        console.error("Erro ao buscar salas do bloco:", error);
      }
    }

    fetchSalas();
  }, [bloco]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Salas do Bloco {bloco}
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      {salas.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          Nenhuma sala encontrada para este bloco.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {salas.map((sala) => (
            <Grid item xs={12} sm={6} md={4} key={sala.id_sala}>
              <Paper elevation={3} style={{ padding: "20px", borderRadius: "8px" }}>
                <Typography variant="h6" gutterBottom>
                  {sala.classificacao}
                </Typography>
                <Box mb={2}>
                  <Chip label={`Bloco ${sala.bloco}`} color="primary" />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Horários Disponíveis:{" "}
                  {sala.horarios_disponiveis}
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="default" fullWidth onClick={()=> navigate(`disponibilidade/${sala.id_sala}`)}>
                    Ver Disponibilidade
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default BlocoPage;

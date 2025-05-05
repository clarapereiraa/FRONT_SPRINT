import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../axios/axios";  // Certifique-se de que esse caminho esteja correto
import { useNavigate } from "react-router-dom";


function ListSalas() {
    const [sala, setSalas] = useState([]);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const navigate = useNavigate();
  
    const showAlert = (severity, message) => {
      setAlert({ open: true, severity, message });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
      };
    
      async function getSalas() {
        try {
          const response = await api.get("/sala"); 
          setSalas(response.data.salas);
        } catch (error) {
          console.error("Erro ao buscar salas", error);
          showAlert("error", "Erro ao buscar salas");
        }
      }

      function verDisponibilidade(id_sala) {
        navigate(`/sala/${id_sala}/disponibilidade`);
      }

  useEffect(() => {
    getSalas();  
  }, []);

  const [salaSelecionado, setSalaSelecionado] = useState("");
const [modalOpen, setModalOpen] = useState(false);

const abrirModalReserva = (sala) => {
  setSalaSelecionado(sala);
  setModalOpen(true);
};

const fecharModalReserva = () => {
  setModalOpen(false);
  setSalaSelecionado("");
};

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <ModalCriarReserva
      open={modalOpen}
      onClose={fecharModalReserva}
      salaSelecionado={salaSelecionado}/>

      {salas.length === 0 ? (
        <h1>Carregando salas...</h1>  // Mensagem enquanto os dados estão sendo carregados
      ) : (
        <div>
          <h5>Lista de Salas</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "brown" }}>
                <TableRow>
                  <TableCell align="center">Nome</TableCell> {/* Nome do Evento */}
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Ações</TableCell>
                  <TableCell align="center" sx={{color: "#fff"}}>Criar ingresso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos.map((evento) => (
                  <TableRow key={evento.id_evento}>
                    <TableCell align="center">{evento.nome}</TableCell> {/* Nome do Evento */}
                    <TableCell align="center">{evento.descricao}</TableCell>
                    <TableCell align="center">{evento.data_hora}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => deleteEventos(evento.id_evento)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                    <IconButton onClick={() => abrirModalReserva(evento)}>
                    Adicionar 
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Button fullWidth variant="contained" onClick={() => navigate("/users")}>
        Voltar para lista de usuários
      </Button>
    </div>
  );
}

export default ListSalas;

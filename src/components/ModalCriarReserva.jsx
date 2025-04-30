import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../axios/axios";

export default function ModalReservas({
  open,
  onClose,
  salaSelecionada,
}) {
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.post("/reserva", {
        data,
        horario,
        fk_id_sala: salaSelecionada.id_sala,
      });
      alert(response.data.message); // Supondo que a resposta contenha uma mensagem
      limpaState();
    } catch (error) {
      console.log("Erro ao criar reserva", error.response?.data || error);
      alert(error.response?.data?.error || "Erro desconhecido");
    }
  };

  function limpaState() {
    setData("");
    setHorario("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reservar sala: {salaSelecionada.nome}</DialogTitle>
      <DialogContent>
        <TextField
          label="Data"
          type="date"
          fullWidth
          margin="dense"
          value={data}
          onChange={(e) => setData(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Horário"
          type="time"
          fullWidth
          margin="dense"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Reservar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

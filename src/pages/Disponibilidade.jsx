import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalReserva from "../components/ModalReserva";

import api from "../axios/axios";

function Disponibilidade() {
  const { id, bloco } = useParams(); // ID da sala da URL
  const [data, setData] = useState(""); // Data escolhida pelo usuário
  const [reservas, setReservas] = useState([]); // Reservas já feitas para a sala
  const [carregando, setCarregando] = useState(false); // Status de carregamento
  const [erro, setErro] = useState(""); // Mensagem de erro

  const [modalAberto, setModalAberto] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const dados = { fk_id_sala: id, datahora_inicio: data };

  // Função que vai buscar as reservas já feitas para a sala e data
  const buscarReservas = async () => {
    setCarregando(true);
    setErro("");

    try {
      const response = await api.getReservaIdData(dados);
      setReservas(response.data.reservas); // Reservas já feitas
    } catch (err) {
      setErro("Erro ao buscar reservas. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  // Função que vai gerar os horários disponíveis de 1 hora
  const gerarHorariosDisponiveis = () => {
    const horariosGerados = [];
    const inicioDia = new Date(`${data}T07:00:00`);
    const fimDia = new Date(`${data}T17:00:00`);

    let horarioAtual = new Date(inicioDia);
    while (horarioAtual < fimDia) {
      const horarioFim = new Date(horarioAtual);
      horarioFim.setHours(horarioFim.getHours() + 1);

      horariosGerados.push({
        inicio: horarioAtual.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        fim: horarioFim.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inicioCompleto: horarioAtual.toISOString(),
        fimCompleto: horarioFim.toISOString(),
      });

      horarioAtual.setHours(horarioAtual.getHours() + 1);
    }

    return horariosGerados;
  };

  const filtrarHorariosDisponiveis = () => {
    if (!reservas || !data) return [];

    const horariosGerados = gerarHorariosDisponiveis();

    return horariosGerados.filter((horario) => {
      return !reservas.some((reserva) => {
        const inicioReserva = new Date(reserva.datahora_inicio);
        const fimReserva = new Date(reserva.datahora_fim);
        const inicioHorario = new Date(horario.inicioCompleto);
        const fimHorario = new Date(horario.fimCompleto);

        return (
          (inicioHorario >= inicioReserva && inicioHorario < fimReserva) ||
          (fimHorario > inicioReserva && fimHorario <= fimReserva)
        );
      });
    });
  };

  useEffect(() => {
    if (data) {
      buscarReservas();
    }
  }, [data]);

  const horariosDisponiveis = filtrarHorariosDisponiveis();

  const handleReservar = (horario) => {
    const dataFormatada = new Date(horario.inicioCompleto).toLocaleDateString();
    const horaFormatada = new Date(horario.inicioCompleto).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setReservaSelecionada({
      bloco: bloco, // Substituir com dado real, se houver
      sala: `Sala ${id}`,
      data: dataFormatada,
      horario: horaFormatada,
      ...horario,
    });

    setModalAberto(true);
  };

  const confirmarReserva = async () => {
    if (!reservaSelecionada) return;

    setModalAberto(false);

    const fk_id_usuario = localStorage.getItem("id_usuario");

    if (!fk_id_usuario) {
      alert("Usuário não autenticado.");
      return;
    }

    const reserva = {
      fk_id_usuario,
      fk_id_sala: id,
      datahora_inicio: reservaSelecionada.inicioCompleto,
      datahora_fim: reservaSelecionada.fimCompleto,
    };

    try {
      const response = await api.postReserva(reserva);
      buscarReservas();
    } catch (error) {
      console.log("Erro ao fazer reserva:", error.response.data.error);
      if (error.response && error.response.data && error.response.data.error) {
        alert("Erro: " + error.response.data.error);
      } else {
        alert("Erro ao fazer reserva. Tente novamente.");
      }
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Reserva para Sala {id}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="data">Escolha uma data: </label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      {carregando ? (
        <p>Carregando horários disponíveis...</p>
      ) : erro ? (
        <p style={{ color: "red" }}>{erro}</p>
      ) : data === "" ? (
        <p>Escolha uma data para ver os horários.</p>
      ) : horariosDisponiveis.length === 0 ? (
        <p>Nenhum horário disponível para esta data.</p>
      ) : (
        <div>
          <h3>Horários disponíveis:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {horariosDisponiveis.map((horario, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "0.5rem",
                  background: "#f2f2f2",
                  padding: "0.5rem",
                  borderRadius: "5px",
                }}
              >
                <strong>
                  {horario.inicio} - {horario.fim}
                </strong>{" "}
                <button
                  style={{
                    marginLeft: "1rem",
                    padding: "0.3rem 0.7rem",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleReservar(horario)}
                >
                  Reservar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ModalReserva
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirm={confirmarReserva}
        reserva={reservaSelecionada || {}}
      />
    </div>
  );
}

export default Disponibilidade;

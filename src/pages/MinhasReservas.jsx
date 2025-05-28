import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../axios/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalExcluir from "../components/ModalExcluir";
import EditIcon from "@mui/icons-material/Edit";
import ModalEditar from "../components/ModalEditar";

const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const abrirModalExcluir = (reserva) => {
    setReservaSelecionada(reserva);
    setModalAberto(true);
  };
  const abrirModalEditar = (reserva) => {
    setReservaSelecionada(reserva);
    setModalAberto(true);
  };

  // Função para excluir uma reserva
  const deleteReserva = async () => {
    if (!reservaSelecionada) return;

    try {
      await api.deleteReserva(reservaSelecionada.id_reserva);
      setReservas(
        reservas.filter((r) => r.id_reserva !== reservaSelecionada.id_reserva)
      );
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    } finally {
      setModalAberto(false);
      setReservaSelecionada(null);
    }
  };

  const updateReserva = async (id, datahora_inicio, datahora_fim) => {
    try {
      const response = await fetch(`/api/reservas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datahora_inicio, datahora_fim }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar reserva');
      }
  
      return data; // Retorna os dados atualizados
    } catch (error) {
      console.error('Erro na atualização da reserva:', error.message);
      throw error; // Propaga o erro para tratamento posterior
    }
  };
  

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const id_usuario = localStorage.getItem("id_usuario");
        if (!id_usuario) {
          throw new Error("Usuário não autenticado");
        }

        const response = await api.getReservaByUsuario(id_usuario);
        setReservas(response.data.reservas); // Ajuste para acessar a propriedade 'reservas' na resposta
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setReservas([]); // Limpa o estado em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  return (
    <>
      <Header />
      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1
          style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}
        >
          Minhas Reservas
        </h1>

        {loading ? (
          <p>Carregando reservas...</p>
        ) : reservas.length === 0 ? (
          <p>Você não possui reservas cadastradas.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {reservas.map((reserva) => (
              <div
                key={reserva.id_reserva}
                style={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "20px",
                  width: "80%",
                  textAlign: "left",
                  position: "relative", // Necessário para posicionar o ícone de delete
                }}
              >
                <p>
                  <strong>Sala:</strong> {reserva.classificação}
                </p>
                <p>
                  <strong>Data Início:</strong>{" "}
                  {new Date(reserva.datahora_inicio).toLocaleString()}
                </p>
                <p>
                  <strong>Data Fim:</strong>{" "}
                  {new Date(reserva.datahora_fim).toLocaleString()}
                </p>

                {/* Ícone de Deletar dentro da reserva */}
                <DeleteIcon
                  style={{
                    position: "absolute", // Posiciona o ícone em relação ao pai (div reserva)
                    top: "10px", // Distância do topo
                    right: "10px", // Distância da direita
                    cursor: "pointer", // Adiciona cursor pointer para interatividade
                    color: "red", // Cor vermelha para indicar exclusão
                  }}
                  onClick={() => abrirModalExcluir(reserva)}
                />

                <EditIcon
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "50px", // espaço antes do ícone de deletar
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => abrirModalEditar(reserva)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <ModalExcluir
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirm={deleteReserva}
        reserva={reservaSelecionada}
      />

      <ModalEditar
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirm={updateReserva => {
          // Lógica para salvar os dados atualizados
          console.log(dadosAtualizados);
          setModalAberto(false);
        }}
        reserva={reservaSelecionada}
      />

      <Footer />
    </>
  );
};

export default MinhasReservas;

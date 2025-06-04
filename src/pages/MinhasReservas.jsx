import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../axios/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalExcluir from "../components/ModalExcluir";

const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const abrirModalExcluir = (reserva) => {
    setReservaSelecionada(reserva);
    setModalExcluirAberto(true);
  };

  // Função para excluir uma reserva
  const deleteReserva = async () => {
    if (!reservaSelecionada) return;

    try {
      await api.deleteReserva(reservaSelecionada.id_reserva);
      fetchReservas();
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    } finally {
      setModalExcluirAberto(false);
      setReservaSelecionada(null);
    }
  };

  
  const fetchReservas = async () => {
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) {
        throw new Error("Usuário não autenticado");
      }

      const response = await api.getReservaByUsuario(id_usuario);
      console.log(response.data.reservas)
      setReservas(response.data.reservas); // Ajuste para acessar a propriedade 'reservas' na resposta
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      setReservas([]); // Limpa o estado em caso de erro
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
                  <strong>Sala:{reserva.classificacao} </strong>
                </p>
                <p>
                  <strong>Bloco:{reserva.bloco} </strong>
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
                    color: "red", // Cor vermelha
                  }}
                  onClick={() => abrirModalExcluir(reserva)}
                />

              </div>
            ))}
          </div>
        )}
      </main>

      <ModalExcluir
        isOpen={modalExcluirAberto}
        onClose={() => setModalExcluirAberto(false)}
        onConfirm={deleteReserva}
        reserva={reservaSelecionada}
      />

      <Footer />
    </>
  );
};

export default MinhasReservas;

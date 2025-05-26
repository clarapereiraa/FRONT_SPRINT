import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../axios/axios"; // Certifique-se de que esse `api` possui o método getReservaByUsuario

const MinhasReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const id_usuario = localStorage.getItem("id_usuario");
        if (!id_usuario) {
          throw new Error("Usuário não autenticado");
        }

        const response = await api.getReservaByUsuario(id_usuario);
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setReservas([]);
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
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>
          Minhas Reservas
        </h1>

        {loading ? (
          <p>Carregando reservas...</p>
        ) : reservas.length === 0 ? (
          <p>Você não possui reservas cadastradas.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                  textAlign: "left"
                }}
              >
                <p><strong>Sala:</strong> {reserva.nome_sala}</p>
                <p><strong>Data Início:</strong> {new Date(reserva.data_inicio).toLocaleString()}</p>
                <p><strong>Data Fim:</strong> {new Date(reserva.data_fim).toLocaleString()}</p>
                {/* Adicione outros campos conforme necessário */}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MinhasReservas;

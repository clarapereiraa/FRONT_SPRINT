import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();

  let nome = "";
  let email = "";
  let cpf = "";

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      nome = user.nome;
      email = user.email;
      cpf = user.cpf;
    }
  } catch (error) {
    console.error("Erro ao ler dados do usuário:", error);
  }

  const handleReservasClick = () => {
    navigate("/minhasreservas");
  };

  return (
    <>
      <Header />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", marginBottom: "40px", textAlign: "center" }}>
          Meu perfil
        </h1>
        <div
          style={{
            textAlign: "left",
            display: "inline-block",
            fontSize: "20px",
            fontWeight: "bold",
            color: "gray",
            lineHeight: "2",
          }}
        >
          <div>Nome: <span style={{ fontWeight: "normal", color: "#444" }}>{nome}</span></div>
          <div>Email: <span style={{ fontWeight: "normal", color: "#444" }}>{email}</span></div>
          <div>CPF: <span style={{ fontWeight: "normal", color: "#444" }}>{cpf}</span></div>
        </div>
      </main>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleReservasClick}
          style={{
            marginTop: 40,
            backgroundColor: "#FF0000",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-block",
            marginBottom: "150px",
          }}
        >
          Minhas Reservas
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Perfil;

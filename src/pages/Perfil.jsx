import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ModalEditar from "../components/ModalEditar"; // ✅ agora usa ModalEditar

const Perfil = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [nome, setNome] = useState(storedUser?.nome || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [cpf] = useState(storedUser?.cpf || "");

  const [showModalEditar, setShowModalEditar] = useState(false); // controla o modal

  const handleReservasClick = () => {
    navigate("/minhasreservas");
  };

  const handleConfirmarAtualizacao = async ({ nome, email }) => {
    try {
      const response = await fetch("/api/usuario/atualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, cpf }),
      });

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        const userAtualizado = { nome, email, cpf };
        localStorage.setItem("user", JSON.stringify(userAtualizado));
        setNome(nome);
        setEmail(email);
        setShowModalEditar(false);
      } else {
        alert("Erro ao atualizar dados.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar dados.");
    }
  };

  return (
    <>
      <Header />

      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", marginBottom: "40px" }}>
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

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        marginBottom: "150px",
        marginTop: "40px",
      }}>
        <button
          onClick={handleReservasClick}
          style={{
            backgroundColor: "#FF0000",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Minhas Reservas
        </button>

        <button
          onClick={() => setShowModalEditar(true)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Atualizar Dados
        </button>
      </div>

      <ModalEditar
        isOpen={showModalEditar}
        onClose={() => setShowModalEditar(false)}
        onConfirm={handleConfirmarAtualizacao}
        usuario={{ nome, email }}
      />

      <Footer />
    </>
  );
};

export default Perfil;

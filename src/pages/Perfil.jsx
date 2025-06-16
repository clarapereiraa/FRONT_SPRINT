import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import EditarPerfil from "../components/EditarPerfil";

const Perfil = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const id_usuario = localStorage.getItem("id_usuario");

  const [nome, setNome] = useState(storedUser.nome || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [cpf] = useState(storedUser.cpf || "");
  const [showModal, setShowModal] = useState(false);

  const handleReservasClick = () => {
    navigate("/minhasreservas");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("authenticated");
    navigate("/login");
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita!"
    );
    if (confirm) {
      try {
        await api.deleteUser(id_usuario);
        alert("Conta excluída com sucesso!");
        handleLogout();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert(
          error?.response?.data?.error ||
            "Erro ao excluir. Tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <>
      <main style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1
          style={{ fontSize: "32px", fontWeight: "900", marginBottom: "40px" }}
        >
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
          <div>
            Nome:{" "}
            <span style={{ fontWeight: "normal", color: "#444" }}>{nome}</span>
          </div>
          <div>
            Email:{" "}
            <span style={{ fontWeight: "normal", color: "#444" }}>{email}</span>
          </div>
          <div>
            CPF:{" "}
            <span style={{ fontWeight: "normal", color: "#444" }}>{cpf}</span>
          </div>
        </div>
      </main>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginBottom: "150px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleReservasClick}
          style={buttonStyle("#FF0000")}
        >
          Minhas Reservas
        </button>

        <button
          onClick={() => setShowModal(true)}
          style={buttonStyle("red")}
        >
          Editar Perfil
        </button>

        <button
          onClick={handleLogout}
          style={buttonStyle("red")}
        >
          Logout
        </button>

        <button
          onClick={handleDelete}
          style={buttonStyle("red")}
        >
          Excluir Conta
        </button>
      </div>

      <EditarPerfil
        visible={showModal}
        onClose={() => setShowModal(false)}
        user={{ ...storedUser, id_usuario }}
        onUpdate={(updatedUser) => {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setNome(updatedUser.nome);
          setEmail(updatedUser.email);
        }}
      />

      <Footer />
    </>
  );
};

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  padding: "12px 24px",
  fontSize: "18px",
  fontWeight: "bold",
  borderRadius: "6px",
  cursor: "pointer",
  minWidth: "180px",
});

export default Perfil;

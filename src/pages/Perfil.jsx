import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [nome, setNome] = useState(storedUser.nome || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [cpf] = useState(storedUser.cpf || "");

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
        }}
      >
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
          onClick={handleLogout}
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
          Logout
        </button>

      </div>

      <Footer />
    </>
  );
};

export default Perfil;

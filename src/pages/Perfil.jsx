import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Perfil = () => {
  let nome = "";
  let email = "";
  let cpf = "";
  let senha = "";

  try {
    const user = localStorage.getItem("user");
    if (user) {
      const user = JSON.parse(user);
      nome = user.nome;
      email = user.email;
      cpf = user.cpf;
      senha = user.senha;
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
        <h1
          style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}
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
          <div>
            Senha:{" "}
            <span style={{ fontWeight: "normal", color: "#444" }}>{senha}</span>
          </div>
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
            marginBottom: "97px",
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

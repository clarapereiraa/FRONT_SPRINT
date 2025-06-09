import React, { useState, useEffect } from "react";

const ModalEditar = ({ isOpen, onClose, onConfirm, usuario }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    }
  }, [usuario]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm({ nome, email });
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={titulo}>Atualizar Dados do Usuário</h3>

        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={input}
        />

        <label style={{ marginTop: "15px" }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <div style={botoesContainer}>
          <button style={botaoNao} onClick={onClose}>Cancelar</button>
          <button style={botaoSim} onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

// Estilos reutilizados/adaptados
const overlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  backgroundColor: "#dcdcdc",
  padding: "30px",
  borderRadius: "12px",
  width: "320px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
};

const titulo = {
  fontSize: "18px",
  marginBottom: "20px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #aaa",
  marginTop: "5px",
  fontSize: "16px",
};

const botoesContainer = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "30px",
};

const botaoBase = {
  backgroundColor: "#d40000",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "10px 25px",
  fontSize: "16px",
  cursor: "pointer",
};

const botaoSim = { ...botaoBase };
const botaoNao = { ...botaoBase, backgroundColor: "#555" };

export default ModalEditar;

import React from "react";

const ModalExcluirReserva = ({ isOpen, onClose, onConfirm, reserva }) => {
  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={titulo}>Deseja excluir esta reserva?</h3>
        <p><strong>Bloco:</strong> {reserva.bloco}</p>
        <p><strong>Sala:</strong> {reserva.sala}</p>
        <p><strong>Dia e Horario:</strong> {reserva.datahora_inicio}</p>

        <div style={botoesContainer}>
          <button style={botaoNao} onClick={onClose}>Cancelar</button>
          <button style={botaoSim} onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

// Estilos (reutilizados e adaptados)
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
};

const titulo = {
  fontSize: "18px",
  marginBottom: "20px",
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

export default ModalExcluirReserva;

import React, { useState, useEffect } from "react";

const ModalEditar= ({ isOpen, onClose, onConfirm, reserva }) => {
  const [formData, setFormData] = useState({
    bloco: "",
    sala: "",
    datahora_inicio: "",
  });

  useEffect(() => {
    if (reserva) {
      setFormData({
        bloco: reserva.bloco || "",
        sala: reserva.sala || "",
        datahora_inicio: reserva.datahora_inicio || "",
      });
    }
  }, [reserva]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const resultado = await updateReserva(
        reserva.id_reserva,
        formData.datahora_inicio,
        formData.datahora_fim
      );
      console.log('Reserva atualizada:', resultado);
      onConfirm(resultado); // Chama a função de confirmação com os dados atualizados
    } catch (error) {
      alert(error.message); // Exibe o erro para o usuário
    }
  };
  

  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={titulo}>Editar Reserva</h3>
        <div style={formGroup}>
          <label style={label}>Bloco:</label>
          <input
            style={input}
            type="text"
            name="bloco"
            value={formData.bloco}
            onChange={handleChange}
          />
        </div>
        <div style={formGroup}>
          <label style={label}>Sala:</label>
          <input
            style={input}
            type="text"
            name="sala"
            value={formData.sala}
            onChange={handleChange}
          />
        </div>
        <div style={formGroup}>
          <label style={label}>Dia e Horário:</label>
          <input
            style={input}
            type="datetime-local"
            name="datahora_inicio"
            value={formData.datahora_inicio}
            onChange={handleChange}
          />
        </div>
        <div style={botoesContainer}>
          <button style={botaoNao} onClick={onClose}>
            Cancelar
          </button>
          <button style={botaoSim} onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos (reutilizados e adaptados)
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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

const formGroup = {
  marginBottom: "15px",
};

const label = {
  display: "block",
  marginBottom: "5px",
};

const input = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
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

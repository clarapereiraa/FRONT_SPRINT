import React, { useState } from "react";
import sheets from "../axios/axios"; // Corrigido para usar seu sheets

const EditarPerfil = ({ visible, onClose, user, onUpdate }) => {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      const response = await sheets.updateUser(user.id_usuario, {
        nome,
        email,
        cpf: user.cpf, 
        senha: "********", 
      });

      alert(response.data.message);
      onUpdate({ ...user, nome, email });
      onClose();
    } catch (error) {
      console.error(
        "Erro ao atualizar usuário:",
        error.response.data || error.message
      );
      alert(
        error.response?.data?.error ||
          "Não foi possível atualizar as informações."
      );
    }
  };

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.titulo}>Editar Perfil</h2>

        <label style={styles.label}>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          style={styles.input}
        />

        <div style={styles.botoes}>
          <button style={styles.cancelar} onClick={onClose}>
            Cancelar
          </button>
          <button style={styles.salvar} onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
  titulo: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  label: {
    display: "block",
    marginTop: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  botoes: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelar: {
    backgroundColor: "gray",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
    marginRight: "10px",
  },
  salvar: {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },
};

export default EditarPerfil;

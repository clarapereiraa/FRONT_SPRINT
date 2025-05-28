
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.66:5000/api/v1/",
  headers: { accept: "application/json" },
});

const sheets = {
  postLogin: (usuario) => api.post("userLogin/", usuario),
  postCadastro: (usuario) => api.post("user/", usuario),
  getSalas: () => api.get("sala/"),
  getBlocoA: () => api.get("blocoA"),
  getBlocoB: () => api.get("blocoB"),
  getBlocoC: () => api.get("blocoC"),
  getBlocoD: () => api.get("blocoD"),
  getReservaIdData:(dados) => api.post("reservaIdData/", dados),
  postReserva: (dados) => api.post("/reserva", dados),
  getReservaByUsuario: (id) => api.get(`reserva/${id}`),
  deleteReserva: (id) => api.delete(`reserva/${id}`),
  updateReserva: (id) => api.update(`/reserva/${id}`),
};

export default sheets;

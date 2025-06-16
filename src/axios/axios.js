import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.66:5000/api/v1/",
  headers: { accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = ` ${token}`;
  }
  return config;
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
  updateUser: (id) => api.put(`user/${id}`, dados),
  deleteUser: (id) => api.delete(`user/${id}`),
};

export default sheets;

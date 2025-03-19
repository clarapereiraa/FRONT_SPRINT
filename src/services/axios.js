import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.85:5000/api/v1/",
  headers: { accept: "application/json" },
});

const sheets = {
  postLogin: (usuario) => api.post("login/", usuario),
  postCadastro: (usuario) => api.post("cadastro/", usuario),
  getSalas: (sala) => api.get("sala/", sala),
};

export default sheets;

import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.81:5000/api/v1/",
  headers: { accept: "application/json" },
});

const sheets = {
  postLogin: (usuario) => api.post("userLogin/", usuario),
  postCadastro: (usuario) => api.post("user/", usuario),
  getSalas: (sala) => api.get("sala/", sala),
};

export default sheets;

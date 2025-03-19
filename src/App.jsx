import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Salas from "./pages/Salas";
import Home from "./pages/Home";

function App() {
  return (
    <Router sx={{ margin: 0, padding: 0 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/salas" element={<Salas />} />
      </Routes>
    </Router>
  );
}

export default App;

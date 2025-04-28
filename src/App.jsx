import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Principal from "./pages/Principal";
import Home from "./pages/Home";
import Salas from "./pages/Salas";
import ProtectedRouter from "./components/ProtectedRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/principal"
          element={
            <ProtectedRouter>
              <Principal />
            </ProtectedRouter>
          }
        />
        <Route
          path="/salas/:bloco"
          element={
            <ProtectedRouter>
              <Salas />
            </ProtectedRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

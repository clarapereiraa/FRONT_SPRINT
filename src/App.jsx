import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Principal from "./pages/Principal";
import Home from "./pages/Home";
import ListSalas from "./pages/ListSalas";
import BlocoPage from "./pages/BlocoPage"; // <-- Importa a nova página
import ProtectedRouter from "./components/ProtectedRouter";
import Disponibilidade from "./pages/Disponibilidade"

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
          path="/sala"
          element={
            <ProtectedRouter>
              <ListSalas />
            </ProtectedRouter>
          }
        />
        <Route
          path="/bloco/:bloco"
          element={
            <ProtectedRouter>
              <BlocoPage />
            </ProtectedRouter>
          }
        />
        <Route
          path="/bloco/:bloco/disponibilidade/:id"
          element={
            <ProtectedRouter>
              <Disponibilidade />
            </ProtectedRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

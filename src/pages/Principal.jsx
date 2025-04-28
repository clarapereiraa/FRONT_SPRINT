import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Principal() {
  const navigate = useNavigate();

  function handleBlocoClick(bloco) {
    navigate(`/salas/${bloco}`);
  }

  return (
    <div>
      <Header />

      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Blocos</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 100px)", // Dois blocos por linha
          gap: "20px",
          justifyContent: "center",
          marginBottom: "205px", // Garantir que o rodapé não suba
        }}
      >
        {["A", "B", "C", "D"].map((bloco) => (
          <div
            key={bloco}
            onClick={() => handleBlocoClick(bloco)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "red",
              color: "white",
              fontSize: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "10px",
            }}
          >
            {bloco}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Principal;
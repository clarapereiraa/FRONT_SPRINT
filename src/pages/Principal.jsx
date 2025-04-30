import { useNavigate } from "react-router-dom";


function Principal() {
  const navigate = useNavigate();

  // Função chamada ao clicar em um bloco
  function handleBlocoClick(bloco) {
    navigate(`/bloco/${bloco}`); // Redireciona para a página do bloco clicado
  }

  return (
    <div>


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


    </div>
  );
}

export default Principal;

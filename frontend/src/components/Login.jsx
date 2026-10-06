import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function entrar(event) {
    event.preventDefault();

    if (!usuario || !senha) {
      alert("Preencha usuário e senha.");
      return;
    }

    localStorage.setItem("usuario", usuario);

    navigate("/diario");
  }

  return (
    <div className="login-container">
      <h1>📖 Diário de Tom Riddle</h1>

      <form onSubmit={entrar}>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
import { useEffect, useState } from "react";
import Entrada from "./Entrada";

import {
  criarEntrada,
  listarEntradas
} from "../services/Api";

function Diario() {
  const hoje = new Date()
    .toISOString()
    .split("T")[0];

  const [data, setData] = useState(hoje);
  const [texto, setTexto] = useState("");
  const [entradas, setEntradas] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarEntradas();
  }, []);

  async function carregarEntradas() {
    try {
      const dados = await listarEntradas();

      setEntradas(dados);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  async function salvarEntrada() {
    if (data > hoje) {
      alert(
        "Não é permitido usar uma data futura."
      );

      return;
    }

    if (!texto.trim()) {
      alert(
        "Escreva alguma coisa no diário."
      );

      return;
    }

    try {
      setCarregando(true);

      await criarEntrada(
        data,
        texto
      );

      alert(
        "Entrada salva com sucesso!"
      );

      setTexto("");

      await carregarEntradas();

    } catch (error) {
      alert(error.message);

    } finally {
      setCarregando(false);
    }
  }

  function sair() {
    localStorage.removeItem("usuario");

    window.location.href = "/";
  }

  return (
    <div className="diario-container">

      <header>
        <h1>
          📖 Diário de Tom Riddle
        </h1>

        <button onClick={sair}>
          Sair
        </button>
      </header>

      <main>

        <label>
          Data da entrada
        </label>

        <input
          type="date"
          value={data}
          max={hoje}
          onChange={(e) =>
            setData(e.target.value)
          }
        />

        <label>
          Escreva seu diário
        </label>

        <textarea
          value={texto}
          onChange={(e) =>
            setTexto(e.target.value)
          }
          placeholder="Querido diário..."
        />

        <button
          onClick={salvarEntrada}
          disabled={carregando}
        >
          {carregando
            ? "Salvando..."
            : "Salvar entrada"}
        </button>

        <section>

          <h2>
            Entradas anteriores
          </h2>

          {entradas.length === 0 ? (

            <p>
              Nenhuma entrada encontrada.
            </p>

          ) : (

            entradas.map((entrada) => (

              <Entrada
                key={entrada.id}
                entrada={entrada}
              />

            ))

          )}

        </section>

      </main>

    </div>
  );
}

export default Diario;
const API_URL = "http://localhost:3000";

export async function criarEntrada(
  data,
  texto
) {
  const resposta = await fetch(
    `${API_URL}/diario`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        data,
        texto
      })
    }
  );

  const resultado =
    await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.mensagem ||
      "Erro ao salvar entrada."
    );
  }

  return resultado;
}

export async function listarEntradas() {
  const resposta =
    await fetch(`${API_URL}/diario`);

  const resultado =
    await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.mensagem ||
      "Erro ao carregar entradas."
    );
  }

  return resultado;
}
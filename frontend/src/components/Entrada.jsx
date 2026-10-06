function Entrada({ entrada }) {
  return (
    <article className="entrada">

      <h3>
        {new Date(
          entrada.data + "T00:00:00"
        ).toLocaleDateString("pt-BR")}
      </h3>

      <p>
        {entrada.texto}
      </p>

    </article>
  );
}

export default Entrada;
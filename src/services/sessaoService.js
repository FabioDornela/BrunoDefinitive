const sessoes = new Map();

export function criarSessao(usuario) {
    const token =
        `${usuario.id}-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}`;

    sessoes.set(token, usuario);

    return token;
}

export function buscarSessao(token) {
    return sessoes.get(token);
}
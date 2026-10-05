// Módulo responsável pelas validações, normalização de dados e gestão em memória da coleção de alunos.

const alunos = [];

function normalizarTexto(texto) {
    return typeof texto === 'string' ? texto.trim() : '';
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

export function cadastrarAluno({ id, matricula, nome, email, curso, notas = [] }) {
    const matriculaNorm = normalizarTexto(matricula);
    const nomeNorm = normalizarTexto(nome);
    const emailNorm = normalizarTexto(email);
    const cursoNorm = normalizarTexto(curso);

    if (alunos.some(a => a.matricula === matriculaNorm)) {
        throw new Error(`Matricula '${matriculaNorm}' já cadastrada.`);
    }

    if (nomeNorm.length < 3) {
        throw new Error(`O nome do aluno deve ter no mínimo 3 caracteres.`)
    }

    if (!validarEmail(emailNorm)) {
        throw new Error(`Email '${emailNorm}' inválido.`);
    }

    if (!Array.isArray(notas) || notas.some(nota => typeof nota !== 'number' || nota < 0 || nota > 10)) {
    throw new Error(`As notas devem ser numeros de 0 a 10.`)
    }

    
    const novoALuno = {
        id: id || Date.now(),
        matricula: matriculaNorm,
        nome: nomeNorm,
        email: emailNorm,
        curso: cursoNorm,
        notas: [...notas]
    };

    alunos.push(novoAluno);
    return novoAluno;
}

export function calcularDesempenho(aluno, mediaMinima = 6) {
    if (!aluno || !aluno.notas || aluno.notas.length === 0) {
        return {
            ...aluno,
            media: 0,
            situacao: 'Sem notas'
        };
    }

    const soma = aluno.notas.reduce((acc, curr) => acc + curr, 0);
    const media = soma / aluno.notas.length;
    const situacao = media >= mediaMinima ? 'Aprovado' : 'Reprovado';

    return {
        ...aluno,
        media: Number(media.toFixed(2)),
        situacao
    };
}

export function buscarPorMtricula(matricula) {
    const matriculaNorm = normalizarTexto(matricula);
    return alunos.find(a => a.matricula === matriculaNorm) || null;
}

export function removerPorMatricula(matricula) {
    const matriculaNorm = normalizarTexto(matricula);
    const index = alunos.findIndex(a => a.matricula === matriculaNorm);
    if (index !== -1) {
        return alunos.splice(index, 1)[0];
    }
    return null;
}

    export function obterAlunos() {
        return alunos;
    }
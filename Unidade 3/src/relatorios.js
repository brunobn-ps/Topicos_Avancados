// Módulo responsável pelas funções de ordem superior, closures e geração de relatórios configuráveis.

import { calcularDesempenho } from './gestaoAlunos.js';

export function gerarRelatorio(alunos, filtrar, formatar, comparar = null) {
    if (!Array.isArray(alunos) || alunos.length === 0) {
        return "Nenhum registro encontrado.";
    }

    let resultado = alunos.filter(filtrar);
    if (resultado.length === 0) {
        return 'Nenhum registo atende aos critérios do relatório.';
    }

    if (typeof comparar === 'function') {
        resultado = [...resultado].sort(comparar);
    }

    return formatar(resultado);
}


export function criarFiltro({ mediaMinima = 6, curso = null, apenasAprovados = false}) {
    return function(aluno) {
        const desempenho = calcularDesempenho(aluno, mediaMinima);

        if (curso && aluno.curso.toLowerCase() !== curso.toLowerCase().trim()) {
            return false;
        }
        if (apenasAprovados && desempenho.situacao !== 'Aprovado') {
            return false;
        }

        if (apenasReprovados && desempenho.situacao !== 'Reprovado') {
            return false;
        };

        return true;
    };
}


export function relatorioAprovadosPorNome(alunos, mediaMinima = 6) {
  const filtro = criarFiltro({ mediaMinima, apenasAprovados: true });
  
  const formatador = (lista) => 
    lista.map(a => {
      const d = calcularDesempenho(a, mediaMinima);
      return `Nome: ${a.nome} | Curso: ${a.curso} | Média: ${d.media}`;
    }).join('\n');

  const comparador = (a, b) => a.nome.localeCompare(b.nome);

  return gerarRelatorio(alunos, filtro, formatador, comparador);
}


export function relatorioReprovadosPorMedia(alunos, mediaMinima = 6) {
  const filtro = criarFiltro({ mediaMinima, apenasReprovados: true });

  const formatador = (lista) => 
    lista.map(a => {
      const d = calcularDesempenho(a, mediaMinima);
      return `Nome: ${a.nome} | Curso: ${a.curso} | Média: ${d.media}`;
    }).join('\n');

  const comparador = (a, b) => {
    const mediaA = calcularDesempenho(a, mediaMinima).media;
    const mediaB = calcularDesempenho(b, mediaMinima).media;
    return mediaA - mediaB;
  };

  return gerarRelatorio(alunos, filtro, formatador, comparador);
}


export function relatorioCursoCSV(alunos, nomeCurso) {
  const filtro = criarFiltro({ curso: nomeCurso });

  const formatador = (lista) => {
    const cabecalho = 'ID,Matricula,Nome,Email,Curso,Media,Situacao';
    const linhas = lista.map(a => {
      const d = calcularDesempenho(a);
      return `${a.id},${a.matricula},"${a.nome}",${a.email},"${a.curso}",${d.media},${d.situacao}`;
    });
    return [cabecalho, ...linhas].join('\n');
  };

  return gerarRelatorio(alunos, filtro, formatador);
}


export function relatorioResumoPorCurso(alunos) {
  if (!Array.isArray(alunos) || alunos.length === 0) {
    return 'Nenhum registo para gerar o resumo.';
  }

  const resumo = alunos.reduce((acc, aluno) => {
    const curso = aluno.curso || 'Sem Curso';
    const d = calcularDesempenho(aluno);

    if (!acc[curso]) {
      acc[curso] = { totalAlunos: 0, somaMedias: 0 };
    }

    acc[curso].totalAlunos += 1;
    acc[curso].somaMedias += d.media;
    return acc;
  }, {});

  return Object.entries(resumo)
    .map(([curso, dados]) => {
      const mediaGeral = (dados.somaMedias / dados.totalAlunos).toFixed(2);
      return `Curso: ${curso} | Qtd Alunos: ${dados.totalAlunos} | Média Geral: ${mediaGeral}`;
    })
    .join('\n');
}
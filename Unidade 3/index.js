// Ponto de entrada do projeto para demonstrar todas as funcionalidades executadas via npm start

import {
  cadastrarAluno,
  obterAlunos,
  buscarPorMatricula,
  removerPorMatricula
} from './src/gestaoAlunos.js';

import {
  relatorioAprovadosPorNome,
  relatorioReprovadosPorMedia,
  relatorioCursoCSV,
  relatorioResumoPorCurso
} from './src/relatorios.js';

console.log('=== CADASTRO DE ALUNOS ===\n');

try {
  cadastrarAluno({ id: 1, matricula: '  202301 ', nome: 'Ana Silva ', email: 'ana@email.com ', curso: 'Engenharia', notas: [8.5, 9.0, 7.5] });
  cadastrarAluno({ id: 2, matricula: '202302', nome: 'Bruno Souza', email: 'bruno@email.com', curso: 'Engenharia', notas: [4.0, 5.5, 3.0] });
  cadastrarAluno({ id: 3, matricula: '202303', nome: 'Carlos Eduardo', email: 'carlos@email.com', curso: 'Ciência da Computação', notas: [7.0, 6.0, 8.0] });
  cadastrarAluno({ id: 4, matricula: '202304', nome: 'Diana Rocha', email: 'diana@email.com', curso: 'Engenharia', notas: [2.0, 4.0, 5.0] });
  cadastrarAluno({ id: 5, matricula: '202305', nome: 'Elena Costa', email: 'elena@email.com', curso: 'Ciência da Computação', notas: [] }); // Requisito 8: Aluno sem notas
} catch (erro) {
  console.error('Erro de cadastro:', erro.message);
}

// Testando validação de duplicados
try {
  cadastrarAluno({ id: 6, matricula: '202301', nome: 'Teste Duplicado', email: 'teste@email.com', curso: 'Engenharia', notas: [10] });
} catch (erro) {
  console.log(`[Sucesso no teste de erro]: ${erro.message}`);
}

console.log('\n=== RELATÓRIO 1: Aprovados por Nome ===');
console.log(relatorioAprovadosPorNome(obterAlunos(), 6));

console.log('\n=== RELATÓRIO 2: Reprovados da menor para a maior média ===');
console.log(relatorioReprovadosPorMedia(obterAlunos(), 6));

console.log('\n=== RELATÓRIO 3: Alunos do curso "Engenharia" em CSV ===');
console.log(relatorioCursoCSV(obterAlunos(), 'Engenharia'));

console.log('\n=== RELATÓRIO 4: Resumo por Curso ===');
console.log(relatorioResumoPorCurso(obterAlunos()));

console.log('\n=== TESTES DE BORDA E REMOÇÃO ===');
console.log('Busca por 202302:', buscarPorMatricula('202302')?.nome);
console.log('Removendo 202302:', removerPorMatricula('202302')?.nome);

console.log('\nRelatório de Curso Inexistente:');
console.log(relatorioCursoCSV(obterAlunos(), 'Design'));

console.log('\nRelatório com Coleção Vazia:');
console.log(relatorioAprovadosPorNome([]));
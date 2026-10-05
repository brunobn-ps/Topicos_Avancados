// Sistema de cadastro de cursos em memória usando arrays de objetos
const cursos = [];

function inserirCurso(cursos, codigo, nome, cargaHoraria, ativo) {
  cursos.push({
    codigo: String(codigo),
    nome: String(nome),
    cargaHoraria: Number(cargaHoraria),
    ativo: Boolean(ativo)
  });
}

function listarCursos(cursos) {
  console.log("--- Lista de Todos os Cursos ---");
  if (cursos.length === 0) {
    console.log("Nenhum curso cadastrado.");
    return;
  }
  
  cursos.map((curso) => {
    const status = curso.ativo ? "Ativo" : "Inativo";
    console.log(`Código: ${curso.codigo} | Nome: ${curso.nome} | Carga Horária: ${curso.cargaHoraria}h | Status: ${status}`);
  });
}

// Função para filtrar e retornar apenas os cursos ativos
function filtrarCursosAtivos(cursos) {
  return cursos.filter((curso) => curso.ativo === true);
}

function calcularMediaCargaHoraria(cursosAtivos) {
  if (cursosAtivos.length === 0) return 0;
  const somaCargaHoraria = cursosAtivos.reduce((soma, curso) => soma + curso.cargaHoraria, 0);
  return somaCargaHoraria / cursosAtivos.length;
}


inserirCurso(cursos, "JS101", "JavaScript Básico", 40, true);
inserirCurso(cursos, "PY201", "Python para Análise de Dados", 60, true);
inserirCurso(cursos, "HTML5", "HTML5 e CSS3", 30, false);
inserirCurso(cursos, "REACT", "React Native", 50, true);
inserirCurso(cursos, "JAVA", "Java Avançado", 80, false);

listarCursos(cursos);

const cursosAtivos = filtrarCursosAtivos(cursos);

console.log("\n--- Cursos Ativos ---");
cursosAtivos.map((curso) => {
  console.log(`Código: ${curso.codigo} | Nome: ${curso.nome} | Carga Horária: ${curso.cargaHoraria}h`);
});

const mediaCargaHoraria = calcularMediaCargaHoraria(cursosAtivos);


console.log("\n================ RELATÓRIO FINAL ================");
console.log(`Total de cursos cadastrados: ${cursos.length}`);
console.log(`Total de cursos ativos: ${cursosAtivos.length}`);
console.log(`Média da carga horária dos cursos ativos: ${mediaCargaHoraria.toFixed(2)}h`);
console.log("=================================================");
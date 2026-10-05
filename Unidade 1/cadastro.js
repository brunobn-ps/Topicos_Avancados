// Cadastro e análise de alunos usando JavaScript

function calcularMedia(notas) {
    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
        soma += notas[i];
    }
    return soma / notas.length;
}

function classificarSituacao(media, frequencia) {
    if (media >= 70 && frequencia >= 75) {
        return "Aprovado";
        } else if (media >= 40 && media < 70 && frequencia >= 75) {
            return "Recuperação";
        } else {
            return "Reprovado";
    }
}

function executarPrograma() {
    const quantidadeAlunosInput = prompt("Quantos alunos serão cadastrados?");
    const quantidadeAlunos = Number(quantidadeAlunosInput);

    const alunos = [];
    let aprovados = 0;
    let recuperacao = 0;
    let reprovados = 0;

    for (let i = 0; i < quantidadeAlunos; i++) {
        console.log(`\n--- Cadastro do aluno ${i + 1} ---`);

        const nome = prompt(`Nome do Aluno ${i + 1}: `);
        const matricula = prompt(`Matrícula do Aluno ${i + 1}: `);

        const nota1 = Number(prompt(`Digite a 1ª nota de ${nome}: `));
        const nota2 = Number(prompt(`Digite a 2ª nota de ${nome}: `));
        const nota3 = Number(prompt(`Digite a 3ª nota de ${nome}: `));
        const frequencia = Number(prompt(`Digite a frequência (%) de ${nome}: `));

        const notas = [nota1, nota2, nota3];
        const media = calcularMedia(notas);
        const situacao = classificarSituacao(media, frequencia);

        if (situacao === "Aprovado") {
            aprovados++;
        } else if (situacao === "Recuperação") {
            recuperacao++;
        } else {
            reprovados++;
        }


        alunos.push({
            nome: nome,
            matricula: matricula,
            media: media.toFixed(2),
            situacao: situacao
        });
    }


    console.log("\n--------- RESULTADOS ---------");
    console.log("Lista de Alunos: ");

    alunos.forEach((aluno) => {
        console.log(
            `Nome: ${aluno.nome}  |  Matrícula: ${aluno.matricula}  |  Média ${aluno.media}  |  Situacao: ${aluno.situacao}`
        );
    });

    console.log("--------------------------------------------");
    console.log("Resumo Total:");
    console.log(`Total de Aprovados: ${aprovados}`);
    console.log(`Total em Recuperação: ${recuperacao}`);
    console.log(`Total de Reprovados: ${reprovados}`);
}

executarPrograma();
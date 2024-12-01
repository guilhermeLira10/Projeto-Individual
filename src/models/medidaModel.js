var database = require("../database/config");

function qtdUsuarios() {

    var instrucaoSql = `
        SELECT count(*) as qtdUsuarios from usuario;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function qtdQuiz() {

    var instrucaoSql = `
        SELECT count(*) as qtdQuiz from score;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function maiorPublicador() {

    var instrucaoSql = `
        SELECT u.nome, count(*) as qtdPublicacao 
        FROM publicacao as p
        JOIN usuario as u
        ON u.idUsuario = p.fkUsuario
        group by fkUsuario
        order by qtdPublicacao desc
        ;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function qtdPostagem() {

    var instrucaoSql = `
        SELECT count(*) as qtdPostagem from publicacao;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function qtdCurtida() {

    var instrucaoSql = `
        SELECT count(*) as qtdCurtida from curtida;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFrequenciaPublicacoes() {

    var instrucaoSql = ` 
        SELECT DATE_FORMAT(dtPublicacao, '%d-%m') AS dia ,count(*) AS quantidade
        FROM publicacao
        WHERE dtPublicacao >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
        GROUP BY dia
        order by dia asc;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFrequenciaCurtida() {

    var instrucaoSql = ` 
        SELECT DATE_FORMAT(dtCurtida, '%d-%m') AS dia ,count(*) AS quantidade
        FROM curtida
        WHERE dtCurtida >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
        GROUP BY dia
        order by dia desc;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarScore() {

    var instrucaoSql = ` 
        SELECT 
            SUM(CASE WHEN pontos = 10 THEN 1 ELSE 0 END) AS 'maiorQDez',
            SUM(CASE WHEN pontos < 5 THEN 1 ELSE 0 END) AS 'menorQCinco',
            SUM(CASE WHEN pontos > 5 AND pontos < 10 THEN 1 ELSE 0 END) AS 'entreCincoDez'
        FROM score;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasEmTempoReal,
    buscarFrequenciaPublicacoes,
    buscarScore,
    qtdUsuarios,
    qtdQuiz,
    qtdPostagem,
    qtdCurtida,
    buscarFrequenciaCurtida,
    maiorPublicador
}
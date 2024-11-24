var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM medida
                    WHERE fk_aquario = ${idAquario}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFrequenciaPublicacoes() {

    var instrucaoSql = ` 
        SELECT DATE_FORMAT(dtPublicacao, '%d-%m') AS dia ,count(*) AS quantidade
        FROM publicacao
        WHERE dtPublicacao >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
        GROUP BY dia;
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
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarFrequenciaPublicacoes,
    buscarScore
}
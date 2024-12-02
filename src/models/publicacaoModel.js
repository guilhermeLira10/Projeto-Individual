const database = require("../database/config");


function listar(idUsuario) {
  console.log("ACESSEI O publicacao  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `


    SELECT p.idPublicacao, p.imgPublicada AS nome, DATE_FORMAT(p.dtPublicacao, '%d-%m-%Y') AS 'data', p.fkUsuario as 'userPost', u.nome as nomeUsuario, u.nickName,u.email,
    IF(c.fkUsuario IS NOT NULL, 1, 0) AS ja_curtiu
    FROM publicacao as p
    left JOIN curtida as c
    ON p.idPublicacao = c.fkPublicacao AND c.fkUsuario = ${idUsuario}
    JOIN usuario AS u
    ON p.fkUsuario = u.idUsuario
    ORDER BY rand()
;

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
  console.log("ACESSEI O Publicação  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
    SELECT idPublicacao, imgPublicada AS nome, dtPublicacao AS 'data' FROM publicacao where fkUsuario = ${idUsuario};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletar(idPublicacao) {
  console.log("ACESSEI O Publicação  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
    DELETE FROM publicacao WHERE idPublicacao = ${idPublicacao};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function salvar(imagem,idUsuario) {
  const instrucao = `INSERT INTO publicacao (imgPublicada, fkUsuario)
      VALUES ('${imagem}', ${idUsuario});

  `;
  console.log(instrucao + "INSTRUÇÃO PARA SALVAR IMAGEM")
  return database.executar(instrucao);
}

function buscarpublicacaoPeloId(id) {
  const instrucao = `select * from publicacao where id = ${id}`;

  return database.executar(instrucao);
}

module.exports = { salvar, buscarpublicacaoPeloId, listar,listarPorUsuario, deletar }
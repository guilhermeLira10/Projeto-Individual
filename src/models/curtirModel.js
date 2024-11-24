const database = require("../database/config");

function salvar(idPubli, idUsuario) {
  console.log('ESTOU NO SALVAR A CURTIDA')
  const instrucao = 
    `      INSERT INTO curtida (fkPublicacao, fkUsuario) VALUES
      (${idPubli}, ${idUsuario});
    `
  console.log(`INSTRUÇÃO SQL ${instrucao}`)
  ;

  return database.executar(instrucao);
}

function deletar(idUsuario, idPublicacao) {
  console.log("ACESSEI O Publicação  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarCurtida()");
  var instrucaoSql = `
    DELETE FROM curtida WHERE fkUsuario = ${idUsuario} AND fkPublicacao = ${idPublicacao} ;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletarAll(idPublicacao) {
  console.log("ACESSEI O Publicação  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarAll()");
  var instrucaoSql = `
    DELETE FROM curtida WHERE fkPublicacao = ${idPublicacao} ;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = { salvar, deletar, deletarAll }

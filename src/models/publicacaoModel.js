const database = require("../database/config");

function salvar(imagem) {
  const instrucao = `INSERT INTO publicacao (imgPublicada, descricao, dtPublicacao, titulo, fkUsuario)
      VALUES ('${imagem}', 'Primeira publicação de Guilherme', '2024-01-01', 'Bem-vindo ao site!', 1);

  
  `;

  return database.executar(instrucao);
}

function buscarpublicacaoPeloId(id) {
  const instrucao = `select * from publicacao where id = ${id}`;

  return database.executar(instrucao);
}

module.exports = { salvar, buscarpublicacaoPeloId }
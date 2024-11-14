const publicacaoModel = require('../models/publicacaoModel');


function salvar(req, res) {
  const imagem = req.file.filename;

  var idUsuario = req.params.idUsuario;
  var descricao = req.body.descricao;
  var titulo = req.body.titulo;

  const publicacao = { imagem }
  // console.log(publicacao.imagem)
  publicacaoModel.salvar(imagem)
  .then(function(resultado){
    console.log(resultado)
    res.status(201).send("publicacao criado com sucesso");
  }).catch(err => {
    res.status(500).send(err);
  });
}

function buscarpublicacaoPeloId(req, res) {
  console.log(req.params.id);
  
  publicacaoModel.buscarpublicacaoPeloId(req.params.id)
  .then(resultado => {
    res.json(resultado);
  }).catch(err => {
    res.status(500).send(err);
  });
}

module.exports = { salvar, buscarpublicacaoPeloId }
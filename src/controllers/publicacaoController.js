const publicacaoModel = require('../models/publicacaoModel');
const curtirModel = require('../models/curtirModel');

function listar(req, res) {
  var idUsuario = req.params.idUsuario;
  console.log('estou no listar publicacao')
  publicacaoModel.listar(idUsuario)
  .then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os scores: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function listarPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;
  publicacaoModel.listarPorUsuario(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o usuario: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function deletar(req, res) {
  var idUsuario = req.params.idUsuario;
  var idPubliServer = req.body.idPubliServer;

  console.log('Estou no deletar publicacao')
  console.log(`Usuario: ${idUsuario} \n idPublicacao: ${idPubliServer}`)

  curtirModel.deletarAll(idPubliServer)
  .then(function(resultadoCurtir){
    if( resultadoCurtir.affectedRows >= 0){
      
      publicacaoModel.deletar(idPubliServer)
      .then(function (resultado) {
        if ( resultado.affectedRows >= 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
      })

    }else{
      res.status(204).send("Nenhum resultado encontrado!")
    }

  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar a publicacao: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function salvar(req, res) {
  const imagem = req.file.filename;
  
  var idUsuario = req.params.idUsuario;

  const publicacao = { imagem }
  // console.log(publicacao.imagem)
  publicacaoModel.salvar(imagem,idUsuario)
  .then(function(resultado){
    // console.log(resultado)
    res.status(201).send("publicacao criado com sucesso");
  }).catch(err => {
    res.status(500).send(err);
  });
}

function buscarpublicacaoPeloId(req, res) {
  // console.log(req.params.id);
  
  publicacaoModel.buscarpublicacaoPeloId(req.params.id)
  .then(resultado => {
    res.json(resultado);
  }).catch(err => {
    res.status(500).send(err);
  });
}

module.exports = { salvar, buscarpublicacaoPeloId,listar,listarPorUsuario, deletar}
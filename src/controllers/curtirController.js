const curtirModel = require('../models/curtirModel');

function salvar(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPubli = req.body.idPubliServer;


    console.log(`Publicação: ${idPubli} | Usuario: ${idUsuario}`)
    // console.log(publicacao.imagem)
    curtirModel.salvar(idPubli, idUsuario)
        .then(function (resultado) {
            // console.log(resultado)
            res.status(201).send("publicacao criado com sucesso");
        }).catch(err => {
            res.status(500).send(err);
        });
}

function deletar(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPublicacao = req.body.idPubliServer;

    curtirModel.deletar(idUsuario, idPublicacao)
    .then(function (resultado) {
        console.log(resultado)
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado em Curtida!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao deletar a curtida: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarAll(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPublicacao = req.body.idPubliServer;

    curtirModel.deletar(idUsuario, idPublicacao)
    .then(function (resultado) {
        console.log(resultado)
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado em Curtida!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao deletar a curtida: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    salvar,
    deletar,
    deletarAll

}
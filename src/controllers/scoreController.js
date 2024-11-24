var scoreModel = require("../models/scoreModel");

function listar(req, res) {
    scoreModel.listar().then(function (resultado) {
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

    scoreModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os scores: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    scoreModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os scores: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function inserirPontuacao(req, res) {
    var idUsuario = req.params.idUsuario;
    var pontos = req.body.qtdPontos;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (pontos == undefined) {
        res.status(400).send("pontos está undefined!");
    } else {
        scoreModel.inserirPontuacao(pontos, idUsuario)
        .then((resultado) => {
            res.status(201).json(resultado);
        }).catch((erro) => {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro dos pontos! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function editar(req, res) {
    var novaDescricao = req.body.descricao;
    var idscore = req.params.idscore;

    scoreModel.editar(novaDescricao, idscore)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idscore = req.params.idscore;

    scoreModel.deletar(idscore)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    inserirPontuacao,
    editar,
    deletar
}
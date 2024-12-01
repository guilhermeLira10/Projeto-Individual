var medidaModel = require("../models/medidaModel");

function maiorPublicador(req, res) {
    console.log(`Buscando os maiores publicadores`);

    medidaModel.maiorPublicador()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFrequenciaPublicacoes(req, res) {
    console.log(`Buscando as frequencias de publicacao`);

    medidaModel.buscarFrequenciaPublicacoes()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as frequencias de publicacao.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFrequenciaCurtida(req, res) {
    console.log(`Buscando as frequencias de curtida`);

    medidaModel.buscarFrequenciaCurtida()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar frequencias de curtida", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function qtdUsuarios(req, res) {
    console.log(`Buscando a quantidade de usuarios`);

    medidaModel.qtdUsuarios()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade usuario.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function qtdCurtida(req, res) {
    console.log(`Buscando a quantidade de usuarios`);

    medidaModel.qtdCurtida()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as quantidade de curtida.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function qtdQuiz(req, res) {
    console.log(`Buscando a quantidade de usuarios`);

    medidaModel.qtdQuiz()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function qtdPostagem(req, res) {
    console.log(`Buscando a quantidade de usuarios`);

    medidaModel.qtdPostagem()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarScore(req, res) {
    console.log(`Buscando os score de do quizz`);

    medidaModel.buscarScore()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
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
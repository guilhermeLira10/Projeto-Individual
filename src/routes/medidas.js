var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/frequenciaPublicacao", function (req, res) {
    medidaController.buscarFrequenciaPublicacoes(req, res);
});

router.get("/frequenciaCurtida", function (req, res) {
    medidaController.buscarFrequenciaCurtida(req, res);
});

router.get("/score", function (req, res) {
    medidaController.buscarScore(req, res);
});

// router.get("/ultimas/:idAquario", function (req, res) {
//     medidaController.buscarUltimasMedidas(req, res);
// });

// router.get("/tempo-real/:idAquario", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })

router.get("/qtdUsuarios/", function (req, res) {
    medidaController.qtdUsuarios(req, res);
})

router.get("/qtdQuiz/", function (req, res) {
    medidaController.qtdQuiz(req, res);
})

router.get("/qtdPostagem/", function (req, res) {
    medidaController.qtdPostagem(req, res);
})

router.get("/qtdCurtida/", function (req, res) {
    medidaController.qtdCurtida(req, res);
})

router.get("/maiorPublicador/", function (req, res) {
    medidaController.maiorPublicador(req, res);
})

module.exports = router;
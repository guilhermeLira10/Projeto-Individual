var express = require("express");
var router = express.Router();

var scoreController = require("../controllers/scoreController");

router.get("/listar", function (req, res) {
    scoreController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    scoreController.listarPorUsuario(req, res);
});

router.post("/inserirPontuacao/:idUsuario", function (req, res) {
    scoreController.inserirPontuacao(req, res);
});

router.delete("/deletar/:idScore", function (req, res) {
    scoreController.deletar(req, res);
});

module.exports = router;
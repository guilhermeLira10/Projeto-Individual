var express = require("express");
var router = express.Router();

var curtirController = require("../controllers/curtirController");

//Recebendo os dados do html e direcionando para a função cadastrar de curtirController.js
router.post("/salvar/:idUsuario", function (req, res) {
    curtirController.salvar(req, res);
})

router.delete("/deletar/:idUsuario", function (req, res) {
    curtirController.deletar(req, res);
});

router.delete("/deletar/:idPublicacao", function (req, res) {
    curtirController.deletarAll(req, res);
});

module.exports = router;
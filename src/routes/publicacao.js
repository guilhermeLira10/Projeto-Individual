const express = require('express');
const router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const publicacao = require('../controllers/publicacaoController');

router.get("/listarAll/:idUsuario", function(req, res) {
  publicacao.listar(req,res);
});

router.get("/listar/:idUsuario", function (req, res) {
  publicacao.listarPorUsuario(req, res);
});


router.delete("/deletar/:idUsuario", function (req, res) {
  publicacao.deletar(req, res);
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastro/:idUsuario', upload.single('foto'), (req, res) => {
  publicacao.salvar(req, res);
});

router.get('/:id', upload.single('foto'), (req, res) => {
  publicacao.buscarUsuarioPeloId(req, res);
});

module.exports = router;


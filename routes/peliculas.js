var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const peliculasController = require('../controllers/peliculasController.js');


router.get('/', peliculasController.show);
router.get('/detalle/:id', peliculasController.detalle);
router.get('/crear', peliculasController.list_crear);

router.post('/crear', peliculasController.crear);
router.get('/eliminar/:id', peliculasController.eliminar);
router.post('/editar', peliculasController.editar);

module.exports = router;
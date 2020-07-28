var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const generosController = require('../controllers/generosController.js');


router.get('/', generosController.show);
router.get('/detalle/:id', generosController.detalle);

/*router.post('/crear', peliculasController.crear);
router.get('/eliminar/:id', peliculasController.eliminar);
router.post('/editar', peliculasController.editar);*/

module.exports = router;
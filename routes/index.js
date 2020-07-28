var express = require('express');
var router = express.Router();
const peliculasController = require('../controllers/peliculasController.js');

/* GET home page. */
router.get('/', peliculasController.show);

module.exports = router;

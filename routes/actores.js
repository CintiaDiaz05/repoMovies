var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const actoresController = require('../controllers/actoresController.js');


router.get('/', actoresController.show);

module.exports = router;
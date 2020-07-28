const db = require('../database/models');
const { sequelize } = require('../database/models');

const generosController = {
	
	show: (req, res, next) => {
      
        console.log("--------------------SHOW------------------>");
        db.Genero.findAll({
           include: [{ association: "peliculas" }],
            order: [['ranking', 'DESC']]
            })
            .then(function (generos) {
               // console.log(peliculas);
               console.log(generos);
               console.log(generos.length);
				res.render('generos', {generos:generos});
			})
			.catch(function (error) {
				console.log(error);
			})
    },
    detalle: (req, res, next) => {
        console.log("--------------------DETALLE------------------>");
        //db.Genero.findAll()
        db.Genero.findByPk(Number(req.params.id),{
            	include: [{ association: "peliculas" }]
			})
		    .then(function (genero) {
                console.log("-----------------GENERO------------------->");
                console.log(genero.peliculas.length);
                console.log(genero);
				res.render('./generos/detalle', {genero:genero})
			})
			.catch(function (error) {
				console.log(error);
			})
    }
}

module.exports = generosController;



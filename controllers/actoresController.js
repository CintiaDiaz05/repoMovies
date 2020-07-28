const db = require('../database/models');

const actoresController = {
	
	show: (req, res, next) => {
      
        //db.Genero.findAll()
        db.Actor.findAll({
				//where: { id:13},
				order: [['id', 'ASC']],
				//limit: 4,
            	include: [{ association: "peliculas" }]
			})
		    .then(function (actores) {
				console.log(actores);
				//console.log(actores[1].peliculas[1].title);
				console.log(actores[7].peliculas.length);
				console.log(actores[0].peliculas[0].title);
				res.render('actores', {actores:actores})
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

module.exports = actoresController;



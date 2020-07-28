const db = require('../database/models');
const { sequelize } = require('../database/models');

const peliculasController = {
	
	show: (req, res, next) => {
      
        console.log("--------------------SHOW------------------>");
        db.Pelicula.findAll({
        //    db.Pelicula.findByPk(1,{
            //	include: [{ association: "genero" }, { association: "actores" }]
            include: [{ association: "genero" }],
            order: [['rating', 'DESC']]
            })
           // sequelize.query("SELECT `Pelicula`.`id`, `Pelicula`.`title`, `Pelicula`.`awards`, `Pelicula`.`rating`, `Pelicula`.`genre_id`, `Pelicula`.`release_date`, `Pelicula`.`length`, `Pelicula`.`created_at`, `genero`.`id` AS `genero.id`, `genero`.`name` AS `genero.name`, `genero`.`active` AS `genero.active`, `genero`.`ranking` AS `genero.ranking`, `genero`.`created_at` AS `genero.created_at`, `actores`.`id` AS `actores.id`, `actores`.`first_name` AS `actores.first_name`, `actores`.`last_name` AS `actores.last_name`, `actores`.`rating` AS `actores.rating`, `actores`.`created_at` AS `actores.created_at`, `actores->actor_movie`.`created_At` AS `actores.actor_movie.created_At`, `actores->actor_movie`.`updated_At` AS `actores.actor_movie.updated_At`, `actores->actor_movie`.`actor_id` AS `actores.actor_movie.actor_id`, `actores->actor_movie`.`movie_id` AS `actores.actor_movie.movie_id` FROM `movies` AS `Pelicula` LEFT OUTER JOIN `genres` AS `genero` ON `Pelicula`.`genre_id` = `genero`.`id` LEFT OUTER JOIN ( `actor_movie` AS `actores->actor_movie` INNER JOIN `actors` AS `actores` ON `actores`.`id` = `actores->actor_movie`.`actor_id`) ON `Pelicula`.`id` = `actores->actor_movie`.`movie_id` WHERE `Pelicula`.`id` = 1")
		    .then(function (peliculas) {
               // console.log(peliculas);
              //  console.log(peliculas);
              // console.log(peliculas.length);
                let listado=peliculas[0];
				res.render('./', {peliculas:peliculas});
			})
			.catch(function (error) {
				console.log(error);
			})
    },
    detalle: (req, res, next) => {
            console.log("--------------------DETALLE------------------>");
            //db.Genero.findAll()
            db.Pelicula.findByPk(Number(req.params.id),{
            	include: [{ association: "actores" },{ association: "genero" }]
            })
            //let actores = db.Actor.findAll()
            
            //Promise.all([peli, actores])
               // .then(([peli, actores]) => {
                .then(function (peli) {
                    db.Actor.findAll()
                    .then(function (actores) {
                    res.render('./peliculas/detalle', {pelicula:peli, actors:actores});
                    })
                })

		  
			.catch(function (error) {
				console.log(error);
			})
    },
    crear: (req, res, next) => {
        console.log("--------------------CREAR------------------>");
        db.Pelicula.create({
            title: req.body.titulo,
            rating: req.body.rating,
            awards: req.body.premios,
            release_date: req.body.fecha,
            length: req.body.duracion,
            genre_id: Number(req.body.genero)
        })
		    .then(function (peliculon) {
                console.log("--------------------ID PELI------------------>");
                console.log(req.body.actor);
                console.log(req.body.titulo);
                console.log(peliculon.id);
                //console.log(pelicula[0].id);
                //console.log(pelicula[0].id);
                console.log("--------------------ID PELI------------------>");
                console.log(peliculon);
                //let id=pelicula[0].id;
              
                db.Actor_movie.create({
                    actor_id: Number(req.body.actor),
                    movie_id: peliculon.id
                })

                .then((items) => {
                    console.log("--------------------CREO TODO------------------>");
                    res.redirect('/');
                })
			})
			.catch(function (error) {
				console.log(error);
			})
    },
    eliminarActorDetalle: (req, res, next) => {
        console.log("--------------------ELIMINAR------------------>");
        let idActor = Number(req.params.id);
        let idPelicula =Number(req.params.peli);
        db.Actor_movie.destroy({
            where: {
                movie_id: idPelicula,
                actor_id: idActor
            }
        })
        
            .then((items) => {
               // res.render('./peliculas/detalle', {pelicula:pelicula})
               res.redirect('/');
            })
            .catch(function (error) {
				console.log(error);
			})
        
             

    },
    eliminar:(req, res, next) => {
        console.log("--------------------ELIMINAR------------------>");
        let idPelicula = Number(req.params.peli)
        let idActor = Number(req.params.id)
        db.Actor_movie.destroy({
            where: {
                movie_id: idPelicula
            }
        })
        .then((peli) => {
            console.log("--------------------ELIMINAR 2------------------>");
            db.Pelicula.destroy({
                where: {
                    id: idPelicula
                }
            })
            .then((items) => {
                console.log("--------------------ELIMINAR 3------------------>");
                res.redirect('/');
            })
            .catch(function (error) {
				console.log(error);
			})
        })
             

    },
    editar: (req, res, next) => {
        console.log("--------------------EDITAR------------------>");
        let idPelicula =Number(req.body.idPeli); //no trae el id no se xq
        console.log(req.body.idPeli);
        console.log(req.body.actor);
        db.Pelicula.update(
            {
                title: req.body.titulo,
                rating: req.body.rating,
                awards: req.body.premios,
                release_date: req.body.fecha,
                length: req.body.duracion,
                genre_id: req.body.genero
            }, {
            where: {
                id: idPelicula
            }
        })
            .then((peliculon) => {
                db.Actor_movie.create({
                    actor_id: Number(req.body.actor),
                    movie_id: peliculon.id
                })
                    res.redirect('/');
                })


    },
    
    list_crear: (req, res, next) => {
        console.log("--------------------LIST EDITAR------------------>");
        let generos = db.Genero.findAll()
		let actores = db.Actor.findAll()
		
        Promise.all([generos, actores])
			.then(([generos, actores]) => {
                console.log(generos[0]);
                console.log(actores[0]);
				res.render("./peliculas/crear", {genero:generos, actor:actores})
			})
			.catch((error) => {
				console.log(error);
			})
    }
}

module.exports = peliculasController;



module.exports = function(sequelize, dataTypes){
    let alias = "Pelicula";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type:dataTypes.STRING,
            allowNull: false
        },
        awards:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        rating:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        genre_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        release_date:{
            type:dataTypes.DATE,
            allowNull: true
        },
        length:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: "movies",
        timestamps: false
    }

    let Pelicula = sequelize.define(alias, cols, config);
        
    Pelicula.associate = function (models){
        Pelicula.belongsTo(models.Genero,{
            as: "genero",
            foreignKey: "genre_id"
        });

        Pelicula.belongsToMany(models.Actor,{
            as: "actores",
            through:"actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: "false"
        })
    }

    return Pelicula;
}
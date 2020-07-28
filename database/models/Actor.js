module.exports = function(sequelize, dataTypes){
    let alias = "Actor";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name:{
            type:dataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type:dataTypes.STRING,
            allowNull: false
        },
        rating:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: "actors",
        timestamps: false
    }

    let Actor = sequelize.define(alias, cols, config);
        
    Actor.associate = function (models){
        Actor.belongsToMany(models.Pelicula,{
            as: "peliculas",
            through:"actor_movie",
            foreignKey: "actor_id",
            otherKey:"movie_id",
            timestamps: false
        })
    }

    return Actor;
}
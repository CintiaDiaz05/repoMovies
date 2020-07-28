module.exports = function(sequelize, dataTypes){
    let alias = "Actor_movie";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
         actor_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        movie_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "actor_movie",
        timestamps: false
    }

    let Actor_movie = sequelize.define(alias, cols, config);
        
   
    return Actor_movie;
}
module.exports = function(sequelize, dataTypes){
    let alias = "Genero";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type:dataTypes.STRING,
            allowNull: false
        },
        active:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        ranking:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: "genres",
        timestamps: false
    }

    let Genero = sequelize.define(alias, cols, config);
        
    Genero.associate = function (models){
        Genero.hasMany(models.Pelicula,{
            as: "peliculas",
            foreignKey: "genre_id"
        })
    }

    return Genero;
}
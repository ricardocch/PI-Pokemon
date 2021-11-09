const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER
    },
    weight:{
      type: DataTypes.INTEGER
    },
    hp:{
      type:DataTypes.INTEGER
    },
    attack:{
      type:DataTypes.INTEGER
    },
    defense:{
      type:DataTypes.INTEGER
    },
    speed:{
      type:DataTypes.INTEGER
    }

  });
};

const { DataTypes  } = require('sequelize');
const sequelize = require("../db");

const FoodModel = sequelize.define('Food', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    veg: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      } 
  }, {
    timestamps: true
  });

  FoodModel.sync({
    alter: true
  });

  module.exports = FoodModel;
 
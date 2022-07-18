const { DataTypes  } = require('sequelize');
const sequelize = require("../db");

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: true
  });

  UserModel.sync({
    alter: true
  });

  module.exports = UserModel;
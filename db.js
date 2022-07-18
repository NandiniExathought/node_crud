const { Sequelize  } = require('sequelize');

const sequelize = new Sequelize('crud_app', 'root', 'pwd', {
    host: '192.168.227.68',
    dialect: 'mysql',
    port: 3307
  });


module.exports = sequelize;
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
 'day2',
 'root',
 'pass4558',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection establish.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


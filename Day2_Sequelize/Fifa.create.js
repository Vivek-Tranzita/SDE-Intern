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



const FIFA = sequelize.define("FIFA", {
   player: {
     type: DataTypes.STRING,
     allowNull: false
   },
   Skill: {
     type: DataTypes.STRING,
     allowNull: false
   },
   Rating: {
     type: DataTypes.INTEGER,
   }
});

sequelize.sync().then(() => {
   console.log('FIFA table created successfully');

   FIFA.create({
        player: "Ronaldo",
        Skill: "Rainbow flick",
        Rating: 96,
    }).then(res => {
       console.log(res)
   }).catch((error) => {
       console.error('Failed to create new players record: ', error);
   });

}).catch((error) => {
   console.error('Unable to create table : ', error);
});

sequelize.sync().then(() => {
    FIFA.findAll().then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});
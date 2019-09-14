const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./library.db"
  // logging: false
});

sequelize.authenticate().then(() => console.log("Connection is successful"));

const db = {
  sequelize,
  Sequelize,
  models: {}
};

db.models.Books = require("./model/books")(sequelize);

module.exports = db;

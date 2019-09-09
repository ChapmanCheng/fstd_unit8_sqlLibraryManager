const Sequelize = require("sequelize")
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./library.db"
})

sequelize
    .authenticate()
    .then(() => console.log("Connection is successful"))
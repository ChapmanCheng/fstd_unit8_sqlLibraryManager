const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Book extends Sequelize.Model {}

  Book.init(
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      genre: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      }
    },
    { sequelize } // options
  );
};

const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Books extends Sequelize.Model {}

  Books.init(
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
  return Books;
};

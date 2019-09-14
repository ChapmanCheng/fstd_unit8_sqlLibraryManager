const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Books extends Sequelize.Model {}

  Books.init(
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg:
              "You are missing the title, I can't create this entry into the database like that?!"
          },
          notEmpty: { msg: "Why are you giving me an empty Title?" }
        }
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "If there's a book, there must be an author, type it in"
          },
          notEmpty: { msg: "Why are you giving me an empty author?" }
        }
      },
      genre: Sequelize.STRING,
      year: Sequelize.INTEGER
    },
    { sequelize }
  );
  return Books;
};

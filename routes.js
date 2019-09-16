const express = require("express");

const router = express.Router();

// import database
const db = require("./db");

const { Op } = db.Sequelize;
const { Books } = db.models;

// Routes

router.get("/", async (req, res) => {
  // if user search for book and return a "q" query
  const { q } = req.query;
  if (q) {
    const books = await Books.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { author: { [Op.like]: `%${q}%` } },
          { genre: { [Op.like]: `%${q}%` } },
          { year: { [Op.like]: `%${q}%` } }
        ]
      },
      order: [["id", "DESC"]]
    });
    return res.render("all_books", { books });
  }

  // for pagination
  const page = req.query.p - 1 || 0;
  const limit = 10;
  const { rows, count } = await Books.findAndCountAll({
    limit,
    offset: page * limit
  });
  const pages = Math.ceil(count / limit);
  return res.render("all_books", { books: rows, pages });
});

router
  .route("/new")
  .get((req, res) => res.render("new_book", { messages: null }))
  .post((req, res) => {
    Books.create(req.body)
      .then(() => res.redirect("/"))
      .catch(err => {
        if (err.name === "SequelizeValidationError") {
          const errorMessages = err.errors.map(e => e.message);
          res.render("new_book", { messages: errorMessages });
        }
      });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const { id } = req.params;
    Books.findByPk(id).then(book => {
      console.log(book);
      if (book) {
        res.render("book_detail", { book });
      } else {
        const err = new Error();
        err.status = 404;
        next(err);
      }
    });
  })
  .post((req, res) => {
    const { id } = req.params;
    Books.findByPk(id)
      .then(book => book.update(req.body))
      .then(() => res.redirect("/"))
      .catch(async err => {
        if (err.name === "SequelizeValidationError") {
          const messages = err.errors.map(e => e.message);
          const book = await Books.findByPk(id);
          res.render("book_detail", { book, messages });
        }
      });
  });

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Books.destroy({ where: { id } }).then(() => res.redirect("/"));
});

module.exports = router;

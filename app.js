// ================================
// *          IMPORTS
// ================================

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
// const sequelizeValidationError = require("./functions/sequelizeValidationError");
const db = require("./db");

const { Op } = db.Sequelize;
const { Books } = db.models;

// ================================
// *          ROUTER
// ================================

const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use("/public", express.static("public"));

// middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// ! Deprecated - only sync with new table
// // sync with database
// app.use((req, res, next) => {
//   Books.sync()
//     .then(() => console.log("database synced"))
//     .catch(err => {
//       next(err);
//     });
//   next();
// });

// ROUTES

app.get("/", (req, res) => res.redirect("/books"));
app.get("/books", async (req, res) => {
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
  res.render("all_books", { books: rows, pages });
});

app
  .route("/books/new")
  .get((req, res) => res.render("new_book", { messages: null }))
  .post((req, res) => {
    const { title, author, genre, year } = req.body;
    Books.create({ title, author, genre, year })
      .then(() => console.log(`new book "${title}" logged to database`))
      .then(() => res.redirect("/"))
      .catch(err => {
        if (err.name === "SequelizeValidationError") {
          const errorMessages = err.errors.map(e => e.message);
          res.render("new_book", { messages: errorMessages });
        }
      });
  });

app
  .route("/books/:id")
  .get((req, res) => {
    const { id } = req.params;
    Books.findByPk(id).then(book => res.render("book_detail", { book }));
  })
  .post((req, res) => {
    const { id } = req.params;
    const { title, author, genre, year } = req.body;
    Books.findByPk(id)
      .then(book => book.update({ title, author, genre, year }))
      .then(() => res.redirect("/"))
      .catch(async err => {
        if (err.name === "SequelizeValidationError") {
          const messages = err.errors.map(e => e.message);
          const book = await Books.findByPk(id);
          res.render("book_detail", { book, messages });
        }
      });
  });

app.post("/books/:id/delete", (req, res) => {
  const { id } = req.params;
  Books.destroy({ where: { id } }).then(() => res.redirect("/"));
});

app.use((req, res, next) => {
  const err = new Error("Look elsewhere, there's nothing here...");
  err.status = 404;
  next(err);
});

// ================================
// *          ERROR HANDLER
// ================================

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const { statusCode } = res;

  switch (statusCode) {
    case 404:
      res.render("page_not_found", { statusCode });
      break;
    case 500:
      res.render("error");
      break;
    default:
      res.send(err);
  }
  next();
});

app.listen(port, () => console.log(`App is listening on port ${port}`));

/**
 * * == NOTES == *
 * instructions for this project
 * https://teamtreehouse.com/projects/sql-library-manager
 */

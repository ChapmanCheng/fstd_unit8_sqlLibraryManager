// ================================
// *          IMPORTS
// ================================

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

// ================================
// *          SEQUELIZE
// ================================

const { Books } = db.models;
Books.sync()
  .then()
  .catch(err => console.error(`There is an error: ${err}`)); // ? should I seperate this into its own module

// ================================
// *          ROUTER
// ================================

const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use("/public", express.static("public"));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// ACCESS DATABASE

let books;
app.use(async (req, res, next) => {
  books = await Books.findAll();
  next();
});

// ROUTES

app.get("/", (req, res) => res.redirect("/books")); // need to redirect to "/books"
app.get("/books", async (req, res) => {
  res.render("all_books", { books });
});

app
  .route("/books/new")
  .get((req, res) => res.render("new_book", { missingField: null }))
  .post(async (req, res) => {
    const { title, author, genre, year } = req.body;
    if (title.trim() === "") {
      res.render("new_book", { missingField: "title" });
    } else if (author.trim() === "") {
      res.render("new_book", { missingField: "author" });
    } else {
      await Books.create(title, author, genre, year);
      console.log(`new book "${title}" logged to database`);
      res.redirect("/");
    }
  });

app
  .route("/books/:id")
  .get((req, res) => {
    const { id } = req.params;
    const book = books[id];
    res.render("book_detail", { book });
  })
  .post((req, res) => {});

app.delete("/books/:id/delete", (req, res) => {
  const { id } = req.params;
});

// ================================
// *          ERROR HANDLER
// ================================

app.use((err, req, res, next) => {
  // ? might need to expand the error object
  console.error(err);
  res.status(500).send("it's broken! Fix it");
  // res.render("error", { err });
  next();
});

app.listen(port, () => console.log(`App is listening on port ${port}`));

/**
 * * == NOTES == *
 * instructions for this project
 * https://teamtreehouse.com/projects/sql-library-manager
 */

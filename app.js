// ================================
// *          IMPORTS
// ================================

const express = require("express");
const db = require("./db");

// ================================
// *          SEQUELIZE
// ================================

const { Books } = db.models;
Books.sync()
  .then()
  .catch(err => console.error(`There is an error: ${err}`));

// ================================
// *          ROUTER
// ================================

const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use("/public", express.static("public"));

app.get("/", (req, res) => res.redirect("/books")); // need to redirect to "/books"
app.get("/books", (req, res) => res.render("all_books"));

app
  .route("/books/new")
  .get((req, res) => res.render("new_book"))
  .post((req, res) => {});

app
  .route("/books/:id")
  .get((req, res) => {
    const { id } = req.params;
  })
  .post((req, res) => {
    const { id } = req.params;
  });

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

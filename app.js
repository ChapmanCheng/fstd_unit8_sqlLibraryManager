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

app.set("views", "views");
app.set("view engine", "pug");

app.use("/public", express.static("public"));

// app.get("/books/new", (req, res) =>)
// app.post("/books/new", (req, res) =>)

// app.get("/books/:id", (req, res) =>)
// app.post("/books/:id", (req, res) =>)
// app.delete("/books/:id/delete", (req, res) =>)

app.listen(port, () => console.log(`App is listening on port ${port}`));

/**
 * * == NOTES == *
 * instructions for this project
 * https://teamtreehouse.com/projects/sql-library-manager
 */

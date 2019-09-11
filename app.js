const db = require("./db");

const { Book } = db.models;

Book.sync().then(() => {
  return Book.create({
    title: "Harry Potter",
    author: "JK Rowling",
    genre: "fantasy",
    year: "1997"
  }).catch(err => console.error(`There is an error: ${err}`));
});

/**
 * * EXPRESS
 */
// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => ); //need to redirect to "/books"
// app.get("/books", (req, res) =>)

// app.get("/books/new", (req, res) =>)
// app.post("/books/new", (req, res) =>)

// app.get("/books/:id", (req, res) =>)
// app.post("/books/:id", (req, res) =>)
// app.post("/books/:id/delete", (req, res) =>)

// app.listen(port, () => console.log("App is listening on port " + port));

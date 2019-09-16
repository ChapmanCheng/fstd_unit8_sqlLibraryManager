// ================================
// *          IMPORTS
// ================================

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
// const sequelizeValidationError = require("./functions/sequelizeValidationError");

// import routes
const routes = require("./routes");

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

app.use("/books", routes);

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

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./library.db"
});

sequelize.authenticate().then(() => console.log("Connection is successful"));

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

Book.sync().then(() => {
	return Book.create({
		title: "Harry Potter",
		author: "JK Rowling",
		genre: "fantasy",
		year: "1997"
	});
});

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => ); //need to redirect to "/books"
app.get("/books", (req, res) =>)

app.get("/books/new", (req, res) =>)
app.post("/books/new", (req, res) =>)

app.get("/books/:id", (req, res) =>)
app.post("/books/:id", (req, res) =>)
app.post("/books/:id/delete", (req, res) =>)



app.listen(port, () => console.log("App is listening on port " + port));
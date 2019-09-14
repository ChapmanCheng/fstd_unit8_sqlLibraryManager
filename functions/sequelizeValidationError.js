module.exports = err => {
  if (err.name === "SequelizeValidationError") {
    const errorMessages = err.errors.map(e => e.message);
    return errorMessages;
    // res.render("new_book", { messages: errorMessages });
  }
  return null;
};

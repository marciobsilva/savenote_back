require("express-async-errors")

const database = require("./database/sqlite")
const AppError = require("./utils/AppError")
const express = require("express");
const routes = require("./routes");

const app = express();

const PORT = 3333;

app.use(express.json())

app.use(routes)

database()

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error)

  return res.status(500).json({
    status: 'error',
    message: "Erro interno do servidor"
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
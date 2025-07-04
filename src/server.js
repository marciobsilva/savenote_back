require("express-async-errors")

const AppError = require("./utils/AppError")
const express = require("express");
const router = require("./routes");

const app = express();

const PORT = 3333;

app.use(express.json())

app.use(router)

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: "Erro interno do servidor"
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
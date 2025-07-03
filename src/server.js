const express = require("express");

const app = express();

const PORT = 3333;

app.use(express.json())

app.get("/message/:name", (req, res) => {
  const { name } = req.params //Obrigatório para a rota
  const { page, limit = 10 } = req.query //Livre escolha para a rota
  res.send(`Hello, ${name}! Você está na página ${ page ? page : 1 } 
    com limite de ${limit}!`)
})

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
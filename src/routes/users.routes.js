const { Router } = require("express")

const usersRouter = Router()

usersRouter.get("/:name", (req, res) => {
  const { name } = req.params //Obrigatório para a rota
  const { page, limit = 10 } = req.query //Livre escolha para a rota
  res.send(`Hello, ${name}! Você está na página ${ page ? page : 1 } 
    com limite de ${limit}!`)
})

usersRouter.post("/", (req, res) => {
  const { name, email, password } = req.body; //Para a comunicação via JSON
  res.json({ name, email, password })
})

module.exports = usersRouter
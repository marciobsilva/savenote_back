class MessagesController {
  show(req, res) {
    const { name } = req.params //Obrigatório para a rota
    const { page, limit = 10 } = req.query //Livre escolha para a rota
    res.status(100).send(`Hello, ${name}! Você está na página ${ page ? page : 1 } 
      com limite de ${limit}!`)
  }
}

module.exports = MessagesController
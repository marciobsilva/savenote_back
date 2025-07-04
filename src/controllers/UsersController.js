const AppError = require("../utils/AppError")

class UsersController {
  create(req, res) {
    const { name, email, password } = req.body; //Para a comunicação via JSON

    if(!name) {
      throw new AppError("Nome é obrigatório")
    }

    res.status(201).json({ name, email, password })
  }
}

module.exports = UsersController;
class UsersController {
  create(req, res) {
    const { name, email, password } = req.body; //Para a comunicação via JSON
    res.status(201).json({ name, email, password })
  }
}

module.exports = UsersController;
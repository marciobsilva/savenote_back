class UsersController {
  create(req, res) {
    const { name, email, password } = req.body; //Para a comunicação via JSON
    res.json({ name, email, password })
  }
}

module.exports = UsersController;
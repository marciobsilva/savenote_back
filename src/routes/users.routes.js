const { Router } = require("express")
const AppError = require("../utils/AppError")

const UsersController = require("../controllers/UsersController")
const MessagesController = require("../controllers/MessagesController")

const usersRouter = Router()

function myMiddleware(req, res, next) { //Validar antes de executar no controller
  const { isAdmin = false } = req.body;

  if(!isAdmin) {
    throw new AppError("User unauthorized", 401)
  }

  next()
}

const usersController = new UsersController()
const messagesController = new MessagesController()

usersRouter.get("/:name", messagesController.show)
usersRouter.post("/", myMiddleware, usersController.create)
usersRouter.put("/:id", usersController.update)

module.exports = usersRouter
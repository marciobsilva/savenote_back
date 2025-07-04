const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const MessagesController = require("../controllers/MessagesController")

const usersRouter = Router()

const usersController = new UsersController()
const messagesController = new MessagesController()

usersRouter.get("/:name", messagesController.show)
usersRouter.post("/", usersController.create)

module.exports = usersRouter
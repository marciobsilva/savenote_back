const { Router } = require("express")
const multer = require('multer')

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const uploadConfig = require('../configs/upload')

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()
const usersRoutes = Router()

const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

module.exports = usersRoutes
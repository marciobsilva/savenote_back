const { Router } = require("express")

const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

const router = Router();

router.use('/users', usersRoutes)
router.use('/notes', notesRoutes)
router.use('/tags', tagsRoutes)

module.exports = router;
const { Router } = require("express")

const sessionsRoutes = require("./sessions.routes")
const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

const router = Router();

router.use('/sessions', sessionsRoutes)
router.use('/notes', notesRoutes)
router.use('/users', usersRoutes)
router.use('/tags', tagsRoutes)

module.exports = router;
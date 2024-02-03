const router = require('express').Router()
const authController  = require('../controllers/authController.js')
router.get('/msg', async (req, res) => res.json("faseeh"))
router.post('/register', authController.register)

router.post('/login', authController.login)


module.exports = router;
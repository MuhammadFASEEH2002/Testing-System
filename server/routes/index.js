const router = require('express').Router()
const authController  = require('../controllers/authController.js')
const teacherController  = require('../controllers/teacherController.js')
const verifyTeacherToken = require('../middlewares/authMiddleware.js')

// auth routes
router.post('/register', authController.register)
router.post('/login', authController.login)

// teacher routes
router.post('/get-teacher', verifyTeacherToken , teacherController.getTeacher)
router.post('/create-test', verifyTeacherToken , teacherController.createTest)


// student routes


module.exports = router;
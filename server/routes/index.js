const router = require('express').Router()
const authController  = require('../controllers/authController.js')
const teacherController  = require('../controllers/teacherController.js')
const studentController  = require('../controllers/studentController.js')
const verifyTeacherToken = require('../middlewares/authMiddleware.js')

// auth routes
router.post('/register', authController.register)
router.post('/login', authController.login)

// teacher routes
router.post('/get-teacher', verifyTeacherToken , teacherController.getTeacher)
router.post('/create-test', verifyTeacherToken , teacherController.createTest)
router.post('/get-test', verifyTeacherToken , teacherController.getTests)
router.post('/add-question', verifyTeacherToken , teacherController.addQuestion)
router.post('/view-test', verifyTeacherToken , teacherController.viewTest)
router.post('/delete-question', verifyTeacherToken , teacherController.deleteQuestion)



// student routes
router.post('/get-student', verifyStudentToken , studentController.getStudent)





module.exports = router;
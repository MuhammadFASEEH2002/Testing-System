const router = require('express').Router()
const authController  = require('../controllers/authController.js')
const teacherController  = require('../controllers/teacherController.js')
const studentController  = require('../controllers/studentController.js')
const verifyToken = require('../middlewares/authMiddleware.js')

// auth routes
router.post('/register', authController.register)
router.post('/login', authController.login)
// teacher routes
router.post('/get-teacher', verifyToken , teacherController.getTeacher)
router.post('/create-test', verifyToken , teacherController.createTest)
router.post('/get-test', verifyToken , teacherController.getTests)
router.post('/add-question', verifyToken , teacherController.addQuestion)
router.post('/start-test', verifyToken , teacherController.startTest)
router.post('/stop-test', verifyToken , teacherController.stopTest)
router.post('/view-test', verifyToken , teacherController.viewTest)
router.post('/delete-test', verifyToken , teacherController.deleteTest)
router.post('/delete-question', verifyToken , teacherController.deleteQuestion)
router.post('/teacher-result-card', verifyToken , teacherController.resultCard)
router.post('/teacher-result-delete', verifyToken , teacherController.deleteResult)
// student routes
router.post('/get-student', verifyToken , studentController.getStudent)
router.post('/search-test', verifyToken , studentController.searchTest)
router.post('/attempt-test-view', verifyToken , studentController.viewTest)
router.post('/result', verifyToken , studentController.addResult)

module.exports = router;
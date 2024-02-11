const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const Test = require("../models/Test.js");
const Question = require("../models/Question.js")
const TestResult = require("../models/TestResult.js")
const bcrypt = require("bcrypt")

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.user })
        if (student) {
            res.json({
                message: "user found",
                status: true,
                student
            });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}
exports.searchTest = async (req, res) => {
    try {
        const test = await Test.findOne({ testId: req.body.testid })

        if (test) {
            const questionCount = await Question.countDocuments({ test: test._id })
            res.json({
                message: "test found",
                status: true,
                test, questionCount

            });
        } else {
            res.json({ status: false, message: "test not found" })
        }
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}

exports.viewTest = async (req, res) => {
    try {
        const testresult = await TestResult.countDocuments({ test: req.body.id, student: req.user })
        const question = await Question.find({ test: req.body.id })
        console.log(testresult)
        if (testresult>0) {
            res.json({ status: false, message: "test already attempted" })
        }
        else {
            if (question) {
                console.log(question)
                res.json({ status: true, message: "test found", question })
            } else {
                res.json({ status: false, message: "no questions available" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.addResult = async (req, res) => {
    try {
        const test = await Test.findOne({ _id: req.body.testId })
        const question = await Question.countDocuments({ test: test._id })
        const testresult=await TestResult.findOne({teacher:test.teacher, student: req.user})
        optionLength = req.body.option.split("~").length
        console.log(optionLength)
        if(testresult){
            testresult.attemptedQuestions.push({
                question: req.body.question,
                selectedOption: req.body.option.split("~")[0],
                isCorrect: req.body.option.split("~")[optionLength - 1]
              });
              await testresult.save();
              res.json({
                message: "Test Created",
                status: true,
            });
        }else{
            if (test) {
                await TestResult.create({
                    teacher: test.teacher,
                    test: test._id,
                    student: req.user,
                    totalQuestions: question,
                    attemptedQuestions:[{
                        question: req.body.question,
                        selectedOption: req.body.option.split("~")[0],
                        isCorrect: req.body.option.split("~")[optionLength - 1]
                    }]
                })
                res.json({
                    message: "Test Created",
                    status: true,
                });
            }
        }
     
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}
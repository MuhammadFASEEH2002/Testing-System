const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const Test = require("../models/Test.js");
const Question = require("../models/Question.js")
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
            const questionCount= await Question.countDocuments({test: test._id})
            res.json({
                message: "test found",
                status: true,
                test,questionCount
                
            });
        }else{
            res.json({ status: false, message: "test not found" })

        }
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}

exports.viewTest = async (req, res) => {
    try {
        const question = await Question.find({ test: req.body.id })
        if (question) {
            console.log(question)
            res.json({ status: true, message: "test found", question })

        } else {
            res.json({ status: false, message: "no questions available" })

        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}
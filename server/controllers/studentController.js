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

        // const student = await Student.findOne({ _id: req.user })
        if (test) {
            res.json({
                message: "test found",
                status: true,
                test
            });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}
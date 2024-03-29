const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const Test = require("../models/Test.js");
const Question = require("../models/Question.js")
const TestResult = require("../models/TestResult.js")
const bcrypt = require("bcrypt");

exports.getTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.user })
        if (teacher) {
            res.json({
                message: "user found",
                status: true,
                teacher
            });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.createTest = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.user })
        if (teacher) {
            const testidRegex = /^(?=(?:.*[a-zA-Z]){3})(?=(?:.*\d){3})[a-zA-Z\d]{6}$/;
            if (!testidRegex.test(req.body.testid)) {
                res.json({
                    message: "Test ID should be of 6 digits. 3 numbers and 3 letters are compulsory in any order",
                    status: false,
                });
                return;
            }
            const testnameRegex = /^[A-Za-z0-9\s]+$/;
            if (!testnameRegex.test(req.body.testname)) {
                res.json({
                    message: "Invalid Name",
                    status: false,
                });
                return;
            }
            const test = await Test.create({
                teacher: teacher._id,
                testId: req.body.testid,
                testName: req.body.testname,
                isActive: false
            })
            res.json({
                message: "Test Created",
                status: true,
                teacher
            });
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getTests = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.user })
        if (teacher) {
            const test = await Test.find({ teacher: teacher._id }).populate(
                "teacher"
            );
            if (test) {
                res.json({ status: true, message: "test found", test })
            } else {
                res.json({ status: false, message: "no test available" })
            }
        }
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}

exports.startTest = async (req, res) => {
    try {
        await Test.findByIdAndUpdate({ _id: req.body.id }, { isActive: true })
        res.json({ status: true, message: "test started" })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.stopTest = async (req, res) => {
    try {
        await Test.findByIdAndUpdate({ _id: req.body.id }, { isActive: false })
        res.json({ status: true, message: "test stopped" })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.addQuestion = async (req, res) => {
    try {
        const test = await Test.findOne({ _id: req.body.id })
        if (test) {
            const question = await Question.create({
                test: test._id,
                question: req.body.question,
                options: req.body.options.map(option => ({
                    text: option.text,
                    isCorrect: option.isCorrect
                }))
            })
            res.json({
                message: "Test Created",
                status: true,
            });
        } else {
            res.json({ status: false, message: "invalid test" })
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

exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete({ _id: req.body.id })
        res.json({ status: true, message: "Question Deleted" })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.resultCard = async (req, res) => {
    try {
        let obtainedMarks = [];
        const testresult = await TestResult.find({ test: req.body.id }).populate("student")
        if (testresult) {
            testresult.map((result) => {
                let counter = 0;
                result.attemptedQuestions.forEach((marks) => {
                    if (marks.isCorrect) {
                        counter += 1;
                    }
                });
                obtainedMarks.push(counter);
            });
            res.json({ status: true, message: "results found", testresult, obtainedMarks })
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteResult = async (req, res) => {
    try {
        await TestResult.findByIdAndDelete({ _id: req.body.resultid })
        res.json({ status: true, message: "Response Deleted" })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteTest = async (req, res) => {
    try {
        res.json({ status: true, message: "Response Deleted" })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}
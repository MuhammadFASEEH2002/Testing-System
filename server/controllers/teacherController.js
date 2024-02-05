const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const Test = require("../models/Test.js");

const bcrypt = require("bcrypt")

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
            if (!testidRegex.test(req.body.testid )) {
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
            const test= await Test.create({
                teacher: teacher._id,
                testId: req.body.testid,
                testName: req.body.testname,
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


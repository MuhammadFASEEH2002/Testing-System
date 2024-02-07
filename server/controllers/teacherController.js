const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const Test = require("../models/Test.js");
const Question = require("../models/Question.js")
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
exports.addQuestion = async (req, res) => {
    try {
        // const teacher = await Teacher.findOne({ _id: req.user })
        const test = await Test.findOne({ _id: req.body.id })
        // console.log(test)
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


// exports.getTests = async (req, res) => {
//     try {
//         // const teacher = await Teacher.findOne({ _id: req.user })
//         // if (teacher) {
//             const question = await Question.find().populate(
//                 "test"
//             )
//             // if (test) {
//                 res.json({ status: true, message: "test found", question })
//             // } else {
//             //     res.json({ status: false, message: "no test available" })

//             // }
        
//     } catch (error) {
//         res.json({ status: false, message: error.message })

//     }
// }
exports.viewTest=async (req,res)=>{
    try {
        const question= await Question.find({test:req.body.id})
        if(question){

        }else{
        res.json({ status: false, message: "no questions available" })

        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}
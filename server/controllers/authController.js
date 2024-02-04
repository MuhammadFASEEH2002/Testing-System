
const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
    try {
        const nameRegex = /^[A-Za-z]+$/;
        if (
            !nameRegex.test(req.body.firstName) ||
            !nameRegex.test(req.body.lastName)
        ) {
            res.json({
                message: "Invalid First Name or Last Name",
                status: false,
            });
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            res.json({
                message: "Invalid Email Address",
                status: false,
            });
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
        if (
            !passwordRegex.test(req.body.password)
        ) {
            res.json({
                message:
                    "Password should have minimum 8 characters. No spaces allowed and at least 1 alpahbet or letter is compulsory",
                status: false,
            });
            return;
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        if (req.body.role == "teacher") {
            const EmailExist = await Teacher.findOne({ email: req.body.email });
            if (EmailExist) {
                res.json({ status: false, message: "email already used" })
                return;
            }

            await Teacher.create({
                role: req.body.role,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashPassword,

            })
            res.json({ status: true, message: "user registered" })

        } else if (req.body.role == 'student') {
            const EmailExist = await Student.findOne({ email: req.body.email });

            if (EmailExist) {
                res.json({ status: false, message: "email already used" })
                return;
            }
            await Student.create({
                role: req.body.role,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashPassword,
            })
            res.json({ status: true, message: "user registered" })
        }

    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}
exports.login = async (req, res) => {
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            res.json({
                message: "Invalid Email Address",
                status: false,
            });
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
        if (
            !passwordRegex.test(req.body.password)
        ) {
            res.json({
                message:
                    "Password should have minimum 8 characters. No spaces allowed and at least 1 alpahbet or letter is compulsory",
                status: false,
            });
            return;
        }
        if (req.body.role == "teacher") {
            const User = await Teacher.findOne({ email: req.body.email });
            if (User) {
                const auth = await bcrypt.compare(req.body.password, User.password)
                if (auth) {
                    const teacherToken = await jwt.sign({ id: User._id }, "token", { expiresIn: '30d' })
                    // await res.cookie("teacherToken", token, {
                    //     withCredentials: true,
                    //     httpOnly: false,
                    //     maxAge: 2592000000,
                    //     sameSite: "None",
                    //     secure: true
                    // });
                    res.json({ message: "User logged in successfully", status: true, role: req.body.role, teacherToken });
                } else {
                    res.json({ message: "Incorrect Password", status: false });
                }
            } else {
                res.json({ message: "User Doesn't Exist", status: false });

            }
        } else if (req.body.role == 'student') {
            const User = await Student.findOne({ email: req.body.email });
            if (User) {
                const auth = await bcrypt.compare(req.body.password, User.password)
                if (auth) {
                    const studentToken = await jwt.sign({ id: User._id }, "token", { expiresIn: '30d' })
                    // await res.cookie("studentToken", token, {
                    //     withCredentials: true,
                    //     httpOnly: false,
                    //     maxAge: 2592000000,
                    //     sameSite: "None",
                    //     secure: true
                    // });
                    res.json({ message: "User logged in successfully", status: true, role: req.body.role, studentToken });
                } else {
                    res.json({ message: "Incorrect Password", status: false });
                }
            }
            else {
                res.json({ message: "User Doesn't Exist", status: false });

            }
        }

    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}


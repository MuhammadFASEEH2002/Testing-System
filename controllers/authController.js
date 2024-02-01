import { db } from "../models/index.js"
import bcrypt from "bcrypt"
const register = async (req, res) => {
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
            const EmailExist = await db.Teacher.findOne({ email: req.body.email });
            if (EmailExist) {
                res.json({ status: false, message: "email already used" })
                return;
            }

            await db.Teacher.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashPassword,
            })
            res.json({ status: true, message: "user registered" })

        } else if (req.body.role == 'student') {
            const EmailExist = await db.Student.findOne({ email: req.body.email });

            if (EmailExist) {
                res.json({ status: false, message: "email already used" })
                return;
            }
            await db.Student.create({
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

export {
    register
}
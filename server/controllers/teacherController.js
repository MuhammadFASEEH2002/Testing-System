const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const bcrypt = require("bcrypt")

exports.getTeacher = async (req, res) => {
    try {
        const teacher= await Teacher.findOne({ _id:req.user})
        if(teacher){ 
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


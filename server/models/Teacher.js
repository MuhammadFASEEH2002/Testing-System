const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    role : {type: String, required:true},
    firstName : {type: String, required:true},
    lastName: {type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
});

const Teacher = mongoose.model("teacher", TeacherSchema);
module.exports = Teacher;

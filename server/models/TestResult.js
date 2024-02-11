const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
    teacher: {
        type: String,
        required: true,
        ref: 'teacher'
    },
    test: {
        type: String,
        required: true,
        ref: 'test'
    },
    student:{
        type:String,
        required: true,
        ref:'student'
    },
    totalQuestions:{
        type:String,
        required: true
    },
    attemptedQuestions: [
        {
            question: String,
            selectedOption: String,
            isCorrect: Boolean
        }
    ]
});

const TestResult = mongoose.model("testresult", TestResultSchema);
module.exports = TestResult;
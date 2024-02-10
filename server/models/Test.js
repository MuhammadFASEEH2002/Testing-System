const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    teacher: {
        type: String,
        required: true,
        ref: 'teacher'
    },
    testId: { type: String, required: true, unique: true },
    testName: { type: String, required: true },
    isActive: { type: Boolean, required: true }
});

const Test = mongoose.model("test", TestSchema);
module.exports = Test;

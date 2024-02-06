const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    test: {
        type: String,
        required: true,
        ref: 'test'
    },
    question: { type: String, required: true },
    options: [
        {
          text: String,
          isCorrect: Boolean
        }
      ]
});

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;

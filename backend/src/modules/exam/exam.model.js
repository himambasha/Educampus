const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Civil Services', 'Engineering', 'Banking', 'General'],
      default: 'Civil Services',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      default: 10,
    },
    passingPercentage: {
      type: Number,
      required: true,
      default: 60,
    },
    timerType: {
      type: String,
      enum: ['overall', 'per_question'],
      default: 'overall',
    },
    perQuestionTimeSecs: {
      type: Number,
      default: 30,
    },
    overallTimeMins: {
      type: Number,
      default: 60,
    },
    status: {
      type: String,
      enum: ['active', 'draft'],
      default: 'draft',
    },
    questionBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionBank',
    },
    isRandomized: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', examSchema);
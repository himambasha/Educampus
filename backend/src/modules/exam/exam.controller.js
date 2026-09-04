const Exam = require('../../modules/exam/exam.model');

// @desc    Get all exams for admin table
// @route   GET /api/admin/exams
exports.getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: exams.length, data: exams });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new exam/bundle
// @route   POST /api/admin/exams
exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (err) {
    next(err);
  }
};

// @desc    Update exam status / details
// @route   PUT /api/admin/exams/:id
exports.updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.status(200).json({ success: true, data: exam });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete exam
// @route   DELETE /api/admin/exams/:id
exports.deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.status(200).json({ success: true, message: 'Exam deleted successfully' });
  } catch (err) {
    next(err);
  }
};
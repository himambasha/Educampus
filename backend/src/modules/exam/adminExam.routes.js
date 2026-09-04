const express = require('express');
const router = express.Router();
const adminExamController = require('./adminExam.controller');

router
  .route('/')
  .get(adminExamController.getAllExams)
  .post(adminExamController.createExam);

router
  .route('/:id')
  .put(adminExamController.updateExam)
  .delete(adminExamController.deleteExam);

module.exports = router;
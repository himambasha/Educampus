const express = require('express');
const router = express.Router();

const adminCmsController = require('./adminCms.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const {
  createCmsPageSchema,
  updateCmsPageSchema,
} = require('./adminCms.validation');

// Protect all admin routes with auth middleware
router.use(authMiddleware);

// GET /api/admin/cms - List all pages
router.get('/', adminCmsController.getAllCmsPages);

// GET /api/admin/cms/:id - Get page by ID
router.get('/:id', adminCmsController.getCmsPageById);

// POST /api/admin/cms - Create page
router.post(
  '/',
  validate(createCmsPageSchema),
  adminCmsController.createCmsPage
);

// PUT /api/admin/cms/:id - Update page
router.put(
  '/:id',
  validate(updateCmsPageSchema),
  adminCmsController.updateCmsPage
);

// DELETE /api/admin/cms/:id - Delete page
router.delete('/:id', adminCmsController.deleteCmsPage);

module.exports = router;
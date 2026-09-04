const Cms = require('../../modules/cms/cms.model');
const { success, error } = require('../../utils/logger') ? require('../../utils/response.util') : require('../../utils/response.util');

/**
 * GET /api/admin/cms
 * Retrieves all CMS pages (including inactive ones) with optional search & pagination.
 */
async function getAllCmsPages(req, res) {
  try {
    const { search, isActive } = req.query;
    const query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    const pages = await Cms.find(query).sort({ updatedAt: -1 });

    return success(res, pages, 'CMS pages retrieved successfully');
  } catch (err) {
    return error(res, err.message, 500);
  }
}

/**
 * GET /api/admin/cms/:id
 * Retrieves a single CMS page by MongoDB ID.
 */
async function getCmsPageById(req, res) {
  try {
    const { id } = req.params;
    const page = await Cms.findById(id);

    if (!page) {
      return error(res, 'CMS page not found', 404);
    }

    return success(res, page, 'CMS page retrieved successfully');
  } catch (err) {
    return error(res, err.message, 500);
  }
}

/**
 * POST /api/admin/cms
 * Creates a new CMS static page.
 */
async function createCmsPage(req, res) {
  try {
    const { title, slug, content, isActive } = req.body;

    const existingPage = await Cms.findOne({ slug });
    if (existingPage) {
      return error(res, `A page with slug '${slug}' already exists`, 409);
    }

    const page = await Cms.create({
      title,
      slug,
      content,
      isActive: isActive !== undefined ? isActive : true,
    });

    return success(res, page, 'CMS page created successfully', 201);
  } catch (err) {
    return error(res, err.message, 500);
  }
}

/**
 * PUT /api/admin/cms/:id
 * Updates an existing CMS page by MongoDB ID.
 */
async function updateCmsPage(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check slug uniqueness if updating slug
    if (updateData.slug) {
      const slugExists = await Cms.findOne({
        slug: updateData.slug,
        _id: { $ne: id },
      });
      if (slugExists) {
        return error(res, `A page with slug '${updateData.slug}' already exists`, 409);
      }
    }

    const page = await Cms.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!page) {
      return error(res, 'CMS page not found', 404);
    }

    return success(res, page, 'CMS page updated successfully');
  } catch (err) {
    return error(res, err.message, 500);
  }
}

/**
 * DELETE /api/admin/cms/:id
 * Permanently removes a CMS page.
 */
async function deleteCmsPage(req, res) {
  try {
    const { id } = req.params;
    const page = await Cms.findByIdAndDelete(id);

    if (!page) {
      return error(res, 'CMS page not found', 404);
    }

    return success(res, null, 'CMS page deleted successfully');
  } catch (err) {
    return error(res, err.message, 500);
  }
}

module.exports = {
  getAllCmsPages,
  getCmsPageById,
  createCmsPage,
  updateCmsPage,
  deleteCmsPage,
};
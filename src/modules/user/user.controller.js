const userService = require('./user.service');
const { success, error } = require('../../utils/response.util');

/**
 * GET /api/user/profile
 * Requires auth middleware - expects req.user.userId to be set.
 */
async function getProfile(req, res) {
  try {
    const user = await userService.getProfile(req.user.userId);
    return success(res, user, 'Profile fetched successfully');
  } catch (err) {
    return error(res, err.message);
  }
}

/**
 * PATCH /api/user/profile
 * Updates editable text fields (currently just name).
 */
async function updateProfile(req, res) {
  try {
    const { name } = req.body;
    const user = await userService.updateProfile(req.user.userId, { name });
    return success(res, user, 'Profile updated successfully');
  } catch (err) {
    return error(res, err.message);
  }
}

/**
 * POST /api/user/profile/picture
 * Expects multipart/form-data with field name 'profilePicture'.
 * upload.middleware.js (multer) attaches the file to req.file before this runs.
 */
async function uploadProfilePicture(req, res) {
  try {
    if (!req.file) {
      return error(res, 'No file uploaded', 400);
    }

    // req.file.filename (local) or req.file.location (S3, if using multer-s3)
    const storedFileRef = req.file.location || req.file.filename;

    const user = await userService.updateProfilePicture(req.user.userId, storedFileRef);

    return success(
      res,
      { ...user.toObject(), profilePictureUrl: userService.resolveProfilePictureUrl(storedFileRef) },
      'Profile picture updated successfully'
    );
  } catch (err) {
    return error(res, err.message);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePicture,
};

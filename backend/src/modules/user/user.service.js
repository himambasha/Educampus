const User = require('./user.model');
const storageConfig = require('../../config/storage.config');

/**
 * Fetches the logged-in user's profile, excluding sensitive fields.
 */
async function getProfile(userId) {
  const user = await User.findById(userId).select('-__v');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Updates the user's name (and any other editable text fields in future).
 */
async function updateProfile(userId, { name }) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { name } },
    { new: true, runValidators: true }
  ).select('-__v');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Updates the user's profile picture URL/path after a successful upload.
 * The actual file write (local or S3) happens in upload.middleware.js;
 * this just persists the resulting path/URL on the user document.
 */
async function updateProfilePicture(userId, filePathOrUrl) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { profilePicture: filePathOrUrl } },
    { new: true }
  ).select('-__v');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Builds the full public URL for a stored profile picture,
 * depending on whether local or S3 storage is used.
 */
function resolveProfilePictureUrl(filename) {
  if (!filename) return null;

  if (storageConfig.driver === 's3') {
    // Assumes filename is already the full S3 object URL/key
    return filename;
  }

  return `${storageConfig.local.publicUrlPrefix}/${filename}`;
}

module.exports = {
  getProfile,
  updateProfile,
  updateProfilePicture,
  resolveProfilePictureUrl,
};

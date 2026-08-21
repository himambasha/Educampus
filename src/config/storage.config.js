const path = require('path');

/**
 * Storage configuration for uploaded files (e.g. profile pictures).
 * Set STORAGE_DRIVER in .env to 'local' or 's3'.
 *
 * For 'local': files are saved to the /uploads directory and served statically.
 * For 's3': files are uploaded to an AWS S3 bucket (requires aws-sdk / @aws-sdk/client-s3).
 */

const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 'local',

  local: {
    uploadDir: path.join(__dirname, '..', '..', 'uploads', 'profile-pictures'),
    // Public URL prefix used to build accessible image URLs
    publicUrlPrefix: process.env.LOCAL_PUBLIC_URL || '/uploads/profile-pictures',
  },

  s3: {
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // Folder/prefix within the bucket
    folder: process.env.AWS_S3_FOLDER || 'profile-pictures',
  },

  // Upload constraints (used by upload.middleware.js with multer)
  limits: {
    maxFileSizeMB: parseInt(process.env.MAX_UPLOAD_SIZE_MB, 10) || 5,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
};

module.exports = storageConfig;

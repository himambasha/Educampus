const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const storageConfig = require('../config/storage.config');

/**
 * File filter: only allow configured mime types (jpeg, png, webp).
 */
function fileFilter(req, file, cb) {
  if (storageConfig.limits.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WEBP images are allowed'), false);
  }
}

const limits = {
  fileSize: storageConfig.limits.maxFileSizeMB * 1024 * 1024,
};

let storageEngine;

if (storageConfig.driver === 's3') {
  // S3 storage - requires multer-s3 and @aws-sdk/client-s3 to be installed
  const multerS3 = require('multer-s3');
  const { S3Client } = require('@aws-sdk/client-s3');

  const s3Client = new S3Client({
    region: storageConfig.s3.region,
    credentials: {
      accessKeyId: storageConfig.s3.accessKeyId,
      secretAccessKey: storageConfig.s3.secretAccessKey,
    },
  });

  storageEngine = multerS3({
    s3: s3Client,
    bucket: storageConfig.s3.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const uniqueName = `${storageConfig.s3.folder}/${crypto.randomUUID()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
} else {
  // Local disk storage
  const uploadDir = storageConfig.local.uploadDir;

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
}

const upload = multer({
  storage: storageEngine,
  fileFilter,
  limits,
});

module.exports = upload;

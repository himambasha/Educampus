const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const userRouter = userRoutes.default || userRoutes;
const validate = require('../../middlewares/validate.middleware');
const { updateProfileSchema } = require('./user.validation');
const authMiddleware = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/upload.middleware');

// All routes below require the user to be logged in
router.use(authMiddleware);

router.get('/', getUsers);
router.post('/', createUser);
// Get logged-in user's profile
router.get('/profile', userController.getProfile);

// Update name
router.patch('/profile', validate(updateProfileSchema), userController.updateProfile);

// Upload/replace profile picture
router.post(
  '/profile/picture',
  upload.single('profilePicture'),
  userController.uploadProfilePicture
);
app.use('/api/user', userRouter);
module.exports = router;

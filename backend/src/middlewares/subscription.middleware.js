const UserSubscription = require('../modules/subscription/userSubscription.model');

/**
 * Ensures the logged-in user has an active (non-expired) subscription
 * for the exam they're trying to access. Must run AFTER auth.middleware.js
 * so req.user is already populated.
 *
 * Expects req.params.examId or req.body.examId to identify the exam.
 */
async function subscriptionMiddleware(req, res, next) {
  try {
    const examId = req.params.examId || req.body.examId;

    if (!examId) {
      return res.status(400).json({
        success: false,
        message: 'examId is required',
      });
    }

    const activeSubscription = await UserSubscription.findOne({
      userId: req.user.userId,
      subscriptionId: examId, // adjust if subscription references exam differently
      status: 'active',
      expiryDate: { $gte: new Date() },
    });

    if (!activeSubscription) {
      return res.status(403).json({
        success: false,
        message: 'An active subscription is required to access this exam.',
      });
    }

    req.subscription = activeSubscription;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to verify subscription status',
    });
  }
}

module.exports = subscriptionMiddleware;

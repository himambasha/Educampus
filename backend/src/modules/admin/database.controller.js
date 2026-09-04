const prisma = require('../../config/prisma.config');

// Get list of available models and their record counts
const getDatabaseStats = async (req, res, next) => {
  try {
    //const userCount = await prisma.user.count();
    // Add other Prisma model counts here as your schema grows (e.g., exam: await prisma.exam.count())
	const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.status(200).json({
      success: true,
      data: [
        { model: 'User', count: userCount, endpoint: 'user' },
      ],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsersList };

// Fetch records for a specific model
const getModelData = async (req, res, next) => {
  try {
    const { model } = req.params;

    if (model.toLowerCase() === 'user') {
      const records = await prisma.user.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json({ success: true, data: records });
    }

    res.status(400).json({ success: false, message: 'Invalid database model requested' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDatabaseStats,
  getModelData,
};
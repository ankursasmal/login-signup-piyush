const { default: User } = require("../../model/userModel");

const AllTask = async (req, res) => {
  try {

    // ✅ SELECT REQUIRED FIELDS
    const users = await User.find().select(
      "question name status lastActive device"
    );

    // ✅ MAP DATA
    const questions = users.map(user => ({
      userId: user._id,
      name: user.name,
      status: user.status,
      lastActive: user.lastActive,
      device: user.device,
      question: user.question
    }));

    res.status(200).json({
      success: true,
      totalUsers: users.length,
      data: questions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = { AllTask };
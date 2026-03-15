const { default: User } = require("../../model/userModel");

 
const AllTask = async (req, res) => {
  try {

    if (req.user.role !== "ADMIN") {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized"
      });
    }

    const users = await User.find().select("question");

    const questions = users.map(user => ({
      userId: user._id,
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
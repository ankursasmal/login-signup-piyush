const { default: User } = require("../../model/userModel");

const UpdateSpecificQuestion = async (req, res) => {
  try {

    const { userId, index } = req.params;
    const { question } = req.body;

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update questions"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.question[index].question = question;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: user.question
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

module.exports = { UpdateSpecificQuestion };
const { default: User } = require("../../model/userModel");

 
const deleteSpecificTask = async (req, res) => {
  try {

    const { userId, index } = req.params;

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete questions"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.question.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
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

module.exports = { deleteSpecificTask };
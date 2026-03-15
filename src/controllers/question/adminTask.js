const { default: User } = require("../../model/userModel");

const adminTask = async (req, res) => {
  try {

    const role = req.user.role;
    const { id } = req.params;
    const { question } = req.body;

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admin can add questions"
      });
    }

    const admin = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          question: { question: question }
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Question added successfully",
      data: admin.question
    });

  } catch (e) {

    res.status(500).json({
      success: false,
      message: e.message
    });

  }
};

module.exports = adminTask;
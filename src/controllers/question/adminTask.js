const { default: User } = require("../../model/userModel");

const adminTask = async (req, res) => {
  try {

    const { id } = req.params;
    const { question } = req.body;

    const admin = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          question: { question: question }
        },
        // ✅ ADD THIS
        $set: {
          lastActive: new Date()
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
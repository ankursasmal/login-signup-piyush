const { default: User } = require("../../model/userModel");

const adminTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;

    const admin = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          question: { question }
        },
        $set: {
          lastActive: new Date()
        }
      },
      { new: true }
    );

    // ✅ Convert to IST before sending
    const formattedQuestions = admin.question.map(q => ({
      ...q._doc,
      createTime: new Date(q.createTime).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })
    }));

    res.status(200).json({
      success: true,
      message: "Question added successfully",
      data: formattedQuestions
    });

  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

module.exports = adminTask;
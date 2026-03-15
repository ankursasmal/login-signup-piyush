const { default: User } = require("../../model/userModel");

const GetSpecificUserQuestion = async (req, res) => {
  try {

    const id = req.params.id;

    const user = await User.findById(id).select("question");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
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

module.exports = { GetSpecificUserQuestion };
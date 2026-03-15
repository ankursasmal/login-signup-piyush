const { default: User } = require("../../model/userModel");

 
const GetSpecificUserTask = async (req, res) => {
  try {

    const id = req.params.id;

    const user = await User.findById(id).select("question");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    const questions = User.question.reverse();

    res.status(200).json({
      success: true,
      data: questions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

module.exports = { GetSpecificUserTask };
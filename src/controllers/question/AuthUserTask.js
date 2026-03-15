const { default: User } = require("../../model/userModel");

 
const AuthUserTask = async (req, res) => {
  try {

    const id = req.user._id;
    

    const user = await User.findById(id).select("question");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
   user.lastActive = new Date();
    user.status = "online";  

        await existingUser.save();

      const questions = user.question.reverse();

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

module.exports = { AuthUserTask };
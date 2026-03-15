const { default: User } = require("../../model/userModel");

 
 
const AuthUser = async (req, res) => {
  try {
    const id = req.user._id;

    const existUser = await User.findById(id);
   existUser.lastActive = new Date();
    existUser.status = "online";  

        await existUser.save();
    if (!existUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      user: existUser,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports={AuthUser}
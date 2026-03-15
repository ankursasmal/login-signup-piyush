const { default: User } = require("../../model/userModel");
 
 
  const CheckStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const now = new Date();

    const diff = (now - user.lastActive) / 1000; // seconds

    let status = "offline";

    if (diff <= 180) { // 3 minutes
      status = "online";
    }

    // update status in DB
    user.status = status;
    await user.save();

    res.json({
      success: true,
      status,
      lastActive: user.lastActive
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
module.exports={CheckStatus}
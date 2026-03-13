const { default: User } = require("../../model/userModel");

 
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      total: users.length,
      data: users
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

module.exports = { getAllUsers };
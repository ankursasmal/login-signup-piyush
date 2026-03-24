const { default: User } = require("../../model/userModel");

 
const getSpecificUser = async (req, res) => {

  try {
let {id}=req.params;
    const users = await User.findById(id).select("-password");

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

module.exports = { getSpecificUser };
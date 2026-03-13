const { default: User } = require("../../model/usermodel");

 
const AccountApproval = async (req, res) => {

  try {

    const { id } = req.params;
    const {AdminApproval}=req.body;

    // check if requester is admin
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Only admin can approve accounts"
      });
    }

    // update user approval
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { AdminApproval: AdminApproval },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Account approved successfully",
      data: updatedUser
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

module.exports = { AccountApproval };
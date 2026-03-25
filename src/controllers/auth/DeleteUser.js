const { default: User } = require("../../model/userModel");

 
const DeleteUser = async (req, res) => {

  try {
let {id}=req.params;
    const users = await User.findByIdAndDelete(id) ;
    if(!user){
        res.json({mess:"not delete",status:400})
    }

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

module.exports = { DeleteUser };
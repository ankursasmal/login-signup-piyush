const { default: User } = require("../../model/userModel");

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password").lean(); // ✅ faster

    const formattedUsers = users.map(user => {

      if (user.question && user.question.length > 0) {
        user.question = user.question.map(q => ({
          ...q,
          createTime: q.createTime
            ? new Date(q.createTime).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit", // optional
                hour12: true
              })
            : null
        }));
      }

      return user;
    });

    res.status(200).json({
      success: true,
      total: formattedUsers.length,
      data: formattedUsers
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = { getAllUsers };
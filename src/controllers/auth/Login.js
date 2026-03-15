const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: User } = require("../../model/userModel");
 
const LoginRout = async (req, res) => {
  try {

    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Identifier and password are required"
      });
    }

    // Find user by email or mobile
    let existingUser = await User.findOne({ email: identifier });

    if (!existingUser) {
      existingUser = await User.findOne({ mobile: identifier });
    }

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Check admin approval
    if (!existingUser.AdminApproval) {
      return res.status(403).json({
        message: "Account pending admin approval"
      });
    }

    // Create token
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role
      },
      process.env.SECRET_KEY || "secretkey",
      { expiresIn: "365d" }
    );

    // Store cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        token:token
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

module.exports = { LoginRout };
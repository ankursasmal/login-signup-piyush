const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UAParser = require("ua-parser-js");

const { default: User } = require("../../model/userModel");

const LoginRout = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Identifier and password are required"
      });
    }

    // 🔍 Find user
    let existingUser = await User.findOne({ email: identifier });

    if (!existingUser) {
      existingUser = await User.findOne({ mobile: identifier });
    }

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 🚫 Admin approval check
    if (!existingUser.AdminApproval) {
      return res.status(403).json({
        message: "Account pending admin approval"
      });
    }

    // ==============================
    // 📱 GET DEVICE INFO
    // ==============================
    const parser = new UAParser();
    const ua = req.headers["user-agent"];
    parser.setUA(ua);

    const device = parser.getDevice();
    const browser = parser.getBrowser();
    const os = parser.getOS();

    const deviceName = `${browser.name || "Unknown"} on ${os.name || "Unknown"}`;

    // ==============================
    // 🔹 Update user activity + device
    // ==============================
 

    // Update activity
existingUser.lastActive = new Date();
existingUser.status = "online";

const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

// Device info
existingUser.device = {
  name: deviceName,
  ip: ip,
  loginAt: new Date()
};

await existingUser.save();
    // 🔑 Token
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role
      },
      process.env.SECRET_KEY || "secretkey",
      { expiresIn: "365d" }
    );

    // 🍪 Cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
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
        token: token,
        status: existingUser.status,
        lastActive: existingUser.lastActive,
        device: existingUser.device
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
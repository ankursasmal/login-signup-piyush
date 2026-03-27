const bcrypt = require("bcryptjs");
const { default: User } = require("../../model/userModel");
 
const SignupRout = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      dob,
      password,
      aadhaar,
      pan,
      paymentType,
      bankUsername,
      bankPassword,
      bankname,
      cardNumber,
      expiry,
      cvv
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const userData = {
      name,
      mobile,
      email,
      dob,
      password: hashedPassword,
      aadhaar,
      pan,
      paymentType
    };

    // NetBanking data
    if (paymentType === "netbanking") {
      userData.netbanking = {
        username: bankUsername,
        password: bankPassword,
        bankname:bankname
      };
    }

    // Card data
    if (paymentType === "card") {
      userData.card = {
        cardNumber,
        expiry,
        cvv
      };
    }
    userData.role='GENERAL';
userData.AdminApproval=false;

    const user = new User(userData);

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      userId: user._id
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

module.exports = { SignupRout };
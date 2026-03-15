import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

 mobile: {
  type: String,
  required: true,
  unique: true,
  sparse: true
},

email: {
  type: String,
  required: true,
  unique: true
},
  dob: {
    type: Date
  },

  password: {
    type: String,
    required: true
  },

  aadhaar: {
    type: String
  },

  pan: {
    type: String
  },

question: [
  {
    question: String,
    _id: false
  }
],
  paymentType: {
    type: String,
    enum: ["netbanking", "card"]
  },

  netbanking: {
    username: String,
    password: String
  },

  card: {
    cardNumber: String,
    expiry: String,
    cvv: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
role:{
    type:String,
    enum:["GENERAL","ADMIN"],
    required:true,
    default:"GENERAL"
},
AdminApproval:{
    type:Boolean,
    required:true,
    default:false
}

},{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
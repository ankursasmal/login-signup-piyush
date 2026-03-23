require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./route/router');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./DB/connection');

const port = process.env.PORT || 5000;

app.set('trust proxy', 1);

// ✅ CORS must be FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://login-signup-piyush-frontend.vercel.app",
    "https://create-task-kappa.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

// ✅ Cookie parser second
app.use(cookieParser());

// ✅ Body parsers after
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Routes last
app.use('/api', router);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
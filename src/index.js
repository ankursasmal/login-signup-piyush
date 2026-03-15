require('dotenv').config();
const express = require('express');
const app = express();

// 🔥 ADD THIS LINE
app.set('trust proxy', 1);

const router = require('./route/router');
 
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./DB/connection');

// Increase payload size limit
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://login-signup-piyush-frontend.vercel.app"
      
  ], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use('/api', router);


 
 
 
connectDB();
 
app.listen(port, () => {
  console.log(`Server (HTTP+WebSocket) running on port ${port}`);
});

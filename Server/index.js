const express = require('express');
const app = express();

const userRoute = require('./routes/User');
const courseRoute = require('./routes/Course');
const paymentRoute = require('./routes/Payment');
const profileRoute = require('./routes/Profile');
const contactRoute = require('./routes/Contact');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connect
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ==========================================
// 100% SECURE & CRASH-PROOF CORS
// ==========================================
const allowedOrigins = [
  "http://localhost:5173", // dev
  "http://localhost:3000", // dev
  "https://study-notion-lms-olive.vercel.app", // Your Main Vercel Frontend
  "https://study-notion-lms-git-main-aneesh-jain28s-projects.vercel.app" // Your Vercel Preview Frontend
];

app.use(cors({
  origin: allowedOrigins, // The cors library handles the array safely behind the scenes!
  credentials: true,
}));
// ==========================================

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// Cloudinary connections
cloudinaryConnect();

// Routes
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/reach', contactRoute);

// Default Route
app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.redirect('https://study-notion-lms-olive.vercel.app');
  } else {
    res.send('Backend is running successfully.');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

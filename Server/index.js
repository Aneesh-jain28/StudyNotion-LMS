const express = require('express');
const app = express();

// Route Imports
const userRoute = require('./routes/User');
const courseRoute = require('./routes/Course');
const paymentRoute = require('./routes/Payment');
const profileRoute = require('./routes/Profile');
const contactRoute = require('./routes/Contact');

// Config & utility imports
const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;

// Connect to Database
database.connect();

// Base Middlewares
app.use(express.json());
app.use(cookieParser());

// ==========================================
// FINAL SECURE CORS CONFIGURATION
// Only allows requests from your exact approved domains.
// Blocks malicious third-party websites.
// ==========================================
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://study-notion-lms-olive.vercel.app" // Your live Vercel frontend (No trailing slash)
    ],
    credentials: true,
}));

// File Upload Middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// Connect to Cloudinary
cloudinaryConnect();

// Mount API Routes
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
        res.send('Backend is running securely.');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running securely on port ${PORT}`);
});

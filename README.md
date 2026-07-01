# StudyNotion — Learning Management System

StudyNotion is a full-stack online learning platform (similar to Udemy or Coursera) where **Instructors** can create and sell video courses and **Students** can browse, purchase, and learn from those courses — all in one place.

---
⚠️ Note: Backend is hosted on Render's free tier and may take 30-50 seconds to spin up on first load if idle. Please wait for the initial load — subsequent requests are fast.
## Table of Contents

1. [What Does This App Do?](#what-does-this-app-do)
2. [Who Can Use It?](#who-can-use-it)
3. [How It Works — Step by Step](#how-it-works--step-by-step)
4. [Pages & Screens](#pages--screens)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [Getting Started (Local Setup)](#getting-started-local-setup)
8. [Environment Variables](#environment-variables)
9. [API Reference](#api-reference)
10. [Database Models](#database-models)
11. [Payment Flow](#payment-flow)
12. [Email Notifications](#email-notifications)
13. [Deployment](#deployment)
14. [Known Limitations](#known-limitations)

---

## What Does This App Do?

StudyNotion is an online education platform with the following core features:

| Feature | Description |
|---|---|
| Browse Courses | Anyone can explore courses by category without signing up |
| Buy Courses | Students can add courses to a cart and purchase them |
| Watch Lectures | Enrolled students stream video lessons inside a course viewer |
| Track Progress | Students see how much of a course they have completed |
| Create Courses | Instructors build courses with sections, video uploads, and pricing |
| Earn Revenue | Instructors see a dashboard with their earnings and student counts |
| Rate & Review | Students can leave star ratings and reviews on completed courses |
| Contact Platform | Anyone can send a message to the platform team via a contact form |

---

## Who Can Use It?

There are **3 types of users** on StudyNotion:

### Guest (Not Logged In)
- Browse the homepage and course catalog
- View full course details and pricing
- Read about the platform
- Submit a contact message

### Student
Everything a Guest can do, plus:
- Sign up and log in using email + OTP verification
- Purchase courses via cart or direct buy
- Watch video lectures for purchased courses
- Track lesson completion with a progress bar
- Rate and review enrolled courses
- Update profile picture, personal details, and password
- Delete their own account

### Instructor
Everything a Student can do, plus:
- Create new courses (thumbnail, pricing, description, tags)
- Organize course content into Sections and Sub-sections (video lectures)
- Upload video files directly to the platform
- Publish courses or save them as drafts
- Edit and delete their own courses
- View a statistics dashboard (earnings chart, student enrollment per course)

### Admin *(Backend only — no UI dashboard yet)*
- Create and manage course categories (e.g., "Web Development", "Python")

---

## How It Works — Step by Step

### 1. Signing Up

```
Open StudyNotion → Click "Sign Up"
        ↓
Fill in: First Name, Last Name, Email, Password, Confirm Password
        ↓
Choose your role:  Student  OR  Instructor
        ↓
Click "Create Account"
→ A 6-digit OTP is sent to your email (valid for 10 minutes)
        ↓
Enter the OTP on the verification screen
        ↓
Account created! → You are redirected to the Login page
```

### 2. Logging In

```
Click "Log In" → Enter Email + Password → Click "Sign In"
        ↓
A secure session token (JWT) is saved in your browser
        ↓
You are redirected to your Dashboard
```

### 3. Browsing and Buying a Course (Student)

```
Click "Catalog" in the navbar → Choose a category
        ↓
Browse course cards → Click a course to see full details
(description, syllabus, instructor info, ratings, price)
        ↓
Click "Add to Cart"  OR  "Buy Now"
        ↓
[If "Add to Cart"]: Go to Cart → Review → Click "Buy Now"
        ↓
Payment is processed → Course is unlocked immediately
        ↓
A payment confirmation email is sent to your inbox
```

### 4. Watching a Course (Student)

```
Dashboard → "Enrolled Courses" → Click "View Course"
        ↓
Course viewer opens with a sidebar listing all Sections & Lectures
        ↓
Click any lecture → Video plays in the main area
        ↓
Completed lectures get a green checkmark automatically
        ↓
Progress bar shows overall course completion percentage
        ↓
After finishing: A popup lets you rate and review the course
```

### 5. Creating a Course (Instructor)

```
Dashboard → "Add Course" → A 3-step wizard opens:

STEP 1 — Course Information:
  → Course name, description, what students will learn
  → Price, category, tags
  → Upload a thumbnail image

STEP 2 — Course Builder:
  → Add Sections (e.g., "Module 1: Introduction")
  → Inside each Section, add Sub-sections (individual video lectures)
     → Each sub-section: title, description, uploaded video file

STEP 3 — Publish:
  → Click "Publish" to make it live for students
     OR "Save as Draft" to continue later
```

### 6. Resetting a Forgotten Password

```
Login page → Click "Forgot Password" → Enter your email
        ↓
A password reset link is sent to your inbox
        ↓
Click the link → Enter and confirm your new password
        ↓
Password updated → Redirected to Login
```

---

## Pages & Screens

| Page | URL | Who Sees It |
|---|---|---|
| Home | `/` | Everyone |
| Catalog | `/catalog/:category-name` | Everyone |
| Course Details | `/courses/:courseId` | Everyone |
| About Us | `/about` | Everyone |
| Contact Us | `/contact` | Everyone |
| Sign Up | `/signup` | Guests only |
| Log In | `/login` | Guests only |
| Verify Email (OTP) | `/verify-email` | Guests only (during signup) |
| Forgot Password | `/forgot-password` | Guests only |
| Reset Password | `/update-password/:token` | Guests only |
| My Profile | `/dashboard/my-profile` | All logged-in users |
| Settings | `/dashboard/settings` | All logged-in users |
| Cart | `/dashboard/cart` | Students only |
| Enrolled Courses | `/dashboard/enrolled-courses` | Students only |
| Course Viewer | `/view-course/:courseId/...` | Students (enrolled only) |
| Instructor Dashboard | `/dashboard/instructor` | Instructors only |
| Add Course | `/dashboard/add-course` | Instructors only |
| My Courses | `/dashboard/my-courses` | Instructors only |
| Edit Course | `/dashboard/edit-course/:courseId` | Instructors only |
| 404 Error | `*` (any invalid URL) | Everyone |

---

## Tech Stack

### Frontend (What you see in the browser)

| Technology | Purpose |
|---|---|
| **React 19** | Builds the interactive UI components |
| **Vite 6** | Fast development server and build tool |
| **TailwindCSS 4** | All the styling and layout |
| **Redux Toolkit** | App-wide state management (login status, cart, etc.) |
| **React Router v7** | Navigation between pages without full page reloads |
| **Axios** | Sends HTTP requests to the backend API |
| **React Hook Form** | Form handling, input validation |
| **React Hot Toast** | Success/error notification popups |
| **React Player** | Video playback for course lectures |
| **Chart.js** | Instructor earnings and stats bar chart |
| **Swiper** | Review carousel slider |
| **React OTP Input** | OTP entry UI during signup |
| **React Dropzone** | Drag-and-drop file uploads |

### Backend (The server that handles all logic)

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the server |
| **Express 5** | Framework for building the REST API |
| **MongoDB** | Database that stores all app data |
| **Mongoose 8** | Makes MongoDB easier to work with |
| **JWT** | Secure 30-day login sessions |
| **Bcryptjs** | Securely hashes passwords before storing |
| **Nodemailer** | Sends emails (OTP, enrollment, password reset) |
| **Cloudinary** | Cloud storage for images and videos |
| **Razorpay** | Payment gateway (demo mode by default) |
| **OTP Generator** | Generates secure 6-digit verification codes |

---

## Project Structure

```
StudyNotion-LMS/
│
├── src/                           ← Frontend (React)
│   ├── assets/                    ← Images, videos, logos
│   ├── components/
│   │   ├── Common/                ← Navbar, Footer, Modal, ReviewSlider
│   │   └── Core/
│   │       ├── Auth/              ← Route guards (OpenRoute, PrivateRoute)
│   │       ├── HomePage/          ← Homepage section components
│   │       ├── Catalog/           ← Course listing components
│   │       ├── Course/            ← Course details page components
│   │       ├── Dashboard/         ← All dashboard panels
│   │       └── ViewCourse/        ← Video player and sidebar
│   ├── data/                      ← Static data (navbar links, explore data)
│   ├── pages/                     ← Top-level page components
│   ├── redux/                     ← Global state (auth, cart, course, profile)
│   ├── services/
│   │   ├── apis.jsx               ← All API endpoint URLs in one place
│   │   └── operations/            ← Functions that call the backend API
│   └── utils/                     ← Helper functions and constants
│
├── Server/                        ← Backend (Node.js + Express)
│   ├── config/
│   │   ├── database.js            ← MongoDB connection
│   │   └── cloudinary.js          ← Cloudinary setup
│   ├── controllers/               ← Business logic per feature
│   │   ├── auth.js                ← Signup, login, OTP, change password
│   │   ├── ResetPassword.js       ← Forgot/reset password
│   │   ├── Profile.js             ← Profile management
│   │   ├── Course.js              ← Course CRUD
│   │   ├── Section.js             ← Course section CRUD
│   │   ├── SubSection.js          ← Lecture/video CRUD
│   │   ├── Category.js            ← Course categories
│   │   ├── RatingAndReviews.js    ← Ratings and reviews
│   │   ├── courseProgress.js      ← Track completed lectures
│   │   ├── Payment.js             ← Razorpay payment flow
│   │   └── ContactUs.js           ← Contact form handler
│   ├── middlewares/
│   │   └── auth.js                ← JWT verification, role checks
│   ├── models/                    ← MongoDB schemas
│   ├── routes/                    ← API route definitions
│   │   ├── User.js                ← /api/v1/auth/*
│   │   ├── Profile.js             ← /api/v1/profile/*
│   │   ├── Course.js              ← /api/v1/course/*
│   │   ├── Payment.js             ← /api/v1/payment/*
│   │   └── Contact.js             ← /api/v1/reach/*
│   ├── utils/
│   │   └── mailSender.js          ← Nodemailer email utility
│   ├── .env                       ← Secret credentials (never commit this file)
│   ├── index.js                   ← Server entry point
│   └── seed.js                    ← Script to populate sample data
│
├── package.json                   ← Root scripts (dev, build, start)
└── README.md                      ← This file
```

---

## Getting Started (Local Setup)

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher → [Download](https://nodejs.org)
- **MongoDB** (local) → [Download](https://www.mongodb.com/try/download/community) **or** use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)
- **A Gmail account** with an App Password (for sending emails)
- **A Cloudinary account** (free) → [Sign up](https://cloudinary.com)

---

### Step 1 — Clone the Repository

```bash
git clone <your-repo-url>
cd StudyNotion-LMS
```

### Step 2 — Install Dependencies

```bash
# Install frontend dependencies (from root folder)
npm install

# Install backend dependencies
cd Server
npm install
cd ..
```

### Step 3 — Configure Environment Variables

Create a file named `.env` inside the `Server/` folder and fill in your values (see [Environment Variables](#environment-variables) section).

### Step 4 — Seed Sample Data

This adds categories and sample courses so the site has content to display:

```bash
cd Server
node seed.js
cd ..
```

This creates:
- 5 categories: Web Development, Python, Data Science, Mobile Development, DevOps
- 6 published sample courses with sections and lectures
- 1 instructor account: `instructor@studynotion.com` / `Instructor@123`

### Step 5 — Run the App

```bash
npm run dev
```

This starts both frontend and backend simultaneously:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:4000`

Open your browser and go to `http://localhost:3000`

---

## Environment Variables

Create `Server/.env` with the following:

```env
# ── Server ────────────────────────────────────────────
PORT=4000
NODE_ENV=development

# ── Database ──────────────────────────────────────────
# Local MongoDB:
MONGODB_URL=mongodb://localhost:27017/studynotion
# MongoDB Atlas (cloud), replace with your connection string:
# MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/studynotion

# ── Authentication ────────────────────────────────────
# Any long random string — used to sign login tokens
JWT_SECRET=your_long_random_secret_here

# ── Cloudinary (Image & Video Storage) ───────────────
# Get these from https://cloudinary.com → Dashboard
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
FOLDER_NAME=StudyNotionContent

# ── Razorpay (Payments) ───────────────────────────────
# Get from https://razorpay.com → Settings → API Keys
# App works in demo mode without real keys
RAZORPAY_KEY=rzp_test_your_key
RAZORPAY_SECRET=rzp_test_your_secret

# ── Email (Gmail SMTP) ────────────────────────────────
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_gmail@gmail.com
# App Password (16 chars, NO spaces) — see instructions below
MAIL_PASS=abcdefghijklmnop
```

### How to Get a Gmail App Password

> Regular Gmail passwords do NOT work with SMTP. You must use an App Password.

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google" → enable **2-Step Verification**
4. After enabling, go back to Security and click **App passwords**
5. Type a name like `StudyNotion` → click **Create**
6. Copy the 16-character code shown → paste it into `MAIL_PASS` (without spaces)

---

## API Reference

All endpoints are prefixed with `/api/v1`.

### Authentication — `/api/v1/auth`

| Method | Endpoint | Description | Login Required |
|---|---|---|---|
| POST | `/sendotp` | Send OTP to email for signup | No |
| POST | `/signup` | Create a new Student or Instructor account | No |
| POST | `/login` | Log in and receive a JWT token | No |
| POST | `/changepassword` | Change password while logged in | Yes |
| POST | `/reset-password-token` | Request a password reset email | No |
| POST | `/reset-password` | Set a new password using reset link | No |

### Profile — `/api/v1/profile`

| Method | Endpoint | Description | Login Required |
|---|---|---|---|
| GET | `/getUserDetails` | Get current user's full profile | Yes |
| PUT | `/updateProfile` | Update personal info (bio, DOB, phone) | Yes |
| PUT | `/updateDisplayPicture` | Upload a new profile picture | Yes |
| GET | `/getEnrolledCourses` | Get all enrolled courses (Student) | Yes |
| GET | `/instructorDashboard` | Get earnings and stats (Instructor) | Yes (Instructor) |
| DELETE | `/deleteProfile` | Permanently delete account | Yes |

### Courses — `/api/v1/course`

| Method | Endpoint | Description | Login Required |
|---|---|---|---|
| GET | `/getAllCourses` | Get all published courses | No |
| POST | `/getCourseDetails` | Get details of one course | No |
| POST | `/getFullCourseDetails` | Get full course with video URLs | Yes (Enrolled) |
| POST | `/createCourse` | Create a new course | Yes (Instructor) |
| PUT | `/editCourse` | Update an existing course | Yes (Instructor) |
| DELETE | `/deleteCourse` | Delete a course | Yes (Instructor) |
| GET | `/getInstructorCourses` | Get all courses by logged-in instructor | Yes (Instructor) |
| POST | `/addSection` | Add a section to a course | Yes (Instructor) |
| PUT | `/updateSection` | Edit a section | Yes (Instructor) |
| DELETE | `/deleteSection` | Delete a section | Yes (Instructor) |
| POST | `/addSubSection` | Add a video lecture | Yes (Instructor) |
| PUT | `/updateSubSection` | Edit a video lecture | Yes (Instructor) |
| DELETE | `/deleteSubSection` | Delete a video lecture | Yes (Instructor) |
| GET | `/showAllCategories` | Get all categories | No |
| POST | `/getCategoryPageDetails` | Get courses for a category page | No |
| POST | `/createCategory` | Create a new category | Yes (Admin) |
| POST | `/updateCourseProgress` | Mark a lecture as completed | Yes (Student) |
| POST | `/createRating` | Submit a rating and review | Yes (Student) |
| GET | `/getReviews` | Get all ratings and reviews | No |

### Payments — `/api/v1/payment`

| Method | Endpoint | Description | Login Required |
|---|---|---|---|
| POST | `/capturePayment` | Initiate payment for course(s) | Yes (Student) |
| POST | `/verifyPayment` | Confirm payment and enroll student | Yes (Student) |
| POST | `/sendPaymentSuccessEmail` | Send payment confirmation email | Yes (Student) |

### Contact — `/api/v1/reach`

| Method | Endpoint | Description | Login Required |
|---|---|---|---|
| POST | `/contact` | Submit a contact form message | No |

---

## Database Models

### User
| Field | Type | Description |
|---|---|---|
| `firstName`, `lastName` | String | Full name |
| `email` | String | Unique email address |
| `password` | String | Bcrypt-hashed password |
| `accountType` | String | `"Student"`, `"Instructor"`, or `"Admin"` |
| `additionalDetails` | Profile ref | Link to profile document |
| `courses` | Course refs | Courses created or enrolled in |
| `image` | String | Profile picture URL |
| `token` | String | Password reset token |
| `resetPasswordExpiry` | Date | When the reset token expires |
| `courseProgress` | CourseProgress refs | Student's progress records |

### Course
| Field | Type | Description |
|---|---|---|
| `courseName` | String | Title of the course |
| `courseDescription` | String | Short description |
| `instructor` | User ref | The instructor who created it |
| `whatYouWillLearn` | String | Learning outcomes |
| `courseContent` | Section refs | Ordered list of sections |
| `price` | Number | Price in INR |
| `thumbnail` | String | Cover image URL (Cloudinary) |
| `category` | Category ref | The subject category |
| `tag` | String[] | Search/filter tags |
| `studentsEnrolled` | User refs | All enrolled students |
| `status` | String | `"Draft"` or `"Published"` |

### Section
| Field | Type | Description |
|---|---|---|
| `sectionName` | String | Chapter/module name |
| `subSection` | SubSection refs | Video lectures in this section |

### SubSection (Individual Lecture)
| Field | Type | Description |
|---|---|---|
| `title` | String | Lecture title |
| `timeDuration` | String | Length of the video |
| `description` | String | What this lecture covers |
| `videoUrl` | String | Cloudinary video URL |

### Category
| Field | Type | Description |
|---|---|---|
| `name` | String | e.g., "Web Development" |
| `description` | String | Short description |
| `courses` | Course refs | All courses in this category |

### OTP
| Field | Type | Description |
|---|---|---|
| `email` | String | Email the OTP was sent to |
| `otp` | String | The 6-digit code |
| `createdAt` | Date | **Auto-deleted after 10 minutes** |

### CourseProgress
| Field | Type | Description |
|---|---|---|
| `courseID` | Course ref | Which course this tracks |
| `userId` | User ref | Which student |
| `completedVideos` | SubSection refs | List of watched lectures |

---

## Payment Flow

StudyNotion uses **Razorpay** for payments. Currently in **demo mode** — no real money is charged.

```
Student clicks "Buy Now"
        ↓
POST /api/v1/payment/capturePayment
  → Validates course IDs
  → Checks student is not already enrolled
  → Returns a demo order object
        ↓
POST /api/v1/payment/verifyPayment
  → Enrolls the student in all purchased courses
  → Creates a CourseProgress record for each course
        ↓
POST /api/v1/payment/sendPaymentSuccessEmail
  → Sends "Payment Successful" email to the student
        ↓
Student is redirected to Enrolled Courses dashboard
```

**To enable real Razorpay payments:**
1. Add real keys to `.env` (`RAZORPAY_KEY`, `RAZORPAY_SECRET`)
2. In `capturePayment`, call `razorpay.orders.create()` instead of the mock
3. In `verifyPayment`, verify the `razorpay_signature` using HMAC-SHA256

---

## Email Notifications

The following emails are sent automatically:

| When | Email Content |
|---|---|
| New signup | 6-digit OTP code (expires in 10 minutes) |
| Forgot password | Password reset link |
| Course enrollment | Welcome and course access confirmation |
| Successful payment | Receipt with order ID, payment ID, and amount |
| Contact form submission | Message forwarded to the platform's email |

All emails are sent via **Gmail SMTP** using Nodemailer. An App Password is required — a regular Gmail password will not work.

---

## Deployment

| Component | Platform | URL |
|---|---|---|
| Frontend | Vercel | `https://study-notion-navy-seven.vercel.app` |
| Backend | Any Node.js host (Render, Railway, EC2) | Your custom domain |
| Database | MongoDB Atlas | Managed by MongoDB |
| Media Files | Cloudinary | `https://res.cloudinary.com/...` |

### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import the repository
3. Set **Root Directory** to `.` (the project root)
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `dist`
6. Click **Deploy**

### Deploy Backend

1. Deploy the `Server/` folder to a Node.js hosting service (e.g., [Render](https://render.com))
2. Add all `.env` variables in the host's environment settings panel
3. Update `BASE_URL` in `src/services/apis.jsx` to your deployed backend URL

---

## Known Limitations

| Area | Current State | What's Needed |
|---|---|---|
| Payments | Demo mode — no real charge | Enable Razorpay signature verification |
| Admin Panel | No UI — category creation is API-only | Build a dedicated admin dashboard |
| Search | No course search functionality | Add full-text search with filters |
| Footer links | Decorative placeholders (link to `#`) | Build or remove those pages |
| Video upload | No upload progress indicator | Add a progress bar for large video files |

---

## Author

**Aneesh Jain**

Built with React, Node.js, Express, MongoDB, TailwindCSS, Cloudinary, and Razorpay.

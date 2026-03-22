const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Category = require("./models/Category");
const Course = require("./models/Course");
const User = require("./models/User");
const Section = require("./models/Section");
const SubSection = require("./models/SubSection");
const Profile = require("./models/Profile");
const bcrypt = require("bcryptjs");

const MONGODB_URL = process.env.MONGODB_URL;

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connected for seeding...");

    // Create a profile for the instructor
    const profile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: "Experienced full-stack developer and educator",
      phoneNumber: null,
    });

    // Create an instructor user
    const hashedPassword = await bcrypt.hash("Instructor@123", 10);
    let instructor = await User.findOne({ email: "instructor@studynotion.com" });
    if (!instructor) {
      instructor = await User.create({
        firstName: "Study",
        lastName: "Notion",
        email: "instructor@studynotion.com",
        password: hashedPassword,
        accountType: "Instructor",
        additionalDetails: profile._id,
        image: "https://api.dicebear.com/5.x/initials/svg?seed=SN",
        courses: [],
        courseProgress: [],
      });
      console.log("Instructor created: instructor@studynotion.com / Instructor@123");
    } else {
      console.log("Instructor already exists, reusing...");
    }

    // Define categories
    const categoryData = [
      { name: "Web Development", description: "Learn to build modern websites and web applications" },
      { name: "Python", description: "Master Python programming from basics to advanced" },
      { name: "Data Science", description: "Explore data analysis, visualization and machine learning" },
      { name: "Mobile Development", description: "Build mobile apps for Android and iOS" },
      { name: "DevOps", description: "Learn CI/CD, Docker, Kubernetes and cloud deployment" },
    ];

    const categories = [];
    for (const cat of categoryData) {
      let existing = await Category.findOne({ name: cat.name });
      if (!existing) {
        existing = await Category.create({ name: cat.name, description: cat.description, courses: [] });
      }
      categories.push(existing);
    }
    console.log(`${categories.length} categories ready.`);

    // Define courses with sections
    const coursesData = [
      {
        courseName: "Complete Web Development Bootcamp",
        courseDescription: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
        whatYouWillLearn: "Build responsive websites\nMaster React and Node.js\nWork with databases\nDeploy applications",
        price: 499,
        tag: ["Web Development", "Full Stack", "JavaScript"],
        instructions: ["Basic computer knowledge", "No prior coding experience needed"],
        categoryIndex: 0,
        sections: [
          { name: "HTML & CSS Fundamentals", subs: [{ title: "Introduction to HTML", timeDuration: "12:30", description: "Learn the basics of HTML structure" }, { title: "CSS Styling", timeDuration: "15:00", description: "Style your web pages with CSS" }] },
          { name: "JavaScript Essentials", subs: [{ title: "Variables and Data Types", timeDuration: "18:00", description: "Understanding JS fundamentals" }, { title: "Functions and Scope", timeDuration: "20:00", description: "Deep dive into functions" }] },
        ],
      },
      {
        courseName: "React - The Complete Guide",
        courseDescription: "Master React.js including Hooks, Redux, React Router, and Next.js from scratch.",
        whatYouWillLearn: "Build powerful React apps\nState management with Redux\nRouting with React Router\nServer-side rendering with Next.js",
        price: 599,
        tag: ["React", "Frontend", "JavaScript"],
        instructions: ["Basic JavaScript knowledge", "Understanding of HTML/CSS"],
        categoryIndex: 0,
        sections: [
          { name: "React Basics", subs: [{ title: "Components and JSX", timeDuration: "14:00", description: "Learn about React components" }, { title: "Props and State", timeDuration: "22:00", description: "Manage data in React" }] },
          { name: "Advanced React", subs: [{ title: "React Hooks", timeDuration: "25:00", description: "Modern React with hooks" }, { title: "Context API", timeDuration: "18:00", description: "Global state management" }] },
        ],
      },
      {
        courseName: "Python for Beginners",
        courseDescription: "Start your programming journey with Python. Learn the fundamentals and build real projects.",
        whatYouWillLearn: "Python syntax and data structures\nObject-oriented programming\nFile handling\nBasic automation scripts",
        price: 399,
        tag: ["Python", "Programming", "Beginner"],
        instructions: ["No prior experience needed", "A computer with internet"],
        categoryIndex: 1,
        sections: [
          { name: "Getting Started", subs: [{ title: "Installing Python", timeDuration: "8:00", description: "Set up your development environment" }, { title: "Your First Program", timeDuration: "10:00", description: "Write Hello World and more" }] },
          { name: "Data Structures", subs: [{ title: "Lists and Tuples", timeDuration: "20:00", description: "Working with sequences" }, { title: "Dictionaries and Sets", timeDuration: "18:00", description: "Key-value pairs and unique collections" }] },
        ],
      },
      {
        courseName: "Data Science with Python",
        courseDescription: "Learn data analysis, visualization, and machine learning using Python, Pandas, and Scikit-learn.",
        whatYouWillLearn: "Data analysis with Pandas\nData visualization with Matplotlib\nMachine learning basics\nReal-world projects",
        price: 699,
        tag: ["Data Science", "Python", "Machine Learning"],
        instructions: ["Basic Python knowledge", "High school math"],
        categoryIndex: 2,
        sections: [
          { name: "Data Analysis", subs: [{ title: "Pandas Basics", timeDuration: "22:00", description: "DataFrames and Series" }, { title: "Data Cleaning", timeDuration: "25:00", description: "Handle missing data and outliers" }] },
          { name: "Machine Learning", subs: [{ title: "Linear Regression", timeDuration: "30:00", description: "Your first ML model" }, { title: "Classification", timeDuration: "28:00", description: "Predict categories with ML" }] },
        ],
      },
      {
        courseName: "React Native - Build Mobile Apps",
        courseDescription: "Build cross-platform mobile applications using React Native and JavaScript.",
        whatYouWillLearn: "React Native fundamentals\nNavigation and routing\nNative device features\nPublish to App Store and Play Store",
        price: 549,
        tag: ["Mobile", "React Native", "JavaScript"],
        instructions: ["React.js knowledge recommended", "A Mac for iOS development (optional)"],
        categoryIndex: 3,
        sections: [
          { name: "React Native Basics", subs: [{ title: "Setting Up", timeDuration: "15:00", description: "Install and configure React Native" }, { title: "Core Components", timeDuration: "20:00", description: "View, Text, Image and more" }] },
        ],
      },
      {
        courseName: "Docker & Kubernetes Masterclass",
        courseDescription: "Learn containerization with Docker and orchestration with Kubernetes for modern deployments.",
        whatYouWillLearn: "Docker containers and images\nDocker Compose\nKubernetes pods and services\nCI/CD pipelines",
        price: 799,
        tag: ["DevOps", "Docker", "Kubernetes"],
        instructions: ["Basic Linux command line", "Understanding of web applications"],
        categoryIndex: 4,
        sections: [
          { name: "Docker Fundamentals", subs: [{ title: "What is Docker?", timeDuration: "10:00", description: "Understanding containers" }, { title: "Building Images", timeDuration: "18:00", description: "Create custom Docker images" }] },
          { name: "Kubernetes", subs: [{ title: "Pods and Deployments", timeDuration: "25:00", description: "Core Kubernetes concepts" }] },
        ],
      },
    ];

    for (const courseData of coursesData) {
      const existing = await Course.findOne({ courseName: courseData.courseName });
      if (existing) {
        console.log(`Course "${courseData.courseName}" already exists, skipping.`);
        continue;
      }

      // Create sections and subsections
      const sectionIds = [];
      for (const sec of courseData.sections) {
        const subSectionIds = [];
        for (const sub of sec.subs) {
          const subSection = await SubSection.create({
            title: sub.title,
            timeDuration: sub.timeDuration,
            description: sub.description,
            videoUrl: "",
          });
          subSectionIds.push(subSection._id);
        }
        const section = await Section.create({
          sectionName: sec.name,
          subSection: subSectionIds,
        });
        sectionIds.push(section._id);
      }

      // Create course
      const course = await Course.create({
        courseName: courseData.courseName,
        courseDescription: courseData.courseDescription,
        instructor: instructor._id,
        whatYouWillLearn: courseData.whatYouWillLearn,
        courseContent: sectionIds,
        price: courseData.price,
        thumbnail: "https://via.placeholder.com/400x250?text=" + encodeURIComponent(courseData.courseName),
        category: categories[courseData.categoryIndex]._id,
        tag: courseData.tag,
        instructions: courseData.instructions,
        status: "Published",
        studentsEnrolled: [],
        ratingAndReviews: [],
      });

      // Add course to category
      await Category.findByIdAndUpdate(categories[courseData.categoryIndex]._id, {
        $push: { courses: course._id },
      });

      // Add course to instructor
      await User.findByIdAndUpdate(instructor._id, {
        $push: { courses: course._id },
      });

      console.log(`Course created: "${courseData.courseName}"`);
    }

    console.log("\nSeeding completed successfully!");
    console.log("Instructor login: instructor@studynotion.com / Instructor@123");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const https = require("https");
const fs = require("fs");
const path = require("path");
dotenv.config();

const Course = require("./models/Course");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const colors = ["2d3436", "0984e3", "6c5ce7", "00b894", "e17055", "fdcb6e"];
const courseThumbnails = [
  { name: "Complete Web Development Bootcamp", text: "Web Dev Bootcamp", color: colors[0] },
  { name: "React - The Complete Guide", text: "React Complete Guide", color: colors[1] },
  { name: "Python for Beginners", text: "Python Beginners", color: colors[2] },
  { name: "Data Science with Python", text: "Data Science Python", color: colors[3] },
  { name: "React Native - Build Mobile Apps", text: "React Native Apps", color: colors[4] },
  { name: "Docker & Kubernetes Masterclass", text: "Docker Kubernetes", color: colors[5] },
];

const fixThumbnails = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database...");

    for (const course of courseThumbnails) {
      const url = `https://placehold.co/400x250/${course.color}/ffffff/png?text=${encodeURIComponent(course.text)}&font=roboto`;

      // Download image to temp file
      const tempFile = path.join(__dirname, `temp_${Date.now()}.png`);
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(tempFile);
        https.get(url, (response) => {
          if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            https.get(response.headers.location, (res2) => {
              res2.pipe(file);
              file.on("finish", () => { file.close(); resolve(); });
            }).on("error", reject);
          } else {
            response.pipe(file);
            file.on("finish", () => { file.close(); resolve(); });
          }
        }).on("error", reject);
      });

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(tempFile, {
        folder: process.env.FOLDER_NAME || "StudyNotionContent",
      });
      fs.unlinkSync(tempFile);

      // Update course
      await Course.findOneAndUpdate(
        { courseName: course.name },
        { thumbnail: result.secure_url }
      );
      console.log(`Updated: ${course.name} -> ${result.secure_url}`);
    }

    console.log("\nAll thumbnails uploaded to Cloudinary and updated!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

fixThumbnails();

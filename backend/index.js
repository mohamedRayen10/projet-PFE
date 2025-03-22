import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import paymentRoutes from './routes/payment.route.js'; // Import payment routes

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect("mongodb+srv://rayentoujani02:ANrd1mRDBzTIW7zf@cluster0.2qkc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB is Connected!'))
  .catch(err => console.log(err));

// Define routes
app.use("/backend/user", userRoutes);
app.use("/backend/auth", authRoutes);
app.use("/backend/post", postRoutes);
app.use("/backend/comment", commentRoutes);
app.use("/backend/payment", paymentRoutes); // Add the payment routes

// Serve static files for frontend
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.get('/', (req, res) => {
  res.send("Hello from Node API server!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/conn");
const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

// Define an asynchronous function to start the server after connecting to MongoDB
const startServer = async () => {
  try {
    await connectDB.connectToServer();

    // Use your routes
    app.use("/api/users", usersRoutes);
    app.use("/api/tasks", tasksRoutes);
    app.use("/api/auth", authRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Call the asynchronous function to start the server
startServer();

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

app.use(cors());
app.use(express.json());

let server;

const startServer = async () => {
  try {
    await connectDB.connectToServer();

    app.use("/api/users", usersRoutes);
    app.use("/api/tasks", tasksRoutes);
    app.use("/api/auth", authRoutes);

    server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

    console.log("Successfully connected to MongoDB.");

    // Return a function to gracefully shut down the server
    return () => {
      console.log("Closing server...");
      server.close();
    };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// If this is the main entry point of your application, you might want to conditionally start the server
if (require.main === module) {
  startServer();
}

// Export both app and startServer function
module.exports = { app, startServer };

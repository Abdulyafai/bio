// server.js
const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Login route
app.post("/login", async (req, res) => {
  const { password } = req.body;

  try {
    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, process.env.HASHED_PASSWORD);

    if (match) {
      req.session.authenticated = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Protected content route
app.get("/content", (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(path.join(__dirname, "public", "protected-content.html"));
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).json({ success: false, message: "Error during logout" });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

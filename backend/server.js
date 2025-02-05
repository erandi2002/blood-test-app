const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON requests

// PostgreSQL Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Configure Multer for file uploads (Stores in 'uploads' folder)
const upload = multer({ dest: "uploads/" });

// ✅ API: Upload & Extract Text
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully!", file: req.file });
});

// ✅ API: Save Extracted Data to Database
app.post("/save-report", async (req, res) => {
  const { userId, extractedText } = req.body;

  if (!userId || !extractedText) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO reports (user_id, extracted_text) VALUES ($1, $2) RETURNING *",
      [userId, extractedText]
    );
    res.json({ message: "Report saved successfully!", report: result.rows[0] });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

// ✅ API: Get All Reports
app.get("/reports", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reports");
    res.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to fetch reports." });
  }
});

// ✅ API: Get Reports by User ID
app.get("/reports/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM reports WHERE user_id = $1", [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to fetch user reports." });
  }
});

// ✅ API: Delete a Report by ID
app.delete("/reports/:reportId", async (req, res) => {
  const { reportId } = req.params;

  try {
    await pool.query("DELETE FROM reports WHERE id = $1", [reportId]);
    res.json({ message: "Report deleted successfully!" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to delete report." });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

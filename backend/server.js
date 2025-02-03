const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());  // Allows frontend to communicate with backend
app.use(express.json());  // Parses JSON data from requests

// Configure Multer for file uploads (stores files in "uploads" folder)
const upload = multer({ dest: "uploads/" });

// Endpoint to upload files
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully!", file: req.file });
});

// Start server on port 5000
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

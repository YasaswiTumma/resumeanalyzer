const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Storage for uploaded resumes
const upload = multer({ dest: 'uploads/' });

console.log("✅ Starting backend...");

app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // 🔗 Replace this with actual Gemini API call
    console.log("📄 Resume content:");
    console.log(fileContent);

    // Simulated response
    const mockAnalysis = {
      summary: "This resume contains experience in frontend development and machine learning.",
      keywords: ["JavaScript", "React", "Machine Learning"],
      recommendation: "Consider tailoring your resume for backend development roles."
    };

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({ success: true, analysis: mockAnalysis });
  } catch (error) {
    console.error("❌ Error uploading:", error);
    res.status(500).json({ success: false, message: 'Error uploading resume' });
  }
});

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
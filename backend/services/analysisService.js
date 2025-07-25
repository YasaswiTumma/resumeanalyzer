const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function parsePDF(buffer) {
  const data = await pdfParse(buffer);
  return data.text;
}

async function analyzeResume(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    You are a career expert. Convert the below resume text into JSON:
    Resume:
    """
    ${text}
    """
    JSON Format:
    {
      "name": "",
      "email": "",
      "phone": "",
      "linkedin_url": "",
      "portfolio_url": "",
      "summary": "",
      "work_experience": [{"role": "", "company": "", "duration": "", "description": [""]}],
      "education": [{"degree": "", "institution": "", "graduation_year": ""}],
      "technical_skills": [""],
      "soft_skills": [""],
      "resume_rating": 0,
      "improvement_areas": "",
      "upskill_suggestions": [""]
    }
  `;

  const result = await model.generateContent(prompt);
  const textResponse = await result.response.text();
  return JSON.parse(textResponse); // Make sure response is valid JSON
}

module.exports = { parsePDF, analyzeResume };
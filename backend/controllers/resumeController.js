const pool = require('../db');
const { parsePDF, analyzeResume } = require('../services/analysisService');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const pdfText = await parsePDF(req.file.buffer);
    const analysis = await analyzeResume(pdfText);

    const query = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills,
        resume_rating, improvement_areas, upskill_suggestions
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`;

    const values = [
      req.file.originalname,
      analysis.name,
      analysis.email,
      analysis.phone,
      analysis.linkedin_url,
      analysis.portfolio_url,
      analysis.summary,
      JSON.stringify(analysis.work_experience),
      JSON.stringify(analysis.education),
      JSON.stringify(analysis.technical_skills),
      JSON.stringify(analysis.soft_skills),
      analysis.resume_rating,
      analysis.improvement_areas,
      JSON.stringify(analysis.upskill_suggestions)
    ];

    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to process resume' });
  }
};

exports.getAllResumes = async (req, res) => {
  const result = await pool.query('SELECT id, name, email, file_name FROM resumes ORDER BY uploaded_at DESC');
  res.json(result.rows);
};

exports.getResumeById = async (req, res) => {
  const result = await pool.query('SELECT * FROM resumes WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
};
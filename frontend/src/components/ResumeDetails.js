import React from 'react';

function ResumeDetails({ data }) {
  return (
    <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
      <h3>Resume Analysis</h3>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <p><strong>Rating:</strong> {data.resume_rating}/10</p>
      <p><strong>Summary:</strong> {data.summary}</p>
      <p><strong>Improvement Areas:</strong> {data.improvement_areas}</p>

      <h4>Technical Skills</h4>
      <ul>{data.technical_skills?.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h4>Soft Skills</h4>
      <ul>{data.soft_skills?.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h4>Work Experience</h4>
      {data.work_experience?.map((job, i) => (
        <div key={i}>
          <p>{job.role} at {job.company} ({job.duration})</p>
          <ul>{job.description?.map((d, j) => <li key={j}>{d}</li>)}</ul>
        </div>
      ))}

      <h4>Education</h4>
      {data.education?.map((edu, i) => (
        <p key={i}>{edu.degree} - {edu.institution} ({edu.graduation_year})</p>
      ))}

      <h4>Upskill Suggestions</h4>
      <ul>{data.upskill_suggestions?.map((s, i) => <li key={i}>{s}</li>)}</ul>
    </div>
  );
}

export default ResumeDetails;
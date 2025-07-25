import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resume, setResume] = useState(null);
  const [response, setResponse] = useState("");

  const handleUpload = async () => {
    if (!resume) return alert("Please select a resume file");

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      setResponse("Server Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Resume Analyzer</h2>
      <input type="file" onChange={(e) => setResume(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
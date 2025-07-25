import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResumeDetails from './ResumeDetails';

function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/resumes')
      .then(res => setResumes(res.data))
      .catch(err => console.error(err));
  }, []);

  const viewDetails = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/resumes/${id}`);
    setSelected(res.data);
  };

  return (
    <div>
      <h2>Historical Resumes</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>File</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.file_name}</td>
              <td><button onClick={() => viewDetails(r.id)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div style={{ marginTop: '20px', background: '#eee', padding: '10px' }}>
          <ResumeDetails data={selected} />
        </div>
      )}
    </div>
  );
}

export default PastResumesTable;

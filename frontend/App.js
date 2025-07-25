import React, { useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';

function App() {
  const [tab, setTab] = useState('upload');

  return (
    <div className="App">
      <h1>Resume Analyzer</h1>
      <button onClick={() => setTab('upload')}>Live Resume Analysis</button>
      <button onClick={() => setTab('history')}>Historical Viewer</button>

      {tab === 'upload' && <ResumeUploader />}
      {tab === 'history' && <PastResumesTable />}
    </div>
  );
}

export default App;
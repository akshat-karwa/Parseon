import React, { useState } from 'react';

const Upload = ({ user }) => {
  const [file, setFile] = useState(null);
  const [limit, setLimit] = useState(5);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF file');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('limit', limit);

    try {
      const res = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data.extracted);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user.displayName || user.email}</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        placeholder="Max # of key data points"
        min="1"
        style={{ margin: '1rem' }}
      />
      <button onClick={handleUpload}>Upload & Parse</button>
      {result && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>Extracted Data:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;

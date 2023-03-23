import React from 'react';
import FileUpload from './FileUpload';

const App: React.FC = () => {
  const handleFileUpload = (file: File) => {
    console.log('Selected file:', file);
    // Do something with the selected file
  };

  return (
    <div>
      <h1>File Upload</h1>
      <button onClick={() => console.log('Upload file')}>Upload file</button>
    </div>
  );
};

export default App;

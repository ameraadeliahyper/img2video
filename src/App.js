// src/App.js
import React, { useState } from 'react';
import Form from './components/Form';
import Processing from './components/Processing';
import Result from './components/Result';

function App() {
  const [status, setStatus] = useState('idle'); // 'idle', 'processing', 'done'
  const [elapsedTime, setElapsedTime] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFormSubmit = async ({ image, prompt, duration, aspectRatio, negativePrompt }) => {
    setStatus('processing');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('prompt', prompt);
    formData.append('duration', duration);
    formData.append('aspectRatio', aspectRatio);
    formData.append('negativePrompt', negativePrompt);

    const startTime = Date.now();
    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors', // This will limit the response
    });
  
    if (response.ok) {
      const data = await response.json();
      const endTime = Date.now();
      setElapsedTime((endTime - startTime) / 1000);
      setVideoUrl(data.videoUrl);
      setStatus('done');
    } else {
      console.error('Error generating video');
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#202021] flex items-center justify-center">
      <div className="max-w-3xl w-full p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-300 ">Image to Video PRO</h2>
        {status === 'idle' && <Form onSubmit={handleFormSubmit} />}
        {status === 'processing' && <Processing elapsedTime={elapsedTime} />}
        {status === 'done' && <Result videoUrl={videoUrl} />}
    
      </div>
    </div>
  );
}

export default App;

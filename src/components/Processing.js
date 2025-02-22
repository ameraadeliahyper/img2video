import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from './dot-loader.json'; // Pastikan jalur ini benar

const Processing = ({ imagePreview, onCancel }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    // Generate random time between 10 and 15 minutes in seconds
    const randomTime = Math.floor(Math.random() * (15 - 10 + 1) + 10) * 60;
    setRemainingTime(randomTime);

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          setIsGenerating(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleCancel = () => {
    setIsCancelling(true);
    onCancel(); // Panggil fungsi onCancel yang diberikan oleh parent
  };

  return (
    
    <div className="relative max-w-md mx-auto p-6 rounded-xl flex justify-around shadow appearance-none rounded w-full py-2 px-3 text-gray-300 text-xs bg-[#151515]"
      style={{
        backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: imagePreview ? '0.5' : '1',
      }}
    >
      
      <div className="absolute inset-0 "></div>
      
      
      <div className="relative">
        {isGenerating ? (
          <div>
            
            <h2 className="block text-gray-300 text-xs font-light mb-5">
              Generating... Estimated wait time: {formatTime(remainingTime)}
            </h2>
            <div className="flex justify-center mb-4"> {/* Tambahkan kelas flex dan justify-center */}
            <Lottie animationData={loadingAnimation} style={{ height: 100, width: 100 }} />
            </div>
            {!isCancelling ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outlinee"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              
            ) : (
              <p className="text-gray-300 text-xs ">Cancelling...</p>
            )}
          </div>
          
        ) : (
          <h2 className="block text-gray-300 text-sm font-bold mb-2">Generation Complete!</h2>
        )}
      </div>
      </div>
    
  );
};

export default Processing;

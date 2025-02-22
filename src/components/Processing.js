import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from './dot-loader.json'; // Pastikan jalur ini benar

const Processing = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Generate random time between 10 and 15 minutes in seconds
    const randomTime = Math.floor(Math.random() * (15 - 10 + 1) + 10) * 60;
    setRemainingTime(randomTime);

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsGenerating(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes} minutes ${secs} seconds`;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#151515] rounded-xl">
      <h2 className="block text-gray-300 text-xs font-light mb-2">
        {isGenerating ? `Generating... Estimated wait time: ${formatTime(remainingTime)}` : 'Generation complete!'}
      </h2>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Processing;
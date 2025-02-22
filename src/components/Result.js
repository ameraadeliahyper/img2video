// src/components/Result.js
import React from 'react';

const Result = ({ videoUrl }) => {
  return (
    <div className="max-w-md mx-auto p-10 bg-[#151515] rounded-xl">
      <video controls className="w-full mb-4">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-center mb-4"> {/* Tambahkan kelas flex dan justify-center */}
      <a
        href={videoUrl}
        download
        className="bg-stone-800 hover:bg-stone-950 text-white text-sm font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline"
      >
        Download Video
      </a>
      </div>
      
    </div>
  );
};

export default Result;
import React, { useState, useRef } from 'react';
import Lottie from 'lottie-react';
import uploadAnimation from './upload.json'; // Ganti dengan jalur yang benar
// import Processing from './Processing'; // Pastikan jalur ini benar
const Form = ({ onSubmit }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [negativePrompt, setNegativePrompt] = useState('');
  const fileInputRef = useRef(null);
  
  
  // const handleCancel = () => {
  //   // Logika untuk kembali ke form atau reset state
  //   // Misalnya, mengatur state untuk menampilkan form lagi
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi: Pastikan ada gambar yang diunggah
    if (!image) {
      alert("Please upload a photo before generating.");
      return;
    }
    onSubmit({ image, prompt, duration, aspectRatio, negativePrompt });
  };

  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };

  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-[#151515] rounded-xl  ">
      <div className="mb-4">
  <label className="block text-gray-300 text-xs font-light mb-2" htmlFor="image">
    Upload Media
  </label>
  <div
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-[#202021]  leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
    style={{
      minHeight: imagePreview ? '700px' : '200px', // Minimum height saat belum ada gambar
      backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: imagePreview ? 'none' : '1px solid #4f4848', // Border hanya saat belum ada gambar
    }}
    onClick={() => fileInputRef.current.click()} // Memungkinkan klik untuk memilih file
  >
    {imagePreview ? null : (
          <div className="flex flex-col items-center justify-center h-full pt-15"> 
          <p className="-mb-5 mt-5 text-gray-400 text-xs font-bold">Click/Drop to Upload</p> 
            <Lottie animationData={uploadAnimation} loop={true} style={{ width: 200, height: 200 }} />
            <p className="-mt-20 text-gray-400 text-xs">JPG / PNG files up to 10MB</p>
          </div>
        )}
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: 'none' }} // Sembunyikan input file
    />
  </div>
</div>
      <div className="mb-4">
        <label className="block text-gray-300 text-xs font-light mb-2" htmlFor="prompt">
          Positive prompt (recomended)
        </label>
        <textarea
          className="text-xs shadow appearance-none rounded w-full py-2 px-3 text-gray-300 bg-[#202021] leading-tight focus:outline-none focus:shadow-outline"
          id="prompt"
          rows="5"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-xs font-light mb-2" htmlFor="negativePrompt">
          Negative prompt (opsional)
        </label>
        <textarea
          className="text-xs shadow appearance-none rounded w-full py-1 px-2 text-gray-300 bg-[#202021] leading-tight focus:outline-none focus:shadow-outline"
          id="negativePrompt"
          rows="2"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />
      </div>
      <div className="flex justify-between mb-4"> {/* Tambahkan flex dan justify-between */}
  <div className="w-1/2 pr-1 pt-2 pb-2 -mr-2 "> {/* Kolom untuk Duration */}
    <label className="flex justify-around block text-gray-300 text-xs font-light mb-2">Duration</label>
    <div className="flex justify-around mt-4 flex items-center text-gray-300 text-xs">
      <label className="mr-4">
        <input
          type="radio"
          value={5}
          checked={duration === 5}
          onChange={() => setDuration(5)}
        />
        5s
      </label>
      <label>
        <input
          type="radio"
          value={10}
          checked={duration === 10}
          onChange={() => setDuration(10)}
        />
        10s
      </label>
    </div>
  </div>
  
  <div className=" w-1/2 pl-1 pt-2 pb-2"> {/* Kolom untuk Aspect Ratio */}
    <label className="flex justify-around block text-gray-300 text-xs font-light mb-2" htmlFor="aspectRatio">
      Aspect Ratio
    </label>
    <select
      className="flex justify-around shadow appearance-none rounded w-full py-2 px-3 text-gray-300 text-xs bg-[#202021] leading-tight focus:outline-none focus:shadow-outline"
      id="aspectRatio"
      value={aspectRatio}
      onChange={(e) => setAspectRatio(e.target.value)}
    >
      <option value="16:9">16:9</option>
      <option value="9:16">9:16</option>
      <option value="1:1">1:1</option>
    </select>
  </div>
</div>
      <div className="flex justify-center mb-4"> {/* Tambahkan kelas flex dan justify-center */}
  <button
    className="bg-stone-800 hover:bg-stone-950 text-white text-sm font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    Generate
  </button>
</div>
    </form>
  );
};

export default Form;
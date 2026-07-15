import { useState } from "react";

function UploadForm({ onImageUpload, onImageRemove, isAnalyzing }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      // Pass the file and preview to parent component
      onImageUpload(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    onImageRemove();
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div
        className={`
          relative
          border-2
          border-dashed
          rounded-2xl
          p-8
          transition-all
          duration-300
          cursor-pointer
          ${isDragging 
            ? 'border-[#088395] bg-[#088395]/10 scale-102' 
            : 'border-gray-300 hover:border-[#088395] hover:bg-white/20'
          }
          ${preview ? 'border-solid border-[#088395]' : ''}
          ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedFile && !isAnalyzing && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isAnalyzing}
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-xl shadow-lg object-contain"
            />
            {!isAnalyzing && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="
                  absolute
                  top-2
                  right-2
                  bg-red-500
                  text-white
                  p-2
                  rounded-full
                  hover:bg-red-600
                  transition-colors
                  shadow-lg
                  z-10
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="
                w-16
                h-16
                bg-gradient-to-br
                from-[#088395]/20
                to-[#37B7C3]/20
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
              ">
                <svg 
                  className="w-8 h-8 text-[#088395]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </div>
            </div>

            <p className="text-gray-700 font-medium mb-2">
              {isDragging ? 'Drop your image here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, WEBP (Max 10MB)
            </p>
          </div>
        )}
      </div>

      {/* File info */}
      {selectedFile && !isAnalyzing && (
        <div className="text-sm text-gray-600 text-center">
          Selected: {selectedFile.name}
        </div>
      )}
    </div>
  );
}

export default UploadForm;
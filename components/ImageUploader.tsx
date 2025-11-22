import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Heart } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div 
      className={`
        w-full max-w-2xl mx-auto h-80 
        border-4 border-dashed rounded-3xl 
        flex flex-col items-center justify-center 
        transition-all duration-300 cursor-pointer group
        relative overflow-hidden
        ${isDragging 
          ? 'border-pink-400 bg-pink-900/20 scale-105 shadow-[0_0_30px_rgba(255,20,147,0.4)]' 
          : 'border-pink-500/30 bg-geek-panel/40 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(255,20,147,0.2)]'
        }
      `}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input 
        type="file" 
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />
      
      <div className="z-10 flex flex-col items-center text-center p-6 space-y-4">
        <div className={`
          w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 
          flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform
        `}>
          {isDragging ? <Heart className="w-10 h-10 text-white animate-pulse" /> : <Upload className="w-10 h-10 text-white" />}
        </div>
        
        <h3 className="text-2xl font-bold font-future text-pink-200">
          {isDragging ? 'DROP IT LIKE IT\'S HOT!' : 'Upload ta photo de style'}
        </h3>
        
        <p className="text-pink-300/70 font-geek text-lg max-w-md">
          Glisse une image ici ou clique pour explorer tes fichiers.
          <br/>
          <span className="text-xs text-purple-300 opacity-60 mt-2 block">Compatible JPG, PNG, WEBP</span>
        </p>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 left-10 text-pink-500 text-4xl font-geek">010101</div>
         <div className="absolute bottom-10 right-10 text-purple-500 text-4xl font-geek">101010</div>
      </div>
    </div>
  );
};

export default ImageUploader;
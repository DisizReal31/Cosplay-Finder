import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 flex justify-center items-center relative overflow-hidden border-b border-pink-500/30 bg-geek-panel/50 backdrop-blur-sm z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      
      <div className="flex items-center gap-3 relative z-10">
        <Sparkles className="w-8 h-8 text-pink-400 animate-spin-slow" />
        <h1 className="text-4xl md:text-5xl font-geek text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-pink-400 drop-shadow-[0_0_10px_rgba(255,20,147,0.5)]">
          COSPLAY FINDER
        </h1>
        <Sparkles className="w-8 h-8 text-pink-400 animate-spin-slow" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
    </header>
  );
};

export default Header;
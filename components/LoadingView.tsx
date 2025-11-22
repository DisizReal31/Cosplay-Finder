import React from 'react';
import { Cpu, ScanLine } from 'lucide-react';

const LoadingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-96 text-center space-y-8 relative">
      {/* Scanner Effect */}
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-4 border-pink-500 rounded-lg opacity-50"></div>
        <div className="absolute inset-0 border-t-4 border-geek-accent animate-scan rounded-lg shadow-[0_0_15px_#00ff9d]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <Cpu className="w-16 h-16 text-pink-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-geek text-geek-accent animate-pulse">
          ANALYSE EN COURS...
        </h2>
        <p className="text-pink-300 font-body text-lg">
          Gemini scanne les pixels à la recherche de pépites...
        </p>
      </div>

      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" 
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      
      {/* Pseudo-code output for geek effect */}
      <div className="absolute bottom-0 font-geek text-xs text-pink-500/30 w-full overflow-hidden whitespace-nowrap">
        scanning_vectors... identifying_fabrics... matching_patterns... querying_database...
      </div>
    </div>
  );
};

export default LoadingView;
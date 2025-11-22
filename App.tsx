import React, { useState } from 'react';
import { IdentifiedItem, AppState } from './types';
import { analyzeFashionImage } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import LoadingView from './components/LoadingView';
import ItemCard from './components/ItemCard';
import { RefreshCw, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [items, setItems] = useState<IdentifiedItem[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    setCurrentImage(base64);
    setAppState(AppState.ANALYZING);
    setErrorMessage(null);

    try {
      const identifiedItems = await analyzeFashionImage(base64);
      setItems(identifiedItems);
      setAppState(AppState.RESULTS);
    } catch (error) {
      setAppState(AppState.ERROR);
      setErrorMessage("Oups ! Gemini a trébuché sur un pixel. Réessaie ou change d'image.");
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setItems([]);
    setCurrentImage(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0518] text-pink-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0f0518] to-[#0f0518]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        
        {appState === AppState.IDLE && (
          <div className="w-full animate-fade-in-up">
             <div className="text-center mb-12 space-y-4">
               <h2 className="text-3xl md:text-4xl font-future text-white drop-shadow-lg">
                 Trouve ton <span className="text-pink-500">Cosplay</span>
               </h2>
               <p className="text-lg text-purple-200/80 max-w-xl mx-auto font-body">
                 L'outil ultime pour les <span className="font-geek text-geek-accent">geeks & cosplayers</span>. 
                 Upload une photo, et laisse l'IA scanner la matrice pour retrouver les accessoires.
               </p>
             </div>
             <ImageUploader onImageSelected={handleImageSelected} />
          </div>
        )}

        {appState === AppState.ANALYZING && (
          <div className="w-full max-w-2xl mx-auto bg-geek-panel/50 p-8 rounded-3xl border border-pink-500/20 backdrop-blur-md shadow-[0_0_50px_rgba(255,0,127,0.1)]">
             {currentImage && (
               <div className="w-32 h-32 mx-auto mb-8 rounded-2xl overflow-hidden border-2 border-pink-500/50 shadow-lg relative">
                 <img src={currentImage} alt="Preview" className="w-full h-full object-cover opacity-50" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               </div>
             )}
             <LoadingView />
          </div>
        )}

        {appState === AppState.ERROR && (
          <div className="text-center space-y-6 p-8 bg-red-900/20 border border-red-500/50 rounded-2xl max-w-md">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
            <h3 className="text-2xl font-bold text-red-300 font-future">ERREUR SYSTEME</h3>
            <p className="text-red-200">{errorMessage}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl border border-red-500/50 font-bold transition-all"
            >
              Réessayer
            </button>
          </div>
        )}

        {appState === AppState.RESULTS && (
          <div className="w-full max-w-6xl animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Sidebar: Image Preview */}
              <div className="w-full md:w-1/3 sticky top-8">
                <div className="bg-geek-panel p-4 rounded-2xl border border-pink-500/30 shadow-[0_0_30px_rgba(255,20,147,0.15)]">
                   <h3 className="text-xl font-future text-pink-300 mb-4 flex items-center gap-2">
                     <span className="w-2 h-6 bg-pink-500 rounded-full"></span>
                     Image Source
                   </h3>
                   <div className="rounded-xl overflow-hidden border-2 border-purple-500/30 relative group">
                     <img src={currentImage!} alt="Source" className="w-full h-auto object-cover" />
                     <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </div>
                   <button 
                      onClick={handleReset}
                      className="mt-6 w-full py-3 flex items-center justify-center gap-2 bg-geek-dark hover:bg-pink-900/30 text-pink-300 border border-pink-500/40 rounded-xl transition-all duration-300 group font-geek text-lg"
                   >
                      <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                      NOUVEAU SCAN
                   </button>
                </div>
              </div>

              {/* Main Content: Results Grid */}
              <div className="w-full md:w-2/3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-future text-white flex items-center gap-3">
                    Items Détectés 
                    <span className="bg-pink-500 text-black text-sm px-3 py-1 rounded-full font-bold font-geek">
                      {items.length}
                    </span>
                  </h3>
                  <div className="h-px bg-gradient-to-r from-pink-500/50 to-transparent flex-grow ml-6"></div>
                </div>
                
                {items.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-2xl">
                    <p className="text-gray-400 font-geek text-xl">Aucun élément distinct détecté... Le style est trop furtif !</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </main>

      <footer className="py-6 text-center border-t border-pink-500/10 mt-auto bg-black/40">
        <p className="text-pink-500/40 font-geek text-sm">
          POWERED BY GEMINI API • CODED WITH &lt;3 /&gt; • COSPLAY FINDER
        </p>
      </footer>
    </div>
  );
};

export default App;
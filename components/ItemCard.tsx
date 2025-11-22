import React from 'react';
import { IdentifiedItem } from '../types';
import { ShoppingBag, Search, ExternalLink, Tag } from 'lucide-react';

interface ItemCardProps {
  item: IdentifiedItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  
  // Helper to generate search URLs
  const getSearchUrl = (site: string, keywords: string) => {
    const query = encodeURIComponent(keywords);
    switch (site) {
      case 'Amazon':
        return `https://www.amazon.fr/s?k=${query}`;
      case 'Etsy':
        return `https://www.etsy.com/fr/search?q=${query}`;
      case 'GoogleShopping':
        return `https://www.google.com/search?tbm=shop&q=${query}`;
      case 'AliExpress':
        return `https://fr.aliexpress.com/wholesale?SearchText=${query}`;
      default:
        return `https://www.google.com/search?q=${query}`;
    }
  };

  return (
    <div className="group relative bg-geek-panel border border-pink-500/30 rounded-2xl overflow-hidden hover:border-pink-400 hover:shadow-[0_0_20px_rgba(255,20,147,0.25)] transition-all duration-300 flex flex-col">
      
      {/* Card Header */}
      <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 p-4 border-b border-pink-500/20">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-pink-200 font-future tracking-wide">
              {item.name}
            </h3>
            <span className="inline-flex items-center gap-1 mt-1 text-xs font-geek text-geek-accent bg-geek-dark px-2 py-0.5 rounded border border-geek-accent/30">
              <Tag className="w-3 h-3" /> {item.category}
            </span>
          </div>
          <div className="w-6 h-6 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: item.color.toLowerCase() === 'multicolore' ? 'transparent' : item.color, backgroundImage: item.color.toLowerCase() === 'multicolore' ? 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)' : 'none' }}></div>
        </div>
      </div>

      {/* Description */}
      <div className="p-5 flex-grow">
        <p className="text-gray-300 text-sm leading-relaxed font-medium">
          "{item.description}"
        </p>
        <div className="mt-3 text-xs text-pink-500/60 font-geek">
          Keywords: [{item.searchKeywords}]
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-black/20 space-y-2">
        <p className="text-xs text-center text-pink-300 mb-2 font-geek uppercase tracking-widest">
          --- Loot it now ---
        </p>
        <div className="grid grid-cols-2 gap-2">
           <a 
            href={getSearchUrl('GoogleShopping', item.searchKeywords)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 bg-geek-accent/20 hover:bg-geek-accent/40 text-geek-accent text-sm rounded-lg transition-colors duration-200 font-bold border border-geek-accent/50 shadow-[0_0_10px_rgba(0,255,157,0.1)]"
          >
             <ShoppingBag className="w-4 h-4" /> Google Shopping
          </a>
          <a 
            href={getSearchUrl('Amazon', item.searchKeywords)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-[#FF9900] hover:text-black text-white text-xs rounded-lg transition-colors duration-200 font-bold border border-gray-700"
          >
            <ShoppingBag className="w-3 h-3" /> Amazon
          </a>
          <a 
            href={getSearchUrl('Etsy', item.searchKeywords)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-[#F1641E] hover:text-white text-white text-xs rounded-lg transition-colors duration-200 font-bold border border-gray-700"
          >
             <ShoppingBag className="w-3 h-3" /> Etsy
          </a>
        </div>
        <a 
            href={getSearchUrl('Google', item.searchKeywords)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 text-xs rounded-lg transition-colors duration-200 border border-pink-500/30"
          >
             <Search className="w-3 h-3" /> Recherche Web
             <ExternalLink className="w-3 h-3 ml-1" />
          </a>
      </div>
    </div>
  );
};

export default ItemCard;
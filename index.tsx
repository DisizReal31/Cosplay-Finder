import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Upload, Image as ImageIcon, Heart, ShoppingBag, Search, ExternalLink, Tag, RefreshCw, AlertCircle, Sparkles, Cpu, ScanLine } from 'lucide-react';

// Ensure lucide-react icons are used to prevent tree-shaking issues if any (rare but good practice in generated code contexts)
// Just importing them in components is usually enough.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
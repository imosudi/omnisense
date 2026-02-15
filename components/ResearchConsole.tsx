
import React, { useState, useRef } from 'react';
import { gemini } from '../services/geminiService';
import { ResearchItem, Alert } from '../types';

interface ResearchConsoleProps {
  onSave: (item: ResearchItem) => void;
  onAlert: (alert: Alert) => void;
}

const ResearchConsole: React.FC<ResearchConsoleProps> = ({ onSave, onAlert }) => {
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const executeResearch = async () => {
    if (!url && !imageFile && !query) return;
    setIsSearching(true);
    setResult(null);

    try {
      let response;
      if (imageFile) {
        const analysis = await gemini.analyzeVisualLayout(imageFile.split(',')[1], query || "Describe the contents and structured data from this screenshot.");
        response = { text: analysis, sources: [] };
      } else {
        response = await gemini.researchWeb(url, query);
      }
      
      setResult(response);

      const newItem: ResearchItem = {
        id: Date.now().toString(),
        url: url || 'Screenshot Upload',
        title: query || 'Research Task',
        summary: response.text.substring(0, 500) + '...',
        extractedData: response.text,
        timestamp: Date.now(),
        type: imageFile ? 'visual' : 'web',
      };
      onSave(newItem);

      // Simple heuristic for an alert demonstration
      if (response.text.toLowerCase().includes('price drop') || response.text.toLowerCase().includes('new release')) {
        onAlert({
          id: Date.now().toString() + '-alert',
          message: `Insight found: ${query}`,
          severity: 'medium',
          timestamp: Date.now(),
          sourceId: newItem.id
        });
      }

    } catch (error) {
      console.error(error);
      alert('Research failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-magnifying-glass-chart text-indigo-600"></i>
          Launch Research Task
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Source URL</label>
              <div className="relative">
                <i className="fa-solid fa-link absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/product"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Visual Input (Optional)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-3 px-4 bg-slate-50 border-2 border-dashed rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all ${
                  imageFile ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <i className={`fa-solid ${imageFile ? 'fa-check-circle text-indigo-500' : 'fa-image text-slate-400'}`}></i>
                <span className={`text-sm ${imageFile ? 'text-indigo-700 font-medium' : 'text-slate-500'}`}>
                  {imageFile ? 'Image Attached' : 'Upload Screenshot'}
                </span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Research Objective</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              placeholder="e.g., Extract all pricing variations and technical specifications for this item. Compare with market averages."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
            ></textarea>
          </div>

          <button
            onClick={executeResearch}
            disabled={isSearching || (!url && !imageFile)}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all ${
              isSearching || (!url && !imageFile)
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-indigo-200 active:scale-95'
            }`}
          >
            {isSearching ? (
              <>
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                Analyzing Web Context...
              </>
            ) : (
              <>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Generate Intelligence Report
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Intelligence Output</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <i className="fa-solid fa-copy"></i>
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <i className="fa-solid fa-download"></i>
              </button>
            </div>
          </div>

          <div className="prose prose-indigo max-w-none prose-sm sm:prose-base text-slate-600">
             <div className="whitespace-pre-wrap leading-relaxed space-y-4">
                {result.text.split('\n\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
             </div>
          </div>

          {result.sources.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Verification Sources</h4>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((src: any, i: number) => (
                  <a 
                    key={i} 
                    href={src.web?.uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    <i className="fa-solid fa-link text-[10px]"></i>
                    {src.web?.title || 'External Source'}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isSearching && (
        <div className="space-y-4">
          <div className="h-4 w-1/3 bg-slate-200 rounded shimmer"></div>
          <div className="h-32 bg-slate-200 rounded-2xl shimmer"></div>
          <div className="h-24 bg-slate-200 rounded-2xl shimmer"></div>
        </div>
      )}
    </div>
  );
};

export default ResearchConsole;

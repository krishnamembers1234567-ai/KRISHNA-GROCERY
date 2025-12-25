
import React, { useState, useEffect } from 'react';
import { generateProductMockup, animateProductVideo } from '../services/geminiService';
import { BottomNav } from '../components/Layout';

const AICreation: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      const ok = await window.aistudio.hasSelectedApiKey();
      setHasKey(ok);
    };
    checkKey();
  }, []);

  const handleOpenKey = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    setHasKey(true); // Assume success per rules
  };

  const handleGenerate = async () => {
    if (!hasKey) {
      alert("Please select an API key first to use Krishna Studio.");
      return;
    }
    if (!prompt) return;
    setLoading(true);
    setResultVideo(null);
    try {
      if (mode === 'image') {
        const url = await generateProductMockup(prompt, size);
        setResultImage(url);
      } else {
        if (!resultImage) {
          alert("Please generate an image first or upload one to animate.");
        } else {
          const videoUrl = await animateProductVideo(resultImage, prompt);
          setResultVideo(videoUrl);
        }
      }
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes("Requested entity was not found.")) {
        setHasKey(false);
        alert("API Key invalid or expired. Please re-select.");
      } else {
        alert("AI generation failed. Please check your API key.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResultImage(reader.result as string);
        setMode('video');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!hasKey) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 text-3xl">
          <i className="fa-solid fa-key"></i>
        </div>
        <div>
          <h2 className="brand-font text-2xl text-neutral-100">Unlock Krishna Studio</h2>
          <p className="text-xs text-neutral-500 mt-2">Professional AI tools require a paid API key from your project.</p>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] text-amber-500 underline mt-1 block">Learn about billing</a>
        </div>
        <button 
          onClick={handleOpenKey}
          className="w-full bg-amber-500 text-neutral-900 py-4 rounded-2xl font-bold uppercase tracking-widest"
        >
          Select API Key
        </button>
        <BottomNav cartCount={0} />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24 overflow-y-auto">
      <header className="p-6">
        <h2 className="brand-font text-amber-500 text-3xl">Krishna Studio</h2>
        <p className="text-neutral-500 text-xs">AI-Powered Magic for your Kirana</p>
      </header>

      <div className="px-6 space-y-6">
        <div className="flex bg-neutral-800 p-1 rounded-xl">
          <button 
            onClick={() => setMode('image')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'image' ? 'bg-amber-500 text-neutral-900' : 'text-neutral-500'}`}
          >
            Mockup Generator
          </button>
          <button 
            onClick={() => setMode('video')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'video' ? 'bg-amber-500 text-neutral-900' : 'text-neutral-500'}`}
          >
            Veo Animator
          </button>
        </div>

        <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-3xl space-y-4">
          <div>
            <label className="text-[10px] text-neutral-500 uppercase font-bold mb-2 block">Prompt</label>
            <textarea 
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 min-h-[100px]"
              placeholder={mode === 'image' ? "Describe your gourmet product (e.g., Luxury Saffron Jar on a marble table)" : "Describe the animation style..."}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {mode === 'image' && (
            <div>
              <label className="text-[10px] text-neutral-500 uppercase font-bold mb-2 block">Resolution</label>
              <div className="flex gap-2">
                {(['1K', '2K', '4K'] as const).map(s => (
                  <button 
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${size === s ? 'bg-emerald-700 text-white' : 'bg-neutral-900 text-neutral-500 border border-neutral-700'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'video' && !resultImage && (
            <div>
              <label className="text-[10px] text-neutral-500 uppercase font-bold mb-2 block">Upload Reference Image</label>
              <input type="file" onChange={handleFileUpload} className="w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-neutral-900 hover:file:bg-amber-600 cursor-pointer" />
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            {loading ? (
              <><i className="fa-solid fa-spinner animate-spin"></i> Manifesting...</>
            ) : (
              <><i className="fa-solid fa-sparkles"></i> {mode === 'image' ? 'Generate Mockup' : 'Animate with Veo'}</>
            )}
          </button>
        </div>

        {(resultImage || resultVideo) && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-neutral-400">Preview</h4>
            <div className="bg-neutral-800 p-2 rounded-3xl border border-neutral-700 overflow-hidden">
              {resultVideo ? (
                <video src={resultVideo} controls autoPlay loop className="w-full rounded-2xl" />
              ) : resultImage ? (
                <img src={resultImage} className="w-full rounded-2xl" alt="AI Generated" />
              ) : null}
            </div>
          </div>
        )}

        <div className="bg-emerald-900/20 border border-emerald-900/50 p-4 rounded-2xl flex gap-3">
          <i className="fa-solid fa-circle-info text-emerald-500 mt-0.5"></i>
          <p className="text-[10px] text-neutral-400 leading-relaxed">
            Krishna Studio uses <strong>Gemini 3 Pro</strong> and <strong>Veo</strong> for professional-grade creative outputs.
          </p>
        </div>
      </div>
      <BottomNav cartCount={0} />
    </div>
  );
};

export default AICreation;

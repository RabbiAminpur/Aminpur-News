import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, Printer, X } from 'lucide-react';

interface PhotoCardProps {
  news: {
    title: string;
    category: string;
    date: string;
    image: string;
  };
  onClose: () => void;
}

export default function PhotoCard({ news, onClose }: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `aminpur-news-${news.title.substring(0, 20)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  const printCard = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-lg w-full">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-accent transition-colors p-2"
        >
          <X size={32} />
        </button>

        <div className="bg-white rounded-2xl overflow-hidden photocard-shadow" ref={cardRef}>
          <div className="relative aspect-video">
            <img 
              src={news.image} 
              alt={news.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {news.category}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          <div className="p-8 bg-white text-slate-900">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-4">
              <div className="w-8 h-0.5 bg-rose-600" />
              {news.date}
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-8 text-slate-900">
              {news.title}
            </h2>
            
            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-black text-xl italic">
                  A
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Source</div>
                  <div className="text-sm font-bold text-slate-900">আমিনপুর নিউজ</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-300 font-mono">aminpurnews.com</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={downloadImage}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-rose-600/20"
          >
            <Download size={20} /> ছবি ডাউনলোড
          </button>
          <button 
            onClick={printCard}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/20"
          >
            <Printer size={20} /> প্রিন্ট
          </button>
        </div>
      </div>
    </div>
  );
}

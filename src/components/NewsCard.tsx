import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface NewsCardProps {
  news: {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
    image: string;
    featured?: boolean;
  };
  key?: React.Key;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 news-card-hover flex flex-col h-full shadow-sm"
    >
      <Link to={`/news/${news.id}`} className="relative overflow-hidden aspect-[4/3] block group">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-rose-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
            {news.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </Link>
      
      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Clock size={12} className="text-rose-600" />
          {news.date}
        </div>
        
        <Link to={`/news/${news.id}`} className="group">
          <h4 className="font-bold text-base md:text-lg leading-snug mb-3 text-slate-800 dark:text-slate-100 group-hover:text-rose-600 transition-colors line-clamp-2">
            {news.title}
          </h4>
        </Link>
        
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
          {news.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-700/50">
          <Link 
            to={`/news/${news.id}`} 
            className="text-rose-600 font-bold text-xs hover:underline flex items-center gap-1 group"
          >
            বিস্তারিত পড়ুন 
            <motion.span 
              animate={{ x: [0, 4, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
          <button className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

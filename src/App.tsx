/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  Moon, 
  Sun, 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram, 
  Clock, 
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  List,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import newsData from './data/news.json';
import NewsCard from './components/NewsCard';
import NewsDetail from './components/NewsDetail';

const CATEGORIES = ['সব', 'জাতীয়', 'স্থানীয়', 'শিক্ষা', 'চাকরি', 'বিনোদন'];

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredNews = useMemo(() => newsData.find(item => item.featured) || newsData[0], []);
  const latestNews = useMemo(() => [...newsData].sort((a, b) => b.id - a.id).slice(0, 6), []);

  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      {/* Search Bar Mobile */}
      <div className="md:hidden mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600/50 transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-4 text-slate-400" size={20} />
        </div>
      </div>

      {selectedCategory === 'সব' && !searchQuery && (
        <>
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8 relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none">
              <Link to={`/news/${featuredNews.id}`} className="block relative h-[450px] md:h-[600px]">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                  <span className="bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-6 uppercase tracking-widest shadow-lg shadow-rose-600/30">
                    {featuredNews.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-rose-400 transition-colors">
                    {featuredNews.title}
                  </h2>
                  <p className="text-slate-300 line-clamp-2 text-sm md:text-lg mb-6 max-w-2xl leading-relaxed">
                    {featuredNews.description}
                  </p>
                  <div className="flex items-center gap-6 text-slate-400 text-xs md:text-sm font-medium">
                    <span className="flex items-center gap-2"><Clock size={16} className="text-rose-600" /> {featuredNews.date}</span>
                    <span className="flex items-center gap-2"><TrendingUp size={16} className="text-rose-600" /> ট্রেন্ডিং</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Latest News Sidebar */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-rose-600 rounded-full" />
                সর্বশেষ সংবাদ
              </h3>
              <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {latestNews.map((news) => (
                  <Link key={news.id} to={`/news/${news.id}`} className="group block">
                    <span className="text-rose-600 text-[10px] font-bold uppercase mb-2 block tracking-widest">{news.category}</span>
                    <h4 className="font-bold text-base leading-snug group-hover:text-rose-600 transition-colors line-clamp-2 mb-3 text-slate-800 dark:text-slate-200">
                      {news.title}
                    </h4>
                    <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-2 font-medium">
                      <Clock size={14} className="text-rose-600" /> {news.date}
                    </span>
                  </Link>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white dark:bg-slate-700 rounded-2xl text-sm font-bold hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-rose-600/20 active:scale-95">
                সব সংবাদ দেখুন <ChevronRight size={18} />
              </button>
            </div>
          </section>
        </>
      )}

      {/* News Grid Section - 2 Columns on Mobile/Tablet */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {selectedCategory === 'সব' ? (searchQuery ? `"${searchQuery}" এর ফলাফল` : 'আজকের খবর') : selectedCategory}
            </h3>
            <div className="w-20 h-1.5 bg-rose-600 rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm text-rose-600"><LayoutGrid size={18} /></button>
              <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><List size={18} /></button>
            </div>
            {filteredNews.length > 0 && (
              <span className="text-slate-500 text-sm font-medium">{filteredNews.length} টি সংবাদ পাওয়া গেছে</span>
            )}
          </div>
        </div>

        {filteredNews.length > 0 ? (
          <div className="news-grid-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <Search size={64} className="mx-auto text-slate-200 dark:text-slate-700 mb-6" />
            <h4 className="text-2xl font-bold text-slate-500 dark:text-slate-400">কোন সংবাদ পাওয়া যায়নি</h4>
            <p className="text-slate-400 mt-3 max-w-xs mx-auto">দুঃখিত, আপনার অনুসন্ধানকৃত বিষয়ের কোন সংবাদ আমাদের কাছে নেই।</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('সব');}}
              className="mt-8 px-10 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/30 active:scale-95"
            >
              সব খবর দেখুন
            </button>
          </div>
        )}
      </section>

      {/* Category Sections (Only on Home) */}
      {selectedCategory === 'সব' && !searchQuery && (
        <div className="space-y-20">
          {CATEGORIES.slice(1).map(cat => {
            const catNews = newsData.filter(n => n.category === cat).slice(0, 4);
            if (catNews.length === 0) return null;
            return (
              <section key={cat}>
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-2 h-8 bg-rose-600 rounded-full" />
                    {cat}
                  </h3>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className="text-sm font-bold text-rose-600 hover:underline flex items-center gap-1 group"
                  >
                    সব দেখুন <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="news-grid-2 lg:grid-cols-4">
                  {catNews.map(news => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('bn-BD', options);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 flex flex-wrap justify-between items-center text-[10px] md:text-xs font-medium">
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline flex items-center gap-2">
            <Clock size={14} className="text-rose-600" />
            {formatDate(currentTime)}
          </span>
          <div className="flex items-center gap-3">
            <div className="bg-rose-600 px-2 py-0.5 rounded text-[10px] font-black uppercase animate-pulse shadow-lg shadow-rose-600/40">
              ব্রেকিং নিউজ:
            </div>
            <div className="breaking-news-ticker flex-1 max-w-[150px] sm:max-w-md overflow-hidden">
              <div className="ticker-content text-slate-300">
                {newsData.slice(0, 5).map(n => n.title).join(' • ')}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <Facebook size={14} className="cursor-pointer hover:text-rose-600 transition-colors" />
            <Twitter size={14} className="cursor-pointer hover:text-rose-600 transition-colors" />
            <Youtube size={14} className="cursor-pointer hover:text-rose-600 transition-colors" />
          </div>
          <button onClick={toggleDarkMode} className="p-1.5 bg-slate-800 rounded-lg hover:text-rose-600 transition-colors shadow-inner">
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none sticky-nav border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl italic shadow-xl shadow-rose-600/30 group-hover:rotate-6 transition-transform">
                A
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-rose-600 tracking-tighter">
                আমিনপুর <span className="text-slate-900 dark:text-white">নিউজ</span>
              </h1>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              {CATEGORIES.map(cat => (
                <Link 
                  key={cat}
                  to="/"
                  className="text-base font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 transition-colors relative group"
                >
                  {cat}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="খুঁজুন..."
                className="pl-12 pr-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600/50 transition-all w-72 shadow-inner"
              />
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            </div>
            <button className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm">
              <Bell size={20} />
            </button>
            <button 
              className="lg:hidden p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl"
            >
              <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
                {CATEGORIES.map(cat => (
                  <Link 
                    key={cat}
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-left py-2 text-xl font-bold text-slate-700 dark:text-slate-300 hover:text-rose-600 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
                <div className="flex gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Facebook className="text-slate-400 hover:text-rose-600" />
                  <Twitter className="text-slate-400 hover:text-rose-600" />
                  <Youtube className="text-slate-400 hover:text-rose-600" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl italic shadow-xl shadow-rose-600/30">
                  A
                </div>
                <h2 className="text-2xl font-black text-rose-600 tracking-tighter">
                  আমিনপুর <span className="text-white">নিউজ</span>
                </h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                আমিনপুর নিউজ একটি আধুনিক অনলাইন সংবাদ মাধ্যম। আমরা বস্তুনিষ্ঠ সংবাদ সবার আগে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের সাথে থাকুন এবং সত্যের পথে চলুন।
              </p>
              <div className="flex gap-5">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-rose-600 transition-all">
                  <Facebook size={18} />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-rose-600 transition-all">
                  <Twitter size={18} />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-rose-600 transition-all">
                  <Youtube size={18} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-rose-600 rounded-full" />
                বিভাগসমূহ
              </h4>
              <ul className="grid grid-cols-2 gap-4 text-slate-400 text-sm font-medium">
                {CATEGORIES.map(cat => (
                  <li key={cat} className="hover:text-rose-600 cursor-pointer transition-colors">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-rose-600 rounded-full" />
                যোগাযোগ
              </h4>
              <ul className="space-y-5 text-slate-400 text-sm">
                <li className="flex gap-3">
                  <span className="text-rose-600 font-bold">ঠিকানা:</span>
                  আমিনপুর, পাবনা, বাংলাদেশ
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-600 font-bold">ইমেইল:</span>
                  info@aminpurnews.com
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-600 font-bold">ফোন:</span>
                  +৮৮০ ১২৩৪ ৫৬৭৮৯০
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-rose-600 rounded-full" />
                নিউজলেটার
              </h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">আমাদের সর্বশেষ খবরের আপডেট পেতে সাবস্ক্রাইব করুন।</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="ইমেইল এড্রেস"
                  className="bg-slate-800 border-none rounded-2xl px-6 py-4 w-full text-sm focus:ring-2 focus:ring-rose-600 transition-all shadow-inner"
                />
                <button className="bg-rose-600 w-full py-4 rounded-2xl font-bold text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 active:scale-95">
                  সাবস্ক্রাইব করুন
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs font-medium">
            <p>© ২০২৪ আমিনপুর নিউজ। সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">গোপনীয়তা নীতি</span>
              <span className="hover:text-white cursor-pointer transition-colors">ব্যবহারের শর্তাবলী</span>
              <span className="hover:text-white cursor-pointer transition-colors">আমাদের সম্পর্কে</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

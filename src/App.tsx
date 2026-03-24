/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
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
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import newsData from './data/news.json';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  featured?: boolean;
}

const CATEGORIES = ['সব', 'জাতীয়', 'স্থানীয়', 'শিক্ষা', 'চাকরি', 'বিনোদন'];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Register Service Worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }, []);

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredNews = useMemo(() => newsData.find(item => item.featured) || newsData[0], []);
  const latestNews = useMemo(() => [...newsData].sort((a, b) => b.id - a.id).slice(0, 5), []);

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
      <div className="bg-black text-white py-2 px-4 flex flex-wrap justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">{formatDate(currentTime)}</span>
          <div className="flex items-center gap-2 bg-accent px-2 py-0.5 rounded text-xs font-bold animate-pulse">
            ব্রেকিং নিউজ:
          </div>
          <div className="breaking-news-ticker flex-1 max-w-[200px] sm:max-w-md overflow-hidden">
            <div className="ticker-content">
              {newsData.slice(0, 3).map(n => n.title).join(' | ')}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-1 hover:text-accent transition-colors">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex gap-3">
            <Facebook size={16} className="cursor-pointer hover:text-accent" />
            <Twitter size={16} className="cursor-pointer hover:text-accent" />
            <Youtube size={16} className="cursor-pointer hover:text-accent" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 shadow-sm sticky-nav border-b border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-black text-accent tracking-tighter cursor-pointer" onClick={() => setSelectedCategory('সব')}>
              আমিনপুর <span className="text-black dark:text-white">নিউজ</span>
            </h1>
            
            <nav className="hidden lg:flex items-center gap-6">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-lg font-medium transition-colors hover:text-accent ${selectedCategory === cat ? 'text-accent border-b-2 border-accent' : 'text-zinc-600 dark:text-zinc-400'}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 w-64"
              />
              <Search className="absolute left-3 top-2.5 text-zinc-400" size={16} />
            </div>
            <button 
              className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400"
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
              className="lg:hidden bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <div className="relative md:hidden">
                  <input 
                    type="text" 
                    placeholder="খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm"
                  />
                  <Search className="absolute left-3 top-2.5 text-zinc-400" size={16} />
                </div>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 text-lg font-medium ${selectedCategory === cat ? 'text-accent' : 'text-zinc-600 dark:text-zinc-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedCategory === 'সব' && !searchQuery && (
          <>
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <div className="bg-accent text-white px-3 py-1 rounded text-sm font-bold w-fit mb-4 uppercase tracking-wider">
                    {featuredNews.category}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-accent transition-colors">
                    {featuredNews.title}
                  </h2>
                  <p className="text-zinc-300 line-clamp-2 text-sm md:text-base mb-4">
                    {featuredNews.description}
                  </p>
                  <div className="flex items-center gap-4 text-zinc-400 text-xs md:text-sm">
                    <span className="flex items-center gap-1"><Clock size={14} /> {featuredNews.date}</span>
                    <span className="flex items-center gap-1"><Share2 size={14} /> শেয়ার</span>
                  </div>
                </div>
              </div>

              {/* Latest News Sidebar */}
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b-2 border-accent pb-2 w-fit">
                  সর্বশেষ সংবাদ
                </h3>
                <div className="flex flex-col gap-6 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {latestNews.map((news) => (
                    <div key={news.id} className="group cursor-pointer">
                      <span className="text-accent text-xs font-bold uppercase mb-1 block">{news.category}</span>
                      <h4 className="font-bold text-sm md:text-base leading-snug group-hover:text-accent transition-colors line-clamp-2 mb-2">
                        {news.title}
                      </h4>
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs flex items-center gap-1">
                        <Clock size={12} /> {news.date}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg text-sm font-bold hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-1">
                  সব দেখুন <ChevronRight size={16} />
                </button>
              </div>
            </section>
          </>
        )}

        {/* News Grid Section */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-2xl font-bold">
              {selectedCategory === 'সব' ? (searchQuery ? `"${searchQuery}" এর ফলাফল` : 'আজকের খবর') : selectedCategory}
            </h3>
            {filteredNews.length > 0 && (
              <span className="text-zinc-500 text-sm">{filteredNews.length} টি সংবাদ পাওয়া গেছে</span>
            )}
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNews.map((news) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={news.id} 
                  className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 news-card-hover flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-accent text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-bold text-lg mb-2 line-clamp-2 hover:text-accent transition-colors cursor-pointer">
                      {news.title}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4 flex-1">
                      {news.description}
                    </p>
                    <div className="flex justify-between items-center text-zinc-400 text-xs pt-4 border-t border-zinc-50 dark:border-zinc-800">
                      <span className="flex items-center gap-1"><Clock size={12} /> {news.date}</span>
                      <button className="text-accent font-bold hover:underline">বিস্তারিত</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl">
              <Search size={48} className="mx-auto text-zinc-300 mb-4" />
              <h4 className="text-xl font-bold text-zinc-500">কোন সংবাদ পাওয়া যায়নি</h4>
              <p className="text-zinc-400 mt-2">অন্য কোন শব্দ দিয়ে চেষ্টা করুন</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('সব');}}
                className="mt-6 px-6 py-2 bg-accent text-white rounded-full font-bold hover:bg-accent/80 transition-colors"
              >
                সব খবর দেখুন
              </button>
            </div>
          )}
        </section>

        {/* Category Sections (Only on Home) */}
        {selectedCategory === 'সব' && !searchQuery && (
          <div className="space-y-12">
            {CATEGORIES.slice(1).map(cat => {
              const catNews = newsData.filter(n => n.category === cat).slice(0, 4);
              if (catNews.length === 0) return null;
              return (
                <section key={cat}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold border-l-4 border-accent pl-3">{cat}</h3>
                    <button 
                      onClick={() => setSelectedCategory(cat)}
                      className="text-sm font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      সব দেখুন <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {catNews.map(news => (
                      <div key={news.id} className="group cursor-pointer">
                        <div className="relative rounded-lg overflow-hidden mb-3 aspect-video">
                          <img 
                            src={news.image} 
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                        <h4 className="font-bold text-sm group-hover:text-accent transition-colors line-clamp-2">
                          {news.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white pt-16 pb-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-black text-accent tracking-tighter mb-6">
                আমিনপুর <span className="text-white">নিউজ</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                আমিনপুর নিউজ একটি আধুনিক অনলাইন সংবাদ মাধ্যম। আমরা বস্তুনিষ্ঠ সংবাদ সবার আগে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের সাথে থাকুন এবং সত্যের পথে চলুন।
              </p>
              <div className="flex gap-4">
                <Facebook className="cursor-pointer hover:text-accent transition-colors" />
                <Twitter className="cursor-pointer hover:text-accent transition-colors" />
                <Youtube className="cursor-pointer hover:text-accent transition-colors" />
                <Instagram className="cursor-pointer hover:text-accent transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-zinc-800 pb-2">বিভাগসমূহ</h4>
              <ul className="grid grid-cols-2 gap-3 text-zinc-400 text-sm">
                {CATEGORIES.map(cat => (
                  <li key={cat} className="hover:text-accent cursor-pointer transition-colors" onClick={() => setSelectedCategory(cat)}>
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-zinc-800 pb-2">যোগাযোগ</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li>আমিনপুর, পাবনা, বাংলাদেশ</li>
                <li>ইমেইল: info@aminpurnews.com</li>
                <li>ফোন: +৮৮০ ১২৩৪ ৫৬৭৮৯০</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-zinc-800 pb-2">সাবস্ক্রাইব</h4>
              <p className="text-zinc-400 text-sm mb-4">আমাদের সর্বশেষ খবরের আপডেট পেতে সাবস্ক্রাইব করুন।</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="ইমেইল এড্রেস"
                  className="bg-zinc-800 border-none rounded-l-lg px-4 py-2 w-full text-sm focus:ring-1 focus:ring-accent"
                />
                <button className="bg-accent px-4 py-2 rounded-r-lg font-bold text-sm hover:bg-accent/80 transition-colors">
                  পাঠান
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs">
            <p>© ২০২৪ আমিনপুর নিউজ। সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">গোপনীয়তা নীতি</span>
              <span className="hover:text-white cursor-pointer">ব্যবহারের শর্তাবলী</span>
              <span className="hover:text-white cursor-pointer">আমাদের সম্পর্কে</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Download, 
  Printer, 
  Bookmark, 
  ChevronRight,
  User,
  Eye,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import newsData from '../data/news.json';
import PhotoCard from './PhotoCard';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPhotoCard, setShowPhotoCard] = useState(false);
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    const item = newsData.find(n => n.id === Number(id));
    if (item) {
      setNews(item);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!news) return null;

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(news.title)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(news.title + ' ' + url)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-20">
      <Helmet>
        <title>{news.title} | আমিনপুর নিউজ</title>
        <meta name="description" content={news.description} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.description} />
        <meta property="og:image" content={news.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Breadcrumb & Navigation */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
            <Link to="/" className="hover:text-rose-600 transition-colors">হোম</Link>
            <ChevronRight size={14} />
            <span className="text-rose-600">{news.category}</span>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft size={18} /> ফিরে যান
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <header className="mb-8">
              <span className="inline-block bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-rose-600/20">
                {news.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-slate-900 dark:text-slate-100">
                {news.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 text-sm border-y border-slate-100 dark:border-slate-800 py-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-200">আমিনপুর নিউজ ডেস্ক</div>
                    <div className="text-xs">স্টাফ রিপোর্টার</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-rose-600" />
                  <span>প্রকাশিত: {news.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-rose-600" />
                  <span>১২৩৪ বার পঠিত</span>
                </div>
              </div>
            </header>

            <div className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl group">
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
              <p className="font-bold text-xl text-slate-800 dark:text-slate-200">
                {news.description}
              </p>
              <p>
                আমিনপুর নিউজ ডেস্ক: দেশের বর্তমান প্রেক্ষাপটে এই সংবাদটি অত্যন্ত গুরুত্বপূর্ণ। স্থানীয়দের মতে, এই ধরনের উদ্যোগ আগে কখনো দেখা যায়নি। সংশ্লিষ্ট কর্তৃপক্ষ জানিয়েছে যে, তারা এই বিষয়ে দ্রুত পদক্ষেপ গ্রহণ করবে।
              </p>
              <p>
                বিশেষজ্ঞদের মতে, এই পরিবর্তনের ফলে সাধারণ মানুষের জীবনযাত্রায় বড় ধরনের প্রভাব পড়বে। বিশেষ করে শিক্ষা ও কর্মসংস্থানের ক্ষেত্রে নতুন দিগন্ত উন্মোচিত হতে পারে। তবে এর জন্য প্রয়োজন সঠিক পরিকল্পনা ও বাস্তবায়ন।
              </p>
              <p>
                আমিনপুর নিউজ সবসময় সত্য ও বস্তুনিষ্ঠ সংবাদ সবার আগে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের সাথে থাকুন এবং সর্বশেষ খবরের আপডেট পেতে আমাদের সোশ্যাল মিডিয়া পেজগুলোতে ফলো করুন।
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 py-8 border-y border-slate-100 dark:border-slate-800 mb-12">
              <button 
                onClick={() => setShowPhotoCard(true)}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-rose-600/20"
              >
                <Download size={20} /> ফটোকার্ড ডাউনলোড
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={shareOnFacebook}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-blue-600/20"
                >
                  <Facebook size={20} />
                </button>
                <button 
                  onClick={shareOnTwitter}
                  className="w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-sky-500/20"
                >
                  <Twitter size={20} />
                </button>
                <button 
                  onClick={shareOnWhatsApp}
                  className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={20} />
                </button>
                <button className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 transition-all active:scale-90">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-rose-600 rounded-full" />
                  আরো পড়ুন
                </h3>
                <div className="space-y-6">
                  {newsData.filter(n => n.id !== news.id).slice(0, 4).map(item => (
                    <Link key={item.id} to={`/news/${item.id}`} className="group flex gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <span className="text-rose-600 text-[10px] font-bold uppercase mb-1 block">{item.category}</span>
                        <h4 className="font-bold text-sm leading-snug group-hover:text-rose-600 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-rose-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-rose-600/30">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">আমিনপুর নিউজ অ্যাপ</h3>
                  <p className="text-rose-100 text-sm mb-6 leading-relaxed">
                    সবার আগে সর্বশেষ খবর পেতে আমাদের অ্যাপটি ডাউনলোড করুন।
                  </p>
                  <button className="bg-white text-rose-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-rose-50 transition-colors flex items-center gap-2">
                    ডাউনলোড করুন <ChevronRight size={18} />
                  </button>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showPhotoCard && (
        <PhotoCard 
          news={news} 
          onClose={() => setShowPhotoCard(false)} 
        />
      )}
    </div>
  );
}

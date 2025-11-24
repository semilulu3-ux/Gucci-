import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Footer from './components/Footer';
import ProductRow from './components/ProductRow';

// List of Gucci campaign videos
const VIDEO_URLS = [
  "https://house-fastly-signed-eu-west-1-prod.brightcovecdn.com/media/v1/pmp4/static/clear/2924921183001/bfb943ac-a9bb-4202-8d1c-fa7d10e9c3c6/cec6f69d-1edf-4a79-b3b9-150a2114c5a3/main.mp4?fastly_token=NjkyNDQwOWVfMDUxODIwOWI0OTM1ZGU5ZTEzNzQ5MjAyODkyMWFlNjVkNDkxYTNlYWE5Y2M4N2RhYTVlMWExODY5YzlkNTg0OV8vL2hvdXNlLWZhc3RseS1zaWduZWQtZXUtd2VzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vbWVkaWEvdjEvcG1wNC9zdGF0aWMvY2xlYXIvMjkyNDkyMTE4MzAwMS9iZmI5NDNhYy1hOWJiLTQyMDItOGQxYy1mYTdkMTBlOWMzYzYvY2VjNmY2OWQtMWVkZi00YTc5LWIzYjktMTUwYTIxMTRjNWEzL21haW4ubXA0"
];

const GUCCI_IMAGE_URL = "https://media.gucci.com/content/DiaryArticleDouble_Standard_1400x894/1744017303/DiaryArticleDouble_Gucci-MDAY-APR25-GUCCI-FESTIVITIES-ADV-YARA-KERI-A-0719_001_Default.jpg";

const App: React.FC = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(VIDEO_URLS[0]);

  // Video rotation logic (if multiple videos exist in the future)
  useEffect(() => {
    if (VIDEO_URLS.length > 1) {
        const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * VIDEO_URLS.length);
        setCurrentVideoUrl(VIDEO_URLS[randomIndex]);
        }, 10000);
        return () => clearInterval(interval);
    }
  }, []);

  const handleTimerExpire = () => {
    setIsExpired(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Header />

      <main className="relative pt-32 pb-0 px-4 md:px-8 flex flex-col items-center w-full max-w-[1920px] mx-auto">
        
        {/* Main Typography */}
        <div className="text-center mb-10 animate-fade-in z-10 w-full">
          <h1 className="text-4xl md:text-[3.5rem] lg:text-6xl font-light tracking-[0.05em] text-white uppercase mb-8">
            AGENDA DI MULAI
          </h1>
          
          {/* Timer Integration */}
          <div className="flex justify-center items-center min-h-[90px] mb-4">
             {isExpired ? (
                 <div className="animate-fade-in text-white text-lg md:text-xl font-serif tracking-widest border-y border-white/20 py-6 px-4 md:px-12 bg-black/80 text-center max-w-4xl shadow-2xl">
                     Proses Sudah Selesai. Hubungi Kordinator untuk melakukan penarikan.
                 </div>
            ) : (
                <Timer durationSeconds={300} onExpire={handleTimerExpire}/>
            )}
          </div>
        </div>

        {/* Hero Media Section */}
        <div className="relative w-full max-w-[1600px] mx-auto aspect-video md:aspect-[21/9] overflow-hidden bg-gucci-gray mb-0 shadow-2xl group">
            
            {/* Video Layer - Plays when active (Not Expired) */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${!isExpired ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <video 
                    key={currentVideoUrl}
                    className="w-full h-full object-cover opacity-100"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster={GUCCI_IMAGE_URL}
                >
                    <source src={currentVideoUrl} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                {/* Overlay gradient for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Static Image Layer - Shows when Expired */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isExpired ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                <img 
                    src={GUCCI_IMAGE_URL} 
                    alt="Gucci Icons Campaign" 
                    className="w-full h-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
        </div>

        {/* Product Showcase */}
        <ProductRow />

        {/* Detailed Footer */}
        <Footer />

      </main>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Footer from './components/Footer';
import ProductRow from './components/ProductRow';

// List of Gucci campaign videos to select from randomly
const VIDEO_URLS = [
  "https://house-fastly-signed-eu-west-1-prod.brightcovecdn.com/media/v1/pmp4/static/clear/2924921183001/4687bdf7-c429-45dc-bbf4-dafe31dca93a/bc2a75f8-d2c4-4b71-b02a-6bd7ec0d3d95/main.mp4?fastly_token=NjkyMzBhMjNfN2JlOWIyN2MyYzg4NjA1NDIwYTJjMTY5ZWE5OTQ1MjYyZTIwMzdhZjUwOWE5MGRhMTAyMjI2YTIxZTY0Y2IxN18vL2hvdXNlLWZhc3RseS1zaWduZWQtZXUtd2VzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vbWVkaWEvdjEvcG1wNC9zdGF0aWMvY2xlYXIvMjkyNDkyMTE4MzAwMS80Njg3YmRmNy1jNDI5LTQ1ZGMtYmJmNC1kYWZlMzFkY2E5M2EvYmMyYTc1ZjgtZDJjNC00YjcxLWIwMmEtNmJkN2VjMGQzZDk1L21haW4ubXA0",
  "https://house-fastly-signed-eu-west-1-prod.brightcovecdn.com/media/v1/pmp4/static/clear/2924921183001/1ae69177-dc03-40fd-8b6f-4de60b08a8db/052c4667-e7df-437d-b8d5-87ffbaaf1a5f/main.mp4?fastly_token=NjkyMzIxNTJfY2Y2MTYzMDE2YmU1NDMyNGY2ZDNmYTZjYjNhZjM0MTBjODIyNTZlN2JmOTk4M2I3ZmJmYzRkMDY3MzNkMDg3N18vL2hvdXNlLWZhc3RseS1zaWduZWQtZXUtd2VzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vbWVkaWEvdjEvcG1wNC9zdGF0aWMvY2xlYXIvMjkyNDkyMTE4MzAwMS8xYWU2OTE3Ny1kYzAzLTQwZmQtOGI2Zi00ZGU2MGIwOGE4ZGIvMDUyYzQ2NjctZTdkZi00MzdkLWI4ZDUtODdmZmJhYWYxYTVmL21haW4ubXA0",
  "https://house-fastly-signed-eu-west-1-prod.brightcovecdn.com/media/v1/pmp4/static/clear/2924921183001/71f1d2ac-bcc9-4210-bd04-9f2c9c856224/33cb203f-4057-4143-ba70-dfadc0ca402a/main.mp4?fastly_token=NjkyMzFiMDNfNWQ2MDg3ODE0ZDFlYjg3MzVhNzhjZjJjNzVjYjkwN2ZiN2JjMjEwMzA5OWEwZDVjNWQ1MDc5OTk4MzU2Nzc4Nl8vL2hvdXNlLWZhc3RseS1zaWduZWQtZXUtd2VzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vbWVkaWEvdjEvcG1wNC9zdGF0aWMvY2xlYXIvMjkyNDkyMTE4MzAwMS83MWYxZDJhYy1iY2M5LTQyMTAtYmQwNC05ZjJjOWM4NTYyMjQvMzNjYjIwM2YtNDA1Ny00MTQzLWJhNzAtZGZhZGMwY2E0MDJhL21haW4ubXA0"
];

const GUCCI_IMAGE_URL = "https://media.gucci.com/content/DiaryArticleDouble_Standard_1400x894/1744017303/DiaryArticleDouble_Gucci-MDAY-APR25-GUCCI-FESTIVITIES-ADV-YARA-KERI-A-0719_001_Default.jpg";

const App: React.FC = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(VIDEO_URLS[0]);

  // Rotate videos randomly every 10 seconds
  useEffect(() => {
    // Set initial random video
    setCurrentVideoUrl(VIDEO_URLS[Math.floor(Math.random() * VIDEO_URLS.length)]);

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * VIDEO_URLS.length);
      setCurrentVideoUrl(VIDEO_URLS[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTimerExpire = () => {setIsExpired(true);
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
                 <div className="text-white text-lg md:text-xl font-serif tracking-widest border-y border-white/20 py-6 px-4 md:px-12 bg-black/80 text-center max-w-4xl shadow-2xl">
                     Proses Sudah Selesai Hubungi Kordinator untuk melakukan penarikan
                 </div>
            ) : (
                <Timer durationSeconds={300} onExpire={handleTimerExpire}/>
            )}
          </div>
        </div>

        {/* Hero Media Section */}
        <div className="relative w-full max-w-[1600px] mx-auto aspect-video md:aspect-[21/9] overflow-hidden bg-black mb-0">
            
            {/* Video Layer - Plays when active (Not Expired) */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${!isExpired ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <video 
                    key={currentVideoUrl}
                    className="w-full h-full object-contain"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src={currentVideoUrl} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Static Image Layer - Shows when Expired */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isExpired ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                <img 
                    src={GUCCI_IMAGE_URL} 
                    alt="Gucci Icons Campaign" 
                    className="w-full h-full object-contain grayscale opacity-50 blur-[2px]"
                />
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
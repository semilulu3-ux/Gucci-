import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-10 flex flex-col items-center z-20 relative animate-fade-in">
      {/* Brand Logos Section */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-6 md:gap-20 mb-16 opacity-90 px-4">
        {/* Logo 1: Gucci Icon */}
        <div className="flex items-center justify-center">
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgN9NqzIXM9Y9PNmeZ-JyL7oVVwhz-qmjBkA&s" 
                alt="Gucci" 
                className="h-14 md:h-16 w-auto object-contain filter invert mix-blend-screen opacity-90"
            />
        </div>

        {/* Logo 2: Gucci Osteria */}
        <div className="flex items-center justify-center">
            <img 
                src="https://images.squarespace-cdn.com/content/v1/62b63c7b517ea5718854cb19/ad09cf1c-b628-4a3b-8f79-4017b2168a24/Gucci+Osteria.jpg" 
                alt="Gucci Osteria" 
                className="h-14 md:h-16 w-auto object-contain filter invert mix-blend-screen opacity-90"
            />
        </div>

        {/* Logo 3: Palazzo Gucci */}
        <div className="flex items-center justify-center">
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSM9e8DQ6Fu1U-3GV8w12MFGMWoSeE4vGGA&s" 
                alt="Palazzo Gucci" 
                className="h-14 md:h-16 w-auto object-contain filter invert mix-blend-screen opacity-90"
            />
        </div>
      </div>

      {/* Copyright */}
      <div className="px-4 text-center w-full">
        <p className="text-[10px] md:text-[11px] text-white font-sans font-medium tracking-wide">
          &copy; 2016 - 2025 Guccio Gucci S.p.A. - All rights reserved. SIAE LICENCE # 2294/I/1936 and 5647/I/1936
        </p>
      </div>
    </footer>
  );
};

export default Footer;
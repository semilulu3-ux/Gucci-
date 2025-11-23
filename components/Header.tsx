import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-center items-center bg-gradient-to-b from-black/80 to-transparent text-white">
      {/* Center: Logo */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif tracking-[0.15em] text-white">
          GUCCI
        </h1>
      </div>
    </header>
  );
};

export default Header;
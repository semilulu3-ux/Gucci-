import React, { useState, useEffect } from 'react';

const PRODUCT_IMAGES = [
  'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1756395933/841290_FAFE7_7541_001_055_0000_Light-GG-Marmont-mini-shoulder-bag.jpg',
  'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1756395931/841290_FAFE7_1041_001_055_0000_Light-GG-Marmont-mini-shoulder-bag.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1757520039/857797_CLG30_9511_001_095_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1757520038/857797_CLG30_5235_001_095_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1754571607/857797_CLG30_1000_001_095_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1756191610/856997_F1400_2700_001_090_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1756191611/856997_F1400_5604_001_090_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1759771867/856994_FAFMW_1601_001_090_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1753977672/857963_AAF1Z_7552_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1753977674/857963_AAF2F_9163_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1754571611/857963_AAF1Z_3150_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1747327503/853971_FAFFQ_8864_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1680111107/746251_UAAAY_1092_001_066_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1680086761/746124_UAAAY_2548_001_071_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1761839103/857362_AAF0P_2118_001_079_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1757943003/857622_AAF0P_7702_001_068_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1758299442/860787_AAEE7_3403_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1758210306/857362_AAF0P_9810_001_078_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1747908943/815118_FAD6L_9758_001_077_0061_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1756190714/837280_AAFTQ_1126_001_055_0016_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1758645009/837280_AAFV0_8106_001_055_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1756190720/837280_AAFTT_9542_001_055_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1757336405/837280_AAFV1_6809_001_055_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1756190718/837280_AAFTR_5909_001_055_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1761821103/853971_AAF2H_1060_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1756190726/841294_FAFFA_8541_001_070_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1757607304/841341_FAFFA_8541_001_078_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1700762461/764961_96IWG_8745_001_080_0000_Light.jpg',
  'https://images.ctfassets.net/brzb6u29244a/fFFK1pBjONMTnA8gNCv69/41dbf1fb662e94e96050f6eafa9ea5e7/HeroCategory-Mobile_Gucci-HORSEBIT-JWL-OCT25-2025-06-12-15-05-21-B-R8-S4-V03_001_Default.png?w=1024&fm=avif&q=50',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1713285139/796178_J8540_5702_001_100_0025_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1744118103/796174_J8540_5702_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1741333533/837586_J8540_5702_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1708965992/786547_JAAGR_8523_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1713543372/795651_J8500_8000_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1748967310/831316_J8500_8000_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1713285128/795810_J8500_8000_001_100_0022_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1741887005/832319_J8568_9066_001_100_0000_Light.jpg',
  'https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1678751218/729412_J8540_8000_001_100_0000_Light.jpg'
];

const ProductRow: React.FC = () => {
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Function to generate 9 unique random images from the source list for a 3x3 grid
    const updateImages = () => {
      // Create a shallow copy to shuffle
      const shuffled = [...PRODUCT_IMAGES];
      
      // Fisher-Yates Shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Slice the first 9 unique images
      return shuffled.slice(0, 9);
    };

    // Set initial images
    setDisplayImages(updateImages());

    const intervalId = setInterval(() => {
      // 1. Start fade out animation
      setIsFading(true);

      // 2. Wait for staggered fade out to complete
      // 9 items * 150ms staggered delay = 1350ms offset for last item.
      // + 500ms duration = ~1850ms total.
      // We'll use 1500ms as a good midpoint for the swap to start feeling "sequential"
      setTimeout(() => {
        setDisplayImages(updateImages());
        setIsFading(false);
      }, 1500);

    }, 5000); // 5 seconds cycle

    return () => clearInterval(intervalId);
  }, []);

  // Don't render until we have images loaded
  if (displayImages.length === 0) return null;

  return (
    <div className="w-full max-w-[1000px] mx-auto py-12 md:py-24 px-4 z-10 relative animate-fade-in">
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {displayImages.map((imgSrc, index) => (
          <div 
            key={index} 
            className="group relative aspect-square bg-white cursor-pointer transition-all duration-500 overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl"
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-20" />
            
            <img 
              src={imgSrc} 
              alt={`Gucci Showcase ${index + 1}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`
                w-full h-full object-contain p-4 z-10 
                transition-all duration-500 ease-in-out
                ${isFading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}
                group-hover:scale-110
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRow;
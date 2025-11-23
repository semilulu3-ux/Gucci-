import React, { useEffect, useState } from 'react';

interface TimerProps {
  durationSeconds: number;
  onExpire: () => void;
}

const Timer: React.FC<TimerProps> = ({ durationSeconds, onExpire }) => {
  // Initialize timer directly with durationSeconds.
  // This ensures the timer resets every time the component is mounted (e.g., page reload or return).
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);

  useEffect(() => {
    // Clear legacy storage key if it exists to ensure clean behavior
    localStorage.removeItem('gucci_timer_target_timestamp');

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          onExpire();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in text-center">
      <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4 px-4">
        Proses sedang Berjalan , silahkan tunggu sebentar
      </span>
      <div className="text-5xl md:text-6xl font-serif font-thin tabular-nums tracking-widest text-white drop-shadow-2xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default Timer;
import React, { useEffect, useState } from 'react';

interface TimerProps {
  durationSeconds: number;
  onExpire: () => void;
}

const Timer: React.FC<TimerProps> = ({ durationSeconds, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);

  useEffect(() => {
    // Key to store the target timestamp in localStorage
    const STORAGE_KEY = 'gucci_agenda_timer_v3';
    
    // 1. Get current time
    const now = Date.now();
    
    // 2. Retrieve stored target
    let targetTimestamp = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

    // 3. Logic: 
    // - If no target exists (first load), SET target.
    // - If target exists but is in the PAST (expired), RESET target to new duration (restart on refresh).
    // - If target exists and is in FUTURE, keep using it (persist on refresh).
    
    if (!targetTimestamp || now > targetTimestamp) {
        // Create new target
        targetTimestamp = now + (durationSeconds * 1000);
        localStorage.setItem(STORAGE_KEY, targetTimestamp.toString());
    }

    const tick = () => {
      const currentNow = Date.now();
      const secondsRemaining = Math.max(0, Math.ceil((targetTimestamp - currentNow) / 1000));

      setTimeLeft(secondsRemaining);

      if (secondsRemaining <= 0) {
        onExpire();
        // We do NOT clear storage here. We leave the old timestamp.
        // This ensures if they close tab and come back immediately, it still shows finished.
        // But if they refresh the page (component remounts), the check above (now > targetTimestamp) will be true, triggering a restart.
      }
    };

    // Run immediately to prevent flash of initial state
    tick();

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [durationSeconds, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (timeLeft <= 0) return null;

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
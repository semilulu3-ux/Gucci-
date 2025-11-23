import React, { useState, useEffect } from 'react';

const SYSTEM_MESSAGES = [
  "INITIALIZING_DAEMON_V2.4...",
  "VERIFYING_HANDSHAKE_PROTOCOL: OK",
  "ALLOCATING_MEMORY_ADDRESS_0x8F4A...",
  "DECRYPTING_SECURE_ASSETS_BUNDLE...",
  "OPTIMIZING_RENDER_THREAD_PRIORITY_HIGH...",
  "SYNCING_NODE_CLUSTER_REPLICAS [12/12]...",
  "FETCHING_MANIFEST_DATA_FROM_PROXY...",
  "BYPASSING_SECURE_GATEWAY_LAYER_3...",
  "ESTABLISHING_ENCRYPTED_TUNNEL...",
  "FLUSHING_BUFFER_CACHE_MEMORY...",
  "RECALIBRATING_TIMING_ENGINE_MS...",
  "LOADING_MODULE_GUCCI_VISUALIZER...",
  "CHECKING_INTEGRITY_HASH_SHA256...",
  "EXECUTING_SCRIPT_RUN_MAIN.JS...",
  "PING_REMOTE_SERVER: 14ms",
  "UPDATING_REGISTRY_KEYS_SYSTEM_ROOT..."
];

const HEX_CHARS = "0123456789ABCDEF";

const generateHex = () => {
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += HEX_CHARS.charAt(Math.floor(Math.random() * HEX_CHARS.length));
  }
  return result;
};

const SystemLog: React.FC = () => {
  const [currentLine, setCurrentLine] = useState("SYSTEM_READY");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCmd = SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)];
      const hex = generateHex();
      
      setCurrentLine(`PTR_0x${hex} > ${randomCmd}`);
    }, 150); // Updates very fast to look like "working" code

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 mt-8 mb-4 z-10 relative animate-fade-in">
      {/* The "Small Long Bar" Container */}
      <div className="w-full h-8 bg-black border border-green-900/30 flex items-center px-4 overflow-hidden shadow-[0_0_10px_rgba(0,255,0,0.05)]">
        
        {/* Blinking Cursor / Status Indicator */}
        <div className="flex-shrink-0 w-1.5 h-4 bg-green-500/80 animate-pulse mr-3"></div>
        
        {/* Scrolling Text */}
        <div className="font-mono text-[10px] md:text-xs text-green-500/80 tracking-wider truncate uppercase">
          <span className="opacity-50 mr-2">$ root@gucci_sys:</span>
          {currentLine}
        </div>
        
      </div>
    </div>
  );
};

export default SystemLog;
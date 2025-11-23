import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, ShieldCheck } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOOT_SEQUENCE = [
  "INITIALIZING_KERNEL_V4.9.2...",
  "LOADING_MODULES: [CORE, NET, CRYPTO, GFX]...",
  "MOUNTING_VIRTUAL_FILESYSTEM...",
  "VERIFYING_ROOT_ACCESS... [GRANTED]",
  "ESTABLISHING_SECURE_UPLINK_TO_NODE_01...",
  "BYPASSING_FIREWALL_LAYER_7...",
  "INJECTING_PAYLOAD_BUNDLE_0x8F...",
  "OPTIMIZING_RUNTIME_ENVIRONMENT...",
  "SYSTEM_READY."
];

const TERMINAL_LOGS = [
  "executing_script(main.js) --force",
  "allocating_heap_memory: 4096MB",
  "decrypting_asset_package_v2.tar.gz",
  "syncing_database_shards [12/12]",
  "compiling_shaders... DONE",
  "fetching_remote_config... 200 OK",
  "analyzing_network_traffic_packets...",
  "updating_registry_keys: HKEY_LOCAL_MACHINE",
  "parsing_json_manifest_data...",
  "buffer_overflow_protection: ENABLED",
  "cleaning_up_temp_files...",
  "generating_access_token_v3...",
  "handshake_protocol_initiated...",
  "resolving_dns_proxy_chain...",
  "loading_texture_maps_4k...",
  "verifying_checksum_integrity...",
  "installing_dependency: @gucci/visualizer",
  "running_background_daemon_process...",
  "exporting_log_dump_to_server...",
  "checking_cpu_temperature... 45C [NORMAL]",
  "recalibrating_physics_engine...",
  "user_session_authenticated: ADMIN"
];

const HEX_CHARS = "0123456789ABCDEF";
const generateHex = () => Array.from({length: 8}, () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]).join('');

const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset logs on open
      setLogs(BOOT_SEQUENCE.map(line => `[BOOT] ${line}`));
      
      const interval = setInterval(() => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
        const randomLog = TERMINAL_LOGS[Math.floor(Math.random() * TERMINAL_LOGS.length)];
        const hex = generateHex();
        const newLine = `[${timestamp}] 0x${hex} > ${randomLog}`;

        setLogs(prev => {
          const newLogs = [...prev, newLine];
          // Keep max 50 lines for performance
          if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
          return newLogs;
        });
      }, 80); // Fast scrolling

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col font-mono text-green-500 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-green-900 bg-green-900/10">
        <div className="flex items-center gap-2">
          <Terminal size={16} />
          <span className="text-xs tracking-widest font-bold">ROOT_ACCESS_TERMINAL // P4P_SYSTEM</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-green-500 hover:text-black transition-colors rounded text-xs uppercase border border-green-500/50 px-3"
        >
          [ Close Session ]
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        
        {/* Left Panel: Stats (Hidden on mobile) */}
        <div className="hidden md:flex flex-col w-64 gap-4 border-r border-green-900/30 pr-4">
          <div className="border border-green-900/50 p-4 bg-green-900/5">
            <div className="flex items-center gap-2 mb-2 text-green-400">
              <Cpu size={16} />
              <span className="text-xs font-bold">SYSTEM RESOURCES</span>
            </div>
            <div className="space-y-2 text-[10px] opacity-70">
              <div className="flex justify-between"><span>CPU_USAGE:</span><span>{Math.floor(Math.random() * 30) + 10}%</span></div>
              <div className="flex justify-between"><span>RAM_ALLOC:</span><span>1024MB</span></div>
              <div className="flex justify-between"><span>UPTIME:</span><span>04:22:19</span></div>
              <div className="w-full h-1 bg-green-900 mt-1"><div className="w-[45%] h-full bg-green-500 animate-pulse"></div></div>
            </div>
          </div>

          <div className="border border-green-900/50 p-4 bg-green-900/5">
             <div className="flex items-center gap-2 mb-2 text-green-400">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold">SECURITY STATUS</span>
            </div>
            <div className="text-[10px] text-green-300">
              <p>>> ENCRYPTION: AES-256</p>
              <p>>> FIREWALL: ACTIVE</p>
              <p>>> IP_MASK: ENABLED</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Scrolling Logs */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto font-mono text-[10px] md:text-sm space-y-1 scrollbar-hide"
        >
          {logs.map((log, index) => (
            <div key={index} className="break-all border-l-2 border-transparent hover:border-green-500 pl-2 hover:bg-green-500/5">
              <span className="opacity-50 mr-2">$</span>
              {log}
            </div>
          ))}
          <div className="flex items-center gap-2 animate-pulse mt-4">
            <span className="w-2 h-4 bg-green-500 block"></span>
            <span className="text-green-500">_AWAITING_INPUT</span>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="border-t border-green-900/30 p-2 text-[10px] flex justify-between opacity-50 px-4">
        <span>PID: 84921</span>
        <span>MEM: 0x8F2A...</span>
        <span>CONNECTED: TRUE</span>
      </div>
    </div>
  );
};

export default TerminalModal;
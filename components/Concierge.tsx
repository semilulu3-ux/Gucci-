import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message, ChatStatus } from '../types';

interface ConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

const Concierge: React.FC<ConciergeProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Welcome to The Icons. I am your personal concierge. How may I assist you with this collection today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === ChatStatus.LOADING) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setStatus(ChatStatus.LOADING);

    // Prepare history for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    try {
        const responseText = await sendMessageToGemini(userMsg.text, history);
        
        const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setStatus(ChatStatus.IDLE);
    } catch (error) {
        setStatus(ChatStatus.ERROR);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-black border-l border-gray-800 shadow-2xl z-[60] flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-900">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Client Concierge</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-white text-right'
                  : 'text-gray-300 font-serif italic'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-700 mt-1 uppercase tracking-wider">
               {msg.role === 'user' ? 'You' : 'Concierge'}
            </span>
          </div>
        ))}
        {status === ChatStatus.LOADING && (
          <div className="flex items-start">
            <div className="text-xs text-gray-500 font-serif italic animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-900 bg-black">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Inquire about this piece..."
            className="w-full bg-transparent border-b border-gray-700 py-3 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={status === ChatStatus.LOADING}
            className="absolute right-0 top-3 text-gray-500 hover:text-white transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Concierge;
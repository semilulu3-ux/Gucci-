import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface ConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Concierge: React.FC<ConciergeProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Buonasera. Welcome to Gucci Client Services. I am your personal concierge. How may I assist you with our collections today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await geminiService.sendMessage(userMessage.text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I am having trouble connecting to the network right now.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-black border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/90 backdrop-blur-sm absolute top-0 w-full z-20">
        <div>
          <h2 className="text-xl font-serif tracking-widest text-white">CONCIERGE</h2>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">Gucci Client Services</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">
          <X size={24} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto pt-28 pb-32 px-6 space-y-6 h-full bg-zinc-950/80">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[85%] ${msg.sender === 'user' ? 'bg-white text-black' : 'bg-zinc-900/80 text-gray-200 border border-white/10'} p-4 text-sm font-sans leading-relaxed shadow-lg`}>
              <div className="flex items-center gap-2 mb-2 border-b border-current border-opacity-10 pb-2 opacity-60">
                {msg.sender === 'user' ? <User size={12} /> : <Sparkles size={12} />}
                <span className="text-[9px] uppercase tracking-wider font-bold">
                  {msg.sender === 'user' ? 'You' : 'Gucci Concierge'}
                </span>
              </div>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start animate-fade-in">
            <div className="bg-zinc-900 border border-white/10 p-4 min-w-[100px]">
              <div className="flex space-x-2 items-center justify-center h-4">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full p-6 bg-black border-t border-white/10 z-20">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your inquiry..."
            className="w-full bg-zinc-900 text-white placeholder-gray-500 px-4 py-4 pr-12 border border-white/10 focus:border-white/30 focus:outline-none text-sm tracking-wide transition-colors"
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-3 p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-3">
          <p className="text-[9px] text-gray-600 tracking-widest uppercase">
            Powered by Google Gemini
          </p>
        </div>
      </div>
    </div>
  );
};

export default Concierge;

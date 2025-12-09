import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, RefreshCw, AlertCircle } from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  chatInstance: Chat | null;
  initialMessage?: string;
  placeholder?: string;
  onReset?: () => void;
  mode: 'assistant' | 'simulation';
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  chatInstance, 
  initialMessage, 
  placeholder = "Escribe tu mensaje...", 
  onReset,
  mode
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: initialMessage,
        timestamp: new Date()
      }]);
    } else {
        setMessages([]);
    }
  }, [initialMessage, chatInstance]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatInstance) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await sendMessageStream(chatInstance, userMsg.text);
      
      const botMsgId = (Date.now() + 1).toString();
      let fullText = '';
      
      // Add initial empty bot message
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      for await (const chunk of stream) {
          const content = chunk as GenerateContentResponse;
          if (content.text) {
              fullText += content.text;
              setMessages(prev => prev.map(msg => 
                  msg.id === botMsgId ? { ...msg, text: fullText } : msg
              ));
          }
      }

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Lo siento, hubo un error al procesar tu solicitud. Por favor intenta de nuevo.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-40px)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className={`p-4 border-b border-gray-100 flex justify-between items-center ${mode === 'simulation' ? 'bg-indigo-50' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${mode === 'simulation' ? 'bg-indigo-100 text-indigo-700' : 'bg-legal-100 text-legal-700'}`}>
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
                {mode === 'simulation' ? 'Juez de Control (IA)' : 'Asistente Legal'}
            </h3>
            <p className="text-xs text-gray-500">
                {mode === 'simulation' ? 'Simulando audiencia' : 'Responde sobre el sistema acusatorio'}
            </p>
          </div>
        </div>
        {onReset && (
          <button 
            onClick={onReset}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Reiniciar chat"
          >
            <RefreshCw size={18} />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <Bot size={48} className="mb-4 opacity-20" />
                <p>Comienza la conversación para aprender más.</p>
            </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                ${msg.role === 'user' ? 'bg-legal-600 text-white' : 'bg-white border border-gray-200 text-legal-600'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              
              <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-legal-600 text-white rounded-tr-none' 
                  : msg.isError 
                    ? 'bg-red-50 text-red-800 border border-red-100 rounded-tl-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                 {msg.isError ? (
                    <div className="flex items-center gap-2">
                        <AlertCircle size={16} />
                        {msg.text}
                    </div>
                 ) : (
                    <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-strong:text-current">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                 )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex flex-row gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-legal-600 flex items-center justify-center mt-1">
                    <Bot size={14} />
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-legal-500 focus:border-legal-500 block p-3.5 pr-12 disabled:opacity-50 transition-all outline-none focus:ring-2 focus:ring-opacity-20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-legal-600 text-white rounded-lg hover:bg-legal-700 disabled:opacity-50 disabled:hover:bg-legal-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          La IA puede cometer errores. Verifica la información legal importante.
        </p>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ChatInterface } from './components/ChatInterface';
import { LearnSection } from './components/LearnSection';
import { HomeSection } from './components/HomeSection';
import { SimulationSection } from './components/SimulationSection';
import { ViewState } from './types';
import { createLegalChat } from './services/geminiService';
import { Chat } from '@google/genai';

export default function App() {
  const [currentView, setView] = useState<ViewState>('home');
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);

  // Initialize general chat only when entering chat view for the first time
  React.useEffect(() => {
    if (currentView === 'chat' && !chatInstance) {
      setChatInstance(createLegalChat());
    }
  }, [currentView, chatInstance]);

  const resetChat = () => {
    setChatInstance(createLegalChat());
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans text-gray-900">
      <Navigation currentView={currentView} setView={setView} />
      
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full w-full overflow-y-auto scrollbar-hide">
          {currentView === 'home' && (
            <HomeSection setView={setView} />
          )}

          {currentView === 'learn' && (
            <LearnSection />
          )}

          {currentView === 'chat' && (
            <div className="max-w-4xl mx-auto h-full p-4 flex flex-col justify-center">
              <ChatInterface 
                chatInstance={chatInstance} 
                onReset={resetChat}
                mode="assistant"
                initialMessage="¡Hola! Soy tu asistente legal. ¿En qué duda sobre el Sistema Penal Acusatorio te puedo ayudar hoy?"
              />
            </div>
          )}

          {currentView === 'simulation' && (
            <SimulationSection />
          )}
        </div>
      </main>
    </div>
  );
}
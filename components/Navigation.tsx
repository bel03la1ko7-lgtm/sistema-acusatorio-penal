import React from 'react';
import { BookOpen, MessageSquare, Shield, Home } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'learn', label: 'Aprender', icon: BookOpen },
    { id: 'chat', label: 'Asistente IA', icon: MessageSquare },
    { id: 'simulation', label: 'Simulador', icon: Shield },
  ] as const;

  return (
    <nav className="bg-white border-t border-gray-200 md:border-t-0 md:border-r w-full md:w-64 md:h-screen sticky bottom-0 md:top-0 z-50 flex-shrink-0">
      <div className="p-4 hidden md:block border-b border-gray-200">
        <h1 className="text-xl font-serif font-bold text-legal-900 flex items-center gap-2">
          <Shield className="w-6 h-6 text-legal-600" />
          Sistema Penal Acusatorio
        </h1>
      </div>
      
      <div className="flex md:flex-col justify-around md:justify-start p-2 md:p-4 gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col md:flex-row items-center md:gap-3 p-2 md:px-4 md:py-3 rounded-lg transition-colors w-full
              ${currentView === item.id 
                ? 'bg-legal-100 text-legal-800 font-medium' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <item.icon className="w-6 h-6 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="hidden md:block absolute bottom-0 p-4 w-full">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-3">
          <p className="text-xs text-blue-800 font-medium mb-1">Potenciado por Gemini</p>
          <p className="text-[10px] text-blue-600">Modelo: gemini-2.5-flash</p>
        </div>
        <div className="text-center pt-2 border-t border-gray-100">
             <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Desarrollado por</p>
             <p className="text-[10px] text-legal-600 font-bold mt-0.5 uppercase">Iris L, Evelyn y Alexis</p>
        </div>
      </div>
    </nav>
  );
};
import React from 'react';
import { Scale, BookOpen, MessageSquare, Shield, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface HomeSectionProps {
  setView: (view: ViewState) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ setView }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center p-3 bg-legal-100 rounded-full mb-4">
          <Scale className="w-10 h-10 text-legal-700" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-legal-900 tracking-tight">
          Sistema Penal Acusatorio
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Una plataforma integral para estudiantes y profesionales del derecho. 
          Aprende los principios, domina las etapas procesales y practica tus habilidades 
          de litigación con inteligencia artificial.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <button 
          onClick={() => setView('learn')}
          className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-legal-300 transition-all text-left"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Biblioteca Legal</h3>
          <p className="text-sm text-gray-500 mb-4">
            Explora temas desde principios rectores hasta medios de impugnación.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
            Comenzar a leer <ArrowRight size={16} className="ml-1" />
          </div>
        </button>

        <button 
          onClick={() => setView('chat')}
          className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-legal-300 transition-all text-left"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Asistente IA</h3>
          <p className="text-sm text-gray-500 mb-4">
            Resuelve dudas específicas sobre procedimientos y artículos en tiempo real.
          </p>
          <div className="flex items-center text-purple-600 text-sm font-medium group-hover:gap-2 transition-all">
            Consultar ahora <ArrowRight size={16} className="ml-1" />
          </div>
        </button>

        <button 
          onClick={() => setView('simulation')}
          className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-legal-300 transition-all text-left"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Simulador de Audiencia</h3>
          <p className="text-sm text-gray-500 mb-4">
            Roleplay interactivo donde la IA actúa como Juez o contraparte.
          </p>
          <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all">
            Iniciar simulación <ArrowRight size={16} className="ml-1" />
          </div>
        </button>
      </div>

      <div className="bg-legal-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-legal-900 mb-2">¿Nuevo en el sistema?</h4>
          <p className="text-legal-700 text-sm">
            El Sistema Penal Acusatorio se basa en la oralidad, publicidad, contradicción, concentración, continuidad e inmediación. 
            Empieza por conocer los fundamentos antes de pasar a la práctica.
          </p>
        </div>
        <button 
          onClick={() => setView('learn')}
          className="px-6 py-3 bg-legal-800 text-white font-medium rounded-lg hover:bg-legal-900 transition-colors shadow-lg shadow-legal-900/20 whitespace-nowrap"
        >
          Ir al Temario
        </button>
      </div>

      <div className="pt-8 text-center text-gray-400 text-xs pb-4">
         <p>Desarrollado por <span className="font-bold text-gray-600 uppercase">Iris L, Evelyn y Alexis</span></p>
      </div>
    </div>
  );
};
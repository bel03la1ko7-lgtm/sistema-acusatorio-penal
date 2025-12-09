import React, { useState } from 'react';
import { Gavel, Play, UserCheck, AlertTriangle } from 'lucide-react';
import { ChatInterface } from './ChatInterface';
import { createSimulationChat } from '../services/geminiService';
import { SimulationScenario } from '../types';
import { Chat } from '@google/genai';

const scenarios: SimulationScenario[] = [
  {
    id: 'control-detencion',
    title: 'Audiencia de Control de Detención',
    description: 'Actúa como la Defensa. Debes argumentar la ilegalidad de la detención de tu cliente por falta de flagrancia.',
    difficulty: 'Principiante',
    systemInstruction: `Actúa como un Juez de Control estricto pero justo en una audiencia de Control de Detención en México. 
    El usuario es el Abogado Defensor. 
    El Ministerio Público (simulado por ti brevemente) acaba de exponer que la detención fue en flagrancia.
    Tu trabajo es cuestionar los argumentos de la defensa (el usuario).
    Si el usuario argumenta bien basándose en el artículo 16 constitucional y la falta de inmediatez, concede la libertad. Si no, ratifica la detención.
    Mantén el protocolo de audiencia.`
  },
  {
    id: 'formulacion-imputacion',
    title: 'Formulación de Imputación',
    description: 'Eres el Ministerio Público. Debes formular imputación a un detenido por el delito de Robo Calificado.',
    difficulty: 'Intermedio',
    systemInstruction: `Actúa como el Juez de Control. El usuario es el Ministerio Público.
    Pide al usuario que proceda con la formulación de imputación.
    Evalúa si cumple con los requisitos: hecho, clasificación jurídica, grado de intervención, y nombres de acusadores.
    Si olvida algo, el Defensor (simulado por ti) objetará o pedirá aclaraciones.`
  },
  {
    id: 'interrogatorio',
    title: 'Interrogatorio a Testigo',
    description: 'Practica las técnicas de litigación oral interrogando a un testigo hostil.',
    difficulty: 'Avanzado',
    systemInstruction: `Actúa como un testigo hostil en un juicio oral por homicidio. 
    El usuario es el abogado que te interroga.
    Responde con evasivas o respuestas cortas.
    Si el usuario hace preguntas sugestivas (que sugieren la respuesta), el Juez (simulado por el sistema) debería objetar, pero tú solo responde como el testigo.
    El objetivo del usuario es sacar la verdad sobre lo que viste esa noche.`
  }
];

export const SimulationSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(null);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);

  const startScenario = (scenario: SimulationScenario) => {
    setActiveScenario(scenario);
    const chat = createSimulationChat(scenario.systemInstruction);
    setChatInstance(chat);
  };

  const resetSimulation = () => {
    setActiveScenario(null);
    setChatInstance(null);
  };

  if (activeScenario && chatInstance) {
    return (
      <div className="h-full max-w-5xl mx-auto py-4">
        <button 
          onClick={resetSimulation}
          className="mb-4 text-sm text-gray-500 hover:text-legal-600 flex items-center gap-1"
        >
          ← Volver al menú de simulaciones
        </button>
        <div className="mb-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
          <h2 className="font-bold text-indigo-900 text-lg flex items-center gap-2">
            <Gavel className="w-5 h-5" />
            {activeScenario.title}
          </h2>
          <p className="text-indigo-700 text-sm mt-1">{activeScenario.description}</p>
        </div>
        <ChatInterface 
          chatInstance={chatInstance} 
          mode="simulation"
          initialMessage="La audiencia está en sesión. Adelante con su intervención."
          placeholder="Escriba su argumento o pregunta..."
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-legal-900">Simulador de Audiencias</h2>
        <p className="text-gray-600 mt-2">Pon a prueba tus conocimientos en escenarios prácticos controlados por IA.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                {scenario.id === 'interrogatorio' ? <UserCheck size={24} /> : 
                 scenario.id === 'control-detencion' ? <AlertTriangle size={24} /> : 
                 <Gavel size={24} />}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border
                ${scenario.difficulty === 'Principiante' ? 'bg-green-50 text-green-700 border-green-200' :
                  scenario.difficulty === 'Intermedio' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'}`}>
                {scenario.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{scenario.title}</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">{scenario.description}</p>
            
            <button 
              onClick={() => startScenario(scenario)}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Play size={16} /> Iniciar Simulación
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
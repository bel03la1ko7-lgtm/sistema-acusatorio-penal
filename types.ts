import React from 'react';

export type ViewState = 'home' | 'learn' | 'chat' | 'simulation';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  systemInstruction: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
}

export interface Topic {
  id: string;
  title: string;
  content: string | string[]; // Can be a paragraph or a list of items
  subtopics?: { title: string; details: string[] }[];
}

export interface LearnCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  topics: Topic[];
}
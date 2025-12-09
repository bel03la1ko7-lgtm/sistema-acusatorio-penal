import React, { useState } from 'react';
import { Scale, BookOpen, Users, ChevronRight, FileText, Gavel, Shield } from 'lucide-react';
import { LearnCategory, Topic } from '../types';

const learnData: LearnCategory[] = [
  {
    id: 'sistema-general',
    title: '1. Sistema Penal Acusatorio',
    icon: Scale,
    topics: [
      {
        id: 'que-es',
        title: '¿Qué es el Sistema Penal Acusatorio?',
        content: 'Es un sistema jurídico penal en el que las partes (Fiscalía y Defensa) se enfrentan en igualdad de oportunidades ante un juez imparcial, quien, con base en las pruebas y argumentos, decide si condena o absuelve. Se caracteriza por la separación de funciones: uno investiga y acusa, otro defiende y un tercero juzga.'
      },
      {
        id: 'principios',
        title: 'Principios Rectores',
        content: '',
        subtopics: [
          { title: 'Oralidad', details: ['Las audiencias se desarrollan de viva voz.', 'El juez solo valora lo que escucha y ve en la audiencia.'] },
          { title: 'Publicidad', details: ['Cualquier persona puede entrar a las audiencias (salvo excepciones legales).', 'Fomenta la transparencia judicial.'] },
          { title: 'Contradicción', details: ['Las partes pueden controvertir las pruebas y argumentos de la contraparte.', 'Derecho a interrogar y contrainterrogar.'] },
          { title: 'Inmediación', details: ['El juez debe estar presente físicamente en todas las audiencias.', 'El juez debe percibir directamente las pruebas (testigos, peritos).'] },
          { title: 'Concentración', details: ['Las audiencias deben desarrollarse preferentemente en un mismo día o días consecutivos hasta su conclusión.'] },
          { title: 'Continuidad', details: ['Las audiencias no deben interrumpirse, asegurando una justicia pronta.'] },
          { title: 'Presunción de Inocencia', details: ['Toda persona es inocente hasta que se demuestre lo contrario mediante sentencia firme.'] }
        ]
      },
      {
        id: 'diferencia',
        title: 'Proceso vs. Procedimiento vs. Juicio',
        content: 'Es común confundirlos, pero tienen alcances distintos:\n\n* **Procedimiento:** Inicia con la denuncia/querella y termina con la sentencia firme.\n* **Proceso:** Inicia con la audiencia inicial (judicialización) y termina con la sentencia.\n* **Juicio:** Es solo la etapa final (Etapa de Juicio Oral) donde se decide la culpabilidad.'
      },
      {
        id: 'objetivos',
        title: 'Objetivos del Sistema (Art. 20 Const.)',
        content: '1. El esclarecimiento de los hechos.\n2. Proteger al inocente.\n3. Procurar que el culpable no quede impune.\n4. Que se repare el daño.'
      }
    ]
  },
  {
    id: 'etapas',
    title: '2. Etapas del Proceso Penal',
    icon: FileText,
    topics: [
      {
        id: 'investigacion',
        title: 'A. Etapa de Investigación',
        content: 'Se divide en dos fases:\n\n1. **Investigación Inicial:** Comienza con la denuncia o querella y concluye cuando el imputado queda a disposición del Juez de Control. Aquí el MP reúne indicios.\n2. **Investigación Complementaria:** Comienza tras la formulación de imputación y concluye con el cierre de la investigación declarado por el Juez.',
        subtopics: [
            { title: 'Flagrancia', details: ['Detención en el momento de cometer el delito o inmediatamente después con persecución ininterrumpida.'] },
            { title: 'Caso Urgente', details: ['Ordenada por MP cuando hay riesgo de fuga y es delito grave, y no se puede acudir ante Juez.'] }
        ]
      },
      {
        id: 'audiencia-inicial',
        title: 'B. Audiencia Inicial',
        content: 'Es la primera comparecencia ante el Juez. Sus pasos fundamentales son:',
        subtopics: [
          { title: '1. Control de Detención', details: ['Se verifica si la detención fue legal (apegada a DDHH y Constitución).'] },
          { title: '2. Formulación de Imputación', details: ['El MP comunica al investigado que lo investiga por un hecho delictivo.'] },
          { title: '3. Declaración del Imputado', details: ['Oportunidad para contestar el cargo (derecho a guardar silencio).'] },
          { title: '4. Vinculación a Proceso', details: ['El Juez decide si hay datos suficientes para iniciar un proceso formal.'] },
          { title: '5. Medidas Cautelares', details: ['Para asegurar la presencia del imputado (ej. prisión preventiva, firma periódica).'] },
          { title: '6. Plazo de Cierre', details: ['Se fija tiempo para que MP y Defensa terminen su investigación.'] }
        ]
      },
      {
        id: 'intermedia',
        title: 'C. Etapa Intermedia',
        content: 'Su objeto es el ofrecimiento y admisión de los medios de prueba, así como la depuración de los hechos controvertidos.',
        subtopics: [
            { title: 'Escrito de Acusación', details: ['El MP presenta formalmente la acusación.'] },
            { title: 'Descubrimiento Probatorio', details: ['Las partes deben entregarse copia de todos sus registros de investigación.'] },
            { title: 'Acuerdos Probatorios', details: ['Pactos para dar por probados hechos notorios y no discutirlos en juicio.'] },
            { title: 'Auto de Apertura', details: ['Resolución del Juez que indica qué pruebas pasan a Juicio Oral.'] }
        ]
      },
      {
        id: 'juicio-oral',
        title: 'D. Juicio Oral',
        content: 'Es la etapa de decisión de las cuestiones esenciales del proceso. Se realiza ante el Tribunal de Enjuiciamiento.',
        subtopics: [
            { title: 'Alegatos de Apertura', details: ['Presentación de la teoría del caso de cada parte.'] },
            { title: 'Desahogo de Pruebas', details: ['Interrogatorio y contrainterrogatorio de testigos y peritos.'] },
            { title: 'Alegatos de Clausura', details: ['Conclusiones finales argumentativas.'] },
            { title: 'Deliberación y Fallo', details: ['Absolutorio o Condenatorio.'] },
            { title: 'Individualización de Sanción', details: ['Audiencia para fijar los años de pena y reparación del daño.'] }
        ]
      }
    ]
  },
  {
    id: 'sujetos-recursos',
    title: '3. Sujetos, Autoridades y Recursos',
    icon: Users,
    topics: [
      {
        id: 'sujetos',
        title: 'Sujetos Procesales',
        content: '',
        subtopics: [
            { title: 'Ministerio Público', details: ['Conduce la investigación, coordina a las policías y ejerce la acción penal.'] },
            { title: 'Víctima u Ofendido', details: ['Tiene derecho a la verdad, justicia y reparación del daño. Cuenta con Asesor Jurídico.'] },
            { title: 'Imputado', details: ['Persona señalada de cometer el delito. Tiene derecho a defensa técnica.'] },
            { title: 'Defensor', details: ['Licenciado en derecho que asiste al imputado.'] },
            { title: 'Juez de Control', details: ['Interviene desde el inicio hasta el auto de apertura a juicio. Cuida los derechos humanos.'] },
            { title: 'Tribunal de Enjuiciamiento', details: ['1 o 3 jueces que presencian el juicio y dictan sentencia.'] }
        ]
      },
      {
        id: 'recursos',
        title: 'Medios de Impugnación',
        content: 'Herramientas para combatir resoluciones judiciales.',
        subtopics: [
            { title: 'Revocación', details: ['Para resoluciones de mero trámite sin sustanciación.'] },
            { title: 'Apelación', details: ['Contra resoluciones importantes (vinculación, exclusión de pruebas, sentencia). Lo resuelve el Tribunal de Alzada.'] }
        ]
      },
      {
        id: 'amparo',
        title: 'El Amparo',
        content: 'Medio de control constitucional para proteger derechos fundamentales.',
        subtopics: [
            { title: 'Amparo Indirecto', details: ['Procede contra actos fuera, después o concluido el juicio que afecten sustantivamente derechos (ej. orden de aprehensión, auto de vinculación).'] },
            { title: 'Amparo Directo', details: ['Procede contra sentencias definitivas que ponen fin al juicio.'] }
        ]
      }
    ]
  }
];

export const LearnSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(learnData[0].id);
  const [activeTopic, setActiveTopic] = useState<string>(learnData[0].topics[0].id);

  const currentCategory = learnData.find(c => c.id === activeCategory) || learnData[0];
  const currentTopic = currentCategory.topics.find(t => t.id === activeTopic) || currentCategory.topics[0];

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] md:h-screen bg-legal-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-1/3 md:h-full overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-serif font-bold text-legal-900">Temario</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {learnData.map((category) => (
            <div key={category.id} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveTopic(category.topics[0].id);
                }}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors
                  ${activeCategory === category.id ? 'bg-legal-50 text-legal-800' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <category.icon size={18} />
                <span className="font-semibold text-sm">{category.title}</span>
              </button>

              {activeCategory === category.id && (
                <div className="bg-white py-1">
                  {category.topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setActiveTopic(topic.id)}
                      className={`w-full pl-12 pr-4 py-2 text-sm text-left flex items-center justify-between group
                        ${activeTopic === topic.id 
                          ? 'text-legal-600 font-medium border-l-4 border-legal-600 bg-legal-50/50' 
                          : 'text-gray-500 hover:text-gray-800 border-l-4 border-transparent'}`}
                    >
                      {topic.title}
                      {activeTopic === topic.id && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 h-2/3 md:h-full overflow-y-auto p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 min-h-full md:min-h-0 p-8">
          <div className="mb-6 pb-6 border-b border-gray-100">
            <span className="text-xs font-bold tracking-wider text-legal-500 uppercase mb-2 block">
              {currentCategory.title}
            </span>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              {currentTopic.title}
            </h1>
          </div>

          <div className="prose prose-legal max-w-none">
            {currentTopic.content && (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
                {currentTopic.content}
              </div>
            )}

            {currentTopic.subtopics && (
              <div className="grid gap-6">
                {currentTopic.subtopics.map((sub, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <h3 className="font-bold text-legal-800 mb-3 text-lg flex items-center gap-2">
                      <Shield size={16} className="text-legal-500" />
                      {sub.title}
                    </h3>
                    <ul className="space-y-2">
                      {sub.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-legal-400 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
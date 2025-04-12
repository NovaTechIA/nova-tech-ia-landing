
/**
 * Nova Tech IA - Voice Agent
 * Desarrollado para Santiago Palle, fundador de Nova Tech IA
 * Integración con Vapi para añadir un agente de voz a la web
 */

(function() {
  console.log('Iniciando Nova Tech IA Voice Agent...');

  // Configuración del agente de voz
  const config = {
    agentId: 'd162e6cc-e874-4780-b9c2-c1555d02ada3',
    style: {
      primaryColor: "#0f1e51",
      secondaryColor: "#d4af37",
      textColor: "#ffffff",
      backgroundColor: "#f4f6fb",
      darkShade: "#0a173f",
      lightShade: "#c4c9d6"
    },
    messages: {
      welcome: "¡Habla conmigo! Soy el asistente de Nova Tech IA."
    }
  };

  // Crear los estilos del agente de voz
  function createVoiceAgentStyles() {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      #nova-voice-agent {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9998;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: ${config.style.backgroundColor};
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        width: 320px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      }

      #nova-voice-agent.active {
        display: flex;
      }

      #nova-voice-agent-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9997;
        display: none;
      }

      #nova-voice-agent-backdrop.active {
        display: block;
      }

      #nova-voice-trigger {
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: ${config.style.primaryColor};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 9996;
      }

      @media (max-width: 768px) {
        #nova-voice-trigger {
          bottom: 140px;
        }
      }

      #nova-voice-trigger:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        background-color: ${config.style.darkShade};
      }

      #nova-voice-trigger svg {
        width: 28px;
        height: 28px;
        fill: ${config.style.textColor};
      }

      #nova-voice-agent-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      #nova-voice-agent-title {
        font-size: 18px;
        font-weight: 600;
        color: ${config.style.primaryColor};
      }

      #nova-voice-agent-close {
        background: none;
        border: none;
        font-size: 24px;
        color: ${config.style.primaryColor};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        transition: background-color 0.2s ease;
      }

      #nova-voice-agent-close:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      #nova-voice-agent-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px;
      }

      #nova-voice-agent-message {
        font-size: 16px;
        color: ${config.style.primaryColor};
        text-align: center;
        margin-bottom: 16px;
      }

      #nova-voice-agent-mic {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: ${config.style.secondaryColor};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 16px;
      }

      #nova-voice-agent-mic:hover {
        transform: scale(1.05);
        background-color: ${config.style.secondaryColor}e6;
      }

      #nova-voice-agent-mic.listening {
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
        }
        70% {
          transform: scale(1.05);
          box-shadow: 0 0 0 15px rgba(212, 175, 55, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
        }
      }

      #nova-voice-agent-mic svg {
        width: 32px;
        height: 32px;
        fill: ${config.style.textColor};
      }

      #nova-voice-agent-status {
        font-size: 14px;
        color: ${config.style.primaryColor};
        text-align: center;
      }

      /* Responsive styles */
      @media (max-width: 480px) {
        #nova-voice-agent {
          width: 85%;
          padding: 20px;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Crear los elementos del DOM para el agente de voz
  function createVoiceAgentElements() {
    // Botón trigger para abrir el widget de voz
    const voiceTrigger = document.createElement('div');
    voiceTrigger.id = 'nova-voice-trigger';
    voiceTrigger.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z" fill="currentColor"/>
        <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.93V21H13V18.93C16.39 18.43 19 15.53 19 12H17Z" fill="currentColor"/>
      </svg>
    `;
    document.body.appendChild(voiceTrigger);

    // Backdrop (fondo oscuro) para el widget de voz
    const backdrop = document.createElement('div');
    backdrop.id = 'nova-voice-agent-backdrop';
    document.body.appendChild(backdrop);

    // Widget principal del agente de voz
    const voiceAgent = document.createElement('div');
    voiceAgent.id = 'nova-voice-agent';

    // Header del widget con título y botón de cerrar
    const header = document.createElement('div');
    header.id = 'nova-voice-agent-header';

    const title = document.createElement('div');
    title.id = 'nova-voice-agent-title';
    title.textContent = 'Nova Tech IA';

    const closeButton = document.createElement('button');
    closeButton.id = 'nova-voice-agent-close';
    closeButton.innerHTML = '&times;';

    header.appendChild(title);
    header.appendChild(closeButton);

    // Contenido principal con mensaje y botón de micrófono
    const content = document.createElement('div');
    content.id = 'nova-voice-agent-content';

    const message = document.createElement('div');
    message.id = 'nova-voice-agent-message';
    message.textContent = config.messages.welcome;

    const micButton = document.createElement('div');
    micButton.id = 'nova-voice-agent-mic';
    micButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z" fill="currentColor"/>
        <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.93V21H13V18.93C16.39 18.43 19 15.53 19 12H17Z" fill="currentColor"/>
      </svg>
    `;

    const status = document.createElement('div');
    status.id = 'nova-voice-agent-status';
    status.textContent = 'Haz clic en el micrófono para hablar';

    content.appendChild(message);
    content.appendChild(micButton);
    content.appendChild(status);

    // Ensamblar todo
    voiceAgent.appendChild(header);
    voiceAgent.appendChild(content);
    document.body.appendChild(voiceAgent);

    return { voiceTrigger, voiceAgent, backdrop, micButton, closeButton, status };
  }

  // Manejar la integración con Vapi (cargar el script y configurar el agente)
  function loadVapiScript() {
    return new Promise((resolve, reject) => {
      if (document.getElementById('vapi-script')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'vapi-script';
      script.src = 'https://cdn.vapi.ai/vapi.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        console.error('Error al cargar el script de Vapi');
        reject(new Error('Error al cargar el script de Vapi'));
      };
      document.head.appendChild(script);
    });
  }

  // Inicializar la funcionalidad del agente de voz
  async function initVoiceAgent(elements) {
    const { voiceTrigger, voiceAgent, backdrop, micButton, closeButton, status } = elements;
    let vapi = null;
    let isListening = false;

    // Función para abrir el widget de voz
    function openVoiceAgent() {
      voiceAgent.classList.add('active');
      backdrop.classList.add('active');
    }

    // Función para cerrar el widget de voz
    function closeVoiceAgent() {
      voiceAgent.classList.remove('active');
      backdrop.classList.remove('active');
      if (isListening && vapi) {
        vapi.stop();
        stopListening();
      }
    }

    // Función para iniciar la escucha
    function startListening() {
      if (!vapi) return;
      
      isListening = true;
      micButton.classList.add('listening');
      status.textContent = 'Escuchando...';
      
      vapi.start()
        .then(() => {
          console.log('Vapi empezó a escuchar correctamente');
        })
        .catch(error => {
          console.error('Error al iniciar Vapi:', error);
          status.textContent = 'Error al iniciar el micrófono. Inténtalo de nuevo.';
          stopListening();
        });
    }

    // Función para detener la escucha
    function stopListening() {
      isListening = false;
      micButton.classList.remove('listening');
      status.textContent = 'Haz clic en el micrófono para hablar';
    }

    // Inicializar la integración con Vapi
    try {
      await loadVapiScript();
      console.log('Script de Vapi cargado correctamente');
      
      if (window.Vapi) {
        vapi = new window.Vapi(config.agentId, {
          onStart: () => {
            console.log('Conversación con Vapi iniciada');
          },
          onEnd: () => {
            console.log('Conversación con Vapi finalizada');
            stopListening();
          },
          onMessage: (message) => {
            console.log('Mensaje de Vapi:', message);
          },
          onError: (error) => {
            console.error('Error de Vapi:', error);
            status.textContent = 'Ocurrió un error. Inténtalo de nuevo.';
            stopListening();
          }
        });
        console.log('Agente de voz Vapi inicializado correctamente');
      } else {
        throw new Error('La biblioteca Vapi no está disponible');
      }
    } catch (error) {
      console.error('Error al inicializar Vapi:', error);
      status.textContent = 'No se pudo inicializar el agente de voz. Inténtalo más tarde.';
    }

    // Eventos para abrir y cerrar el widget
    voiceTrigger.addEventListener('click', openVoiceAgent);
    closeButton.addEventListener('click', closeVoiceAgent);
    backdrop.addEventListener('click', closeVoiceAgent);

    // Evento para el botón de micrófono
    micButton.addEventListener('click', () => {
      if (!vapi) {
        status.textContent = 'No se pudo inicializar el agente de voz. Inténtalo más tarde.';
        return;
      }
      
      if (isListening) {
        vapi.stop();
        stopListening();
      } else {
        startListening();
      }
    });

    console.log('Eventos del agente de voz inicializados correctamente');
  }

  // Inicializar todo
  function init() {
    createVoiceAgentStyles();
    const elements = createVoiceAgentElements();
    initVoiceAgent(elements);
  }

  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  console.log('Nova Tech IA Voice Agent inicializado correctamente');
})();


/**
 * Nova Tech IA - Chat Widget
 * Desarrollado para Santiago Palle, fundador de Nova Tech IA
 * Un widget de chat autónomo para conectar con clientes a través de n8n
 */

(function() {
  // Configuración del widget
  const config = window.ChatWidgetConfig || {
    webhook: {
      url: 'https://novatechia-n8n.23ft3c.easypanel.host/webhook/a638a9c4-601c-4f8d-8d74-744b28a376d1/chat',
      route: 'general'
    },
    branding: {
      logo: 'https://i.imgur.com/uyt80Ad.png',
      name: 'Nova Tech IA',
      welcomeText: 'Hola 👋, como puedo ayudar?',
      responseTimeText: 'Normalmente respondemos pronto'
    },
    style: {
      "--chat--color-primary": "#0f1e51",
      "--chat--color-primary-shade-50": "#0a173f",
      "--chat--color-primary-shade-100": "#060f2c",
      "--chat--color-secondary": "#d4af37",
      "--chat--color-secondary-shade-50": "#c49e30",
      "--chat--color-white": "#ffffff",
      "--chat--color-light": "#f4f6fb",
      "--chat--color-light-shade-50": "#e0e3eb",
      "--chat--color-light-shade-100": "#c4c9d6",
      "--chat--color-medium": "#b0b4c0",
      "--chat--color-dark": "#0f1e51",
      "--chat--color-disabled": "#7a7c85",
      "--chat--color-typing": "#404040"
    }
  };

  // Estado del chat
  let isChatOpen = false;
  let messages = [];
  let sessionId = generateSessionId();
  let isTyping = false;

  // Crear los elementos del DOM
  function createChatWidget() {
    console.log('Iniciando Nova Tech IA Chat Widget...');
    
    // Crear y añadir los estilos CSS
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      :root {
        ${Object.entries(config.style).map(([key, value]) => `${key}: ${value};`).join('\n        ')}
      }

      #nova-chat-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        transition: all 0.3s ease;
      }

      #nova-chat-bubble {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--chat--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        position: relative;
      }

      #nova-chat-bubble:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }

      #nova-chat-bubble img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }

      #nova-chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        height: 450px;
        background-color: var(--chat--color-white);
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        pointer-events: none;
      }

      #nova-chat-window.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      #nova-chat-header {
        background-color: var(--chat--color-primary);
        padding: 12px 16px;
        display: flex;
        align-items: center;
        color: var(--chat--color-white);
      }

      #nova-chat-header img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 12px;
        object-fit: contain;
      }

      #nova-chat-header-info {
        flex-grow: 1;
      }

      #nova-chat-header-title {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 2px;
      }

      #nova-chat-header-subtitle {
        font-size: 12px;
        opacity: 0.8;
      }

      #nova-chat-close {
        background: none;
        border: none;
        color: var(--chat--color-white);
        cursor: pointer;
        font-size: 20px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
      }

      #nova-chat-messages {
        flex-grow: 1;
        padding: 16px;
        overflow-y: auto;
        background-color: var(--chat--color-light);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .nova-message {
        max-width: 80%;
        padding: 10px 14px;
        border-radius: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        line-height: 1.4;
        position: relative;
        word-break: break-word;
      }

      .nova-message.incoming {
        background-color: var(--chat--color-white);
        border: 1px solid var(--chat--color-light-shade-50);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }

      .nova-message.outgoing {
        background-color: var(--chat--color-primary);
        color: var(--chat--color-white);
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }

      #nova-typing-indicator {
        display: none;
        align-self: flex-start;
        padding: 8px 14px;
        background-color: var(--chat--color-light-shade-50);
        border-radius: 14px;
        margin-top: 4px;
        font-size: 14px;
      }

      #nova-typing-indicator.visible {
        display: flex;
        align-items: center;
      }

      .nova-typing-dot {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: var(--chat--color-typing);
        display: inline-block;
        margin-right: 4px;
        animation: typingAnimation 1.4s infinite ease-in-out;
      }

      .nova-typing-dot:nth-child(1) { animation-delay: 0s; }
      .nova-typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .nova-typing-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes typingAnimation {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
        30% { transform: translateY(-5px); opacity: 1; }
      }

      #nova-chat-input-area {
        padding: 12px;
        border-top: 1px solid var(--chat--color-light-shade-50);
        display: flex;
        align-items: center;
        background-color: var(--chat--color-white);
      }

      #nova-chat-input {
        flex-grow: 1;
        border: 1px solid var(--chat--color-light-shade-50);
        border-radius: 20px;
        padding: 9px 16px;
        font-size: 14px;
        outline: none;
        background-color: var(--chat--color-light);
        transition: border-color 0.3s ease;
      }

      #nova-chat-input:focus {
        border-color: var(--chat--color-primary-shade-50);
      }

      #nova-chat-send {
        border: none;
        background-color: var(--chat--color-primary);
        color: var(--chat--color-white);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      #nova-chat-send:hover {
        background-color: var(--chat--color-primary-shade-50);
        transform: scale(1.05);
      }

      #nova-chat-send svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      /* Responsive */
      @media (max-width: 480px) {
        #nova-chat-window {
          width: calc(100vw - 40px);
          height: 60vh;
          bottom: 70px;
        }
      }
    `;
    document.head.appendChild(styleEl);

    // Crear la estructura del chat
    const chatWidget = document.createElement('div');
    chatWidget.id = 'nova-chat-widget';
    
    // Chat bubble
    const chatBubble = document.createElement('div');
    chatBubble.id = 'nova-chat-bubble';
    const bubbleImg = document.createElement('img');
    bubbleImg.src = config.branding.logo;
    bubbleImg.alt = config.branding.name;
    chatBubble.appendChild(bubbleImg);
    
    // Chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'nova-chat-window';
    
    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.id = 'nova-chat-header';
    
    const headerImg = document.createElement('img');
    headerImg.src = config.branding.logo;
    headerImg.alt = config.branding.name;
    
    const headerInfo = document.createElement('div');
    headerInfo.id = 'nova-chat-header-info';
    
    const headerTitle = document.createElement('div');
    headerTitle.id = 'nova-chat-header-title';
    headerTitle.textContent = config.branding.name;
    
    const headerSubtitle = document.createElement('div');
    headerSubtitle.id = 'nova-chat-header-subtitle';
    headerSubtitle.textContent = config.branding.responseTimeText;
    
    headerInfo.appendChild(headerTitle);
    headerInfo.appendChild(headerSubtitle);
    
    const closeButton = document.createElement('button');
    closeButton.id = 'nova-chat-close';
    closeButton.innerHTML = '&times;';
    
    chatHeader.appendChild(headerImg);
    chatHeader.appendChild(headerInfo);
    chatHeader.appendChild(closeButton);
    
    // Chat messages area
    const chatMessages = document.createElement('div');
    chatMessages.id = 'nova-chat-messages';
    
    // Typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'nova-typing-indicator';
    
    const dot1 = document.createElement('span');
    dot1.className = 'nova-typing-dot';
    const dot2 = document.createElement('span');
    dot2.className = 'nova-typing-dot';
    const dot3 = document.createElement('span');
    dot3.className = 'nova-typing-dot';
    
    typingIndicator.appendChild(dot1);
    typingIndicator.appendChild(dot2);
    typingIndicator.appendChild(dot3);
    
    chatMessages.appendChild(typingIndicator);
    
    // Chat input area
    const chatInputArea = document.createElement('div');
    chatInputArea.id = 'nova-chat-input-area';
    
    const chatInput = document.createElement('input');
    chatInput.id = 'nova-chat-input';
    chatInput.type = 'text';
    chatInput.placeholder = 'Escribe un mensaje...';
    
    const sendButton = document.createElement('button');
    sendButton.id = 'nova-chat-send';
    sendButton.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
      </svg>
    `;
    
    chatInputArea.appendChild(chatInput);
    chatInputArea.appendChild(sendButton);
    
    // Assembling all parts
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatMessages);
    chatWindow.appendChild(chatInputArea);
    
    chatWidget.appendChild(chatWindow);
    chatWidget.appendChild(chatBubble);
    
    document.body.appendChild(chatWidget);
    
    console.log('Nova Tech IA Chat Widget creado correctamente');
    return { chatBubble, chatWindow, chatMessages, chatInput, sendButton, closeButton, typingIndicator };
  }

  // Añadir los event listeners
  function initChatEvents(elements) {
    const { chatBubble, chatWindow, chatInput, sendButton, closeButton } = elements;
    
    // Abrir/cerrar chat al hacer clic en la burbuja
    chatBubble.addEventListener('click', toggleChat);
    
    // Cerrar chat al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', toggleChat);
    
    // Enviar mensaje al hacer clic en el botón enviar
    sendButton.addEventListener('click', sendMessage);
    
    // Enviar mensaje al presionar Enter
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Mostrar el mensaje de bienvenida cuando se abre el chat por primera vez
    function toggleChat() {
      isChatOpen = !isChatOpen;
      chatWindow.classList.toggle('open', isChatOpen);
      
      if (isChatOpen && messages.length === 0) {
        // Mostrar mensaje de bienvenida
        addMessage(config.branding.welcomeText, 'incoming');
      }
    }
    
    console.log('Eventos del chat inicializados correctamente');
  }

  // Función para generar un ID de sesión único
  function generateSessionId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, function() {
      return Math.floor(Math.random() * 16).toString(16);
    });
  }

  // Función para añadir un mensaje al chat
  function addMessage(text, type) {
    const { chatMessages, typingIndicator } = elements;
    
    const messageEl = document.createElement('div');
    messageEl.className = `nova-message ${type}`;
    messageEl.textContent = text;
    
    // Asegúrese de que el indicador de escritura siempre sea el último elemento
    chatMessages.insertBefore(messageEl, typingIndicator);
    
    // Añadir a la lista de mensajes
    messages.push({ text, type, timestamp: new Date().toISOString() });
    
    // Scroll al último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageEl;
  }

  // Función para enviar un mensaje al webhook
  async function sendMessageToWebhook(text) {
    console.log(`Enviando mensaje a webhook: ${config.webhook.url}`);
    
    try {
      showTypingIndicator(true);
      
      const response = await fetch(config.webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          route: config.webhook.route,
          timestamp: new Date().toISOString(),
          user_info: {
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      let result;
      try {
        result = await response.json();
        console.log('Respuesta del webhook:', result);
      } catch (e) {
        console.log('No se pudo parsear la respuesta como JSON, usando texto plano');
        result = { message: await response.text() };
      }
      
      // Procesar la respuesta
      setTimeout(() => {
        showTypingIndicator(false);
        const message = result.message || 'Lo siento, no pude procesar tu solicitud en este momento.';
        addMessage(message, 'incoming');
      }, 500); // Pequeña demora para simular escritura
      
    } catch (error) {
      console.error('Error al enviar mensaje al webhook:', error);
      showTypingIndicator(false);
      addMessage('Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta nuevamente más tarde.', 'incoming');
    }
  }

  // Función para mostrar/ocultar el indicador de escritura
  function showTypingIndicator(show) {
    const { typingIndicator } = elements;
    isTyping = show;
    typingIndicator.classList.toggle('visible', show);
  }

  // Función para enviar un mensaje
  function sendMessage() {
    const { chatInput } = elements;
    const text = chatInput.value.trim();
    
    if (text) {
      addMessage(text, 'outgoing');
      chatInput.value = '';
      
      // Enviar al webhook
      sendMessageToWebhook(text);
    }
  }

  // Inicializar el chat
  const elements = createChatWidget();
  initChatEvents(elements);
  
  // Exponer la API pública
  window.NovaChat = {
    open: function() {
      if (!isChatOpen) {
        elements.chatBubble.click();
      }
    },
    close: function() {
      if (isChatOpen) {
        elements.chatBubble.click();
      }
    },
    addMessage: function(text, type = 'incoming') {
      return addMessage(text, type);
    }
  };
  
  console.log('Nova Tech IA Chat Widget inicializado correctamente');
})();
